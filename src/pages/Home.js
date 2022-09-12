import { useState,useEffect,useContext } from 'react';
import {useNavigate} from "react-router-dom";

import {AppContext} from "../App"
import StyledHome from '../core-ui/page/Home.style';
import ProductCard from '../components/ProductCard';
import Loader from "../components/notify/Loader";


import {api} from "../connection"
import convertRupiah from 'rupiah-format';
import Success from '../components/notify/Success';

const Home = () => {
  let navigate = useNavigate();

  // States
  const[products,setProducts] = useState([]);
  const[isLoading,setIsLoading] = useState(false);
  const[successMsg,setSuccessMsg] = useState("");

  const[search,setSearch] = useState("");

  const{token} = useContext(AppContext);

  
  // Use Effect
  useEffect(()=>{
    getProducts()
},[search]);

  
  // Function
  const getProducts = async() => {

    setIsLoading(true);

      try {

        const res = await api.get("/products", {
          headers: {'Authorization':`Bearer ${token}`}
          });

        
        // Extract data
        const payload = res.data;
        let products = payload.data.products;
         products = products.map(product => { return {
        ...product,
          price : convertRupiah.convert(product.price)
        }})


        // Sort Data
        const newArray = products.filter(prod => prod.title.toLowerCase().trim().startsWith(search) === true);


        setProducts(newArray);
        setIsLoading(false)

      } catch (err) {
        const payload = err.response.data;
        const message = payload.message;

        // navigate to error page
        console.log(message)
        setIsLoading(false)

      };
  }

   const onSearch = (e) => {
      setSearch(e.target.value);
   }
  
  // 
  if(successMsg) return <Success setSuccessMsg={setSuccessMsg} successMsg={successMsg} />
  if(isLoading) return <Loader msg="Loading..."/>

  return (
    <>
      <StyledHome>
             <div className='title'>Products</div>
             <form onSubmit={(e)=>{e.preventDefault()}}>
                  <input type="text" placeholder='Search your products' onChange={onSearch} value={search}></input>
             </form>
                
             <div className='products'>
                 {products.map(product => <ProductCard key={product.id} product={product} navigate={navigate} getProducts={getProducts} token={token} setIsLoading={setIsLoading} setSuccessMsg={setSuccessMsg}/>)}
             </div>
      </StyledHome>
    </>

  )
}

export default Home
