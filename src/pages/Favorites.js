import { useState,useEffect,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { api } from '../connection';
import StyledFavorites from '../core-ui/page/Favorites.style'
import ProductCard from '../components/ProductCard';
import Loader from '../components/notify/Loader';
import Success from '../components/notify/Success';

const Favorites = () => {
  const navigate = useNavigate();
  const{token} = useContext(AppContext);
  const[favorites,setFavorites] = useState([]);
  const[isLoading, setIsLoading] = useState(false);
  const[successMsg, setSuccessMsg] = useState("");

  useEffect(()=>{
       getFavorites()
  },[]);

  const getFavorites = async() => {
    try {

        setIsLoading(true);
        const res = await api.get("/favorites", {
          headers: {'Authorization':`Bearer ${token}`}
          });
        setIsLoading(false);
        
        // Extract data
        const payload = res.data;
        const favorites = payload.data.favorites;
        setFavorites(favorites);
       
      } catch (err) {
        const payload = err.response.data;
        const message = payload.message;

        // navigate to error page
        console.log(message)
        
      };
  };

  // 
  if(successMsg) return <Success setSuccessMsg={setSuccessMsg} successMsg={successMsg} />
  if(isLoading) return <Loader msg="Loading..."/>

  return (
    <StyledFavorites>
        <div className='title'>My Favorites</div>
        {favorites.length === 0 && <p style={{width:"100%",textAlign:"center",fontWeight:"bold",marginTop:"48px",fontSize: "24px"}}>You have no favorites..Add favorites at homepage</p>}
        <div className='favorites'>
                 {favorites.map(favorite => <ProductCard key={favorite.id} product={favorite} navigate={navigate} getProducts={getFavorites} token={token} setIsLoading={setIsLoading} setSuccessMsg={setSuccessMsg}/>)}
        </div>
    </StyledFavorites>
  )
}

export default Favorites  