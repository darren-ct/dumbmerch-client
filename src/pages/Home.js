import { useState,useEffect,useContext } from 'react';
import {useNavigate} from "react-router-dom";

import {AppContext} from "../App"
import StyledHome from '../core-ui/page/Home.style';
import ProductCard from '../components/ProductCard';


import {api} from "../connection"
import convertRupiah from 'rupiah-format';

const Home = () => {
  let navigate = useNavigate();

  // States
  const[products,setProducts] = useState([]);
  const[isLoading,setIsLoading] = useState(false);

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
  
   

  return (
    <>

      <StyledHome>
             <div className='title'>Products</div>
             <form onSubmit={(e)=>{e.preventDefault()}}>
                  <input type="text" placeholder='Search your products' onChange={onSearch} value={search}></input>
             </form>
                
            {isLoading ? <div style={{marginBottom:"100vh"}}>Loading...</div> : products.length === 0 ? <div style={{marginBottom:"100vh"}}>No results found..</div> : ""}

             <div className='products'>
                 {products.map(product => <ProductCard key={product.id} product={product} navigate={navigate} getProducts={getProducts} token={token}/>)}
             </div>
      </StyledHome>
    </>

  )
}

export default Home
