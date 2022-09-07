import { useState,useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {useQuery} from "react-query";

import {AppContext} from "../App";
import {api} from "../connection";

import { StyledTable } from '../core-ui/Table.style';
import CategoryRow from '../components/CategoryRow';

import Modal from "../components/Modal";
import {overlay} from "../constants/index"

 const Category = () => {
  const navigate = useNavigate();
  const {token} = useContext(AppContext);

  const[categories,setCategories] = useState([]);
  const[isLoading,setIsLoading] = useState(false);

  const[isModal,setIsModal] = useState(false);
  const[idToDelete, setIdToDelete] = useState("");


  // Use Effect
  useEffect(()=>{
    getRows()
  },[])


  // Function
  const getRows = async() => {
    setIsLoading(true);

    try {

      const res = await api.get("/categories", {
        headers: {'Authorization':`Bearer ${token}`}
        });

      // Extract data
      const payload = res.data;
      const categories = payload.data.categories;

      setCategories(categories);
      setIsLoading(false)

    } catch (err) {
      const payload = err.response.data;
      const message = payload.message;

      // navigate to error page
      console.log(message)
      setIsLoading(false)

    };

     };


  const deleteRow = async(id) => {

    try {
      await api.delete(`/category/${id}`, {
                     headers: {'Authorization':`Bearer ${token}`}
                     }); 

       getRows();


    } catch(err) {
      const payload = err.response.data;
      const message = payload.message;

      // navigate to error page
      console.log(message)
      setIsLoading(false)
    };


  };





  return (
     <>
        <section className='list-category-section' style={{padding:"80px 84px"}}>
        {isModal? <Modal id={idToDelete} deleteRow={deleteRow} setIsModal={setIsModal}/> : ""}
        {isModal? <div style={overlay}></div> : ""}
        
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                     <b style={{fontSize:"24px"}}>List Category</b>
                     <button style={{backgroundColor:"#F74D4D",fontSize:"18px"}} onClick={()=>{navigate("/addcategory")}}>Add New</button>
              </div>

              <StyledTable>
              <thead>
                   <tr>
                        <th>No</th>
                        <th>Category Name</th>
                        <th>Action</th>
        
                   </tr>
              </thead>

              {isLoading && <div>Loading</div>}

              <tbody>
                   { categories &&
                    categories.map((category,index) => {
                        return <CategoryRow key={category.id} category={{...category,index}} navigate={navigate} setIsModal={setIsModal} setId={setIdToDelete} />
                    })
                   }
             </tbody>
                   
              </StyledTable>
              

        </section>
    </>
  )
}

export default Category;