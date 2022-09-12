import {useParams,useNavigate} from "react-router-dom";
import { useEffect,useState,useContext } from "react";

import {AppContext} from "../App"
import StyledDetail from "../core-ui/page/Detail.style";
import Loader from "../components/notify/Loader";

import {api} from "../connection"

import convertRupiah from 'rupiah-format';



const Detail = () => {
  let {id} = useParams();
  const {token} = useContext(AppContext);
  const navigate = useNavigate();

  // States
  const[product,setProduct] = useState({
    image : "",
    title: "",
    qty:"",
    desc:"",
    price:""
  });
  const[isLoading, setIsLoading] = useState(false);
  const[quantity,setQuantity] = useState(1);

  // UseEffect
  useEffect(()=>{
      getProduct();
  },[]);

  useEffect(()=>{
         const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
         const myMidtransClientKey = "SB-Mid-client-GzKNSNXN6DWc-bq1";

         let scriptTag = document.createElement("script");
         scriptTag.src = midtransScriptUrl;

         scriptTag.setAttribute("data-client-key", myMidtransClientKey);

         document.body.appendChild(scriptTag);

         return () => {
          document.body.removeChild(scriptTag)
         }
  },[])

  // Function
  const getProduct = async() => {

    try {
      
      setIsLoading(true)
      const res = await api.get(`/product/${id}`, {
        headers: {'Authorization':`Bearer ${token}`}
        });
      setIsLoading(false)
      
      // Extract data
      const payload = res.data;
       let product = payload.data.product;
      product = {...product,price : convertRupiah.convert(product.price)}

      setProduct(product);
      
    } catch (err) {
      const payload = err.response.data;
      const message = payload.message;

      // navigate to error page
      console.log(message)
      
    };

  };

  const buyProduct = async() => {
    try {
         const response =await api.post("/transaction",{
          idProduct : id,
          qty:quantity
         },{
          headers: {'Authorization':`Bearer ${token}`}
          });

          // token
          const snapToken = response.data.payment.token;

          window.snap.pay(snapToken , {
            onSuccess : (result) => {
              console.log(result);
              navigate("/myprofile")
            },
            onPending : (result) => {
              console.log(result);
              navigate("/myprofile")
            },

            onError : (result) => {
              console.log(result);

            },

            onClose : (result) => {
              alert("You closed without finishing the paycheck")
            }
          })



          
    } catch(err) {
 
      console.log(err)

    }
  }
  
  const decrementQty = () => {
      if(quantity === 1) {
        return ;
      }
      setQuantity(prev => prev - 1)
  };

  const incrementQty = () => {
       setQuantity(prev => prev + 1)
  };

  const setFavorite = async() => {
 
    try {
      if(product.isFavorite){
         await api.delete(`/favorite/${id}`,{
          headers: {'Authorization':`Bearer ${token}`}
         })
      } else {
         await api.post("/favorite", {
          id : id
         }, {
          headers: {'Authorization':`Bearer ${token}`}
         })
      };

      getProduct()

  } catch(err) {
    const payload = err.response.data;
    const message = payload.message;

    // navigate to error page
    console.log(err)
    console.log(message)
  }
  }

  // 
  if(isLoading) return <Loader msg="Loading..."/>

  return (
    <StyledDetail>
          <img src={product.image} alt="cake"/>
          <div className="right-section">
                <span className="product-title">{product.title}</span>
                <p className="product-stock">Stock: {product.qty}</p>
                <p className="product-desc">
                   {product.desc}
                </p>

                <div className="product-details">
                    <div className="qty">
                         <span className="op min" onClick={decrementQty}>-</span>
                             <span className="number">{quantity}</span>
                         <span className="op plus" onClick={incrementQty}>+</span>
                    </div>
                    <div className="price">{product.price}</div>
                </div>
                

                <button onClick={buyProduct}>Buy</button>
                <button onClick={setFavorite} style={{color:"#E13A3A",backgroundColor:"transparent", borderColor:"#E13A3A" , borderWidth:"1px"}} >{product.isFavorite ? "Remove from favorites" : "Add to Favorites"}</button>
          </div>
    </StyledDetail>

  )
}

export default Detail
