import { useState,useEffect,useContext } from "react";
import { useNavigate,useParams } from "react-router-dom";

import { AppContext } from "../App";

import StyledFormCategory from "../core-ui/page/FormCategory.style.js";
import Input from "../components/Input";

import {api} from "../connection"
import { pushError } from "../auth";
import Alert from "../components/Alert";
import Loader from "../components/notify/Loader";
import Success from "../components/notify/Success";


const EditCategory = () => {
  const {token} = useContext(AppContext);
  const navigate = useNavigate();
  const {id} = useParams();

  // State
  const[form,setForm] = useState({
    category : {
      value : "" , errMsg: ""
    },
  });
  const[isLoading,setIsLoading] = useState(false);
  const[errMsg,setErrMsg] = useState("");
  const[successMsg, setSuccessMsg] = useState("")

  // Use Effects
  useEffect(()=>{
  getInputs();
  },[]);

  // Functions
  const getInputs = async () => {
    try {
      setIsLoading(true);
      const res = await api.get(`/category/${id}`, {
        headers: {'Authorization':`Bearer ${token}`}
        });
      setIsLoading(false);

        // Extract data
      const payload = res.data;
      const name = payload.data.category.name;

      setForm({
        category : {
          value : name,
          errMsg : ""
        }
      });



      } catch (err) {

      
      const payload = err.response.data;
      const message = payload.message;

      // navigate to error page
      console.log(message)
      

      };
  };
  
  const onSubmit = async(e) => {
    e.preventDefault();

    // Reset
    setErrMsg("")

    // Length

    if(form.category.value.length < 4){
      return pushError(setForm, "category" , "Category can't be lower than 4 characters")
    }else {
      pushError(setForm, "category", "")
    };
   
    try {
      setIsLoading(true)
      await api.put(`/category/${id}`, {
        "name" : form.category.value
      }, {
        headers: {'Authorization':`Bearer ${token}`}
        });
      setIsLoading(false)
      setSuccessMsg("Category edited")

      } catch (err) {

      const payload = err.response.data;
      const message = payload.message;

      setErrMsg(message)
    
      };

       
  };

  // 
  if(isLoading) return <Loader msg="Loading..."/>
  if(successMsg) return <Success setSuccessMsg={setSuccessMsg} successMsg={successMsg} to={"category"}/>

  return (
    <StyledFormCategory>
      {errMsg && <Alert message={errMsg}/> }
      
      <b>Edit Category</b>
      <form>
           <Input type="input" placeholder="category" value={form.category.value} err={form.category.errMsg} setForm={setForm}/>
           <button onClick={onSubmit}>Save</button>
      </form>
    </StyledFormCategory>
  )
}

export default EditCategory