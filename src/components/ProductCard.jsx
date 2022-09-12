import React from 'react'
import  StyledProductCard  from '../core-ui/ProductCard.style'
import liked from "../assets/liked.png";
import unliked from "../assets/unliked.png"
import { api } from '../connection';

const ProductCard = ({product,navigate,getProducts,token,setIsLoading,setSuccessMsg}) => {
  const id = product.id;

  const setFavorite = async(e) => {
      e.stopPropagation();
      
      try {
          if(product.isFavorite){
             setIsLoading(true);
             await api.delete(`/favorite/${id}`,{
              headers: {'Authorization':`Bearer ${token}`}
             });
             setIsLoading(false);
             setSuccessMsg("Favorite removed");
          } else {
             setIsLoading(true)
             await api.post("/favorite", {
              id : id
             }, {
              headers: {'Authorization':`Bearer ${token}`}
             });
             setIsLoading(false);
             setSuccessMsg("Added to favorite");
          };

          return getProducts()
      } catch(err) {
        const payload = err.response.data;
        const message = payload.message;

        // navigate to error page
        console.log(err)
        console.log(message)
      }
  };

  return (
    <StyledProductCard>
          <div onClick={()=>{navigate(`/detail/${id}`)}} style={{position:"relative"}}>
          <img src={product.image} />
          <span>{product.title}</span>
          <p>{product.price}</p>
          <p>Stock: {product.qty}</p>
           <img onClick={setFavorite} src={product.isFavorite ? liked : unliked} 
           style={{height:28,width:28,position:"absolute",bottom:48,right:18}} />
          </div>
    </StyledProductCard>
  )
}

export default ProductCard
