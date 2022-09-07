import { NavLink } from 'react-router-dom';
import { StyledHeader } from '../core-ui/Header.style';
import logo from "../assets/dumbmerch-logo.svg"



const Navbar = ({isAdmin,setUser}) => {


  const navLinkStyles = ({isActive}) => {
     if(isActive){
        return {
           color:"#F74D4D",
           margin:"0 0 0 24px",
           cursor:"pointer",

        }
     }

     return {
         color:"#FFFFFF",
         margin:"0 0 0 24px",
         cursor: "pointer"
     }
  }
 

  return (
    <StyledHeader>
        <nav className='container nav'>
            <img src={logo} style={{width:"70px"}}/>
            
            <div className='right'>
                <NavLink style={navLinkStyles} to="/complain/0">Complain</NavLink>

                {isAdmin ? 
                <>
                <NavLink style={navLinkStyles} to="/product">Product</NavLink> 
                <NavLink style={navLinkStyles} to="/category">Category</NavLink>
                </>
                : 
                <>
                <NavLink style={navLinkStyles} to="/myprofile">Profile</NavLink> 
                <NavLink style={navLinkStyles} to="/">Home</NavLink>
                <NavLink style={navLinkStyles} to="myfavorites">Favorites</NavLink>
                </>
                }
                
                
                <p onClick={()=>{setUser("");localStorage.removeItem("token")}}>Logout</p>
            </div>
            
        </nav>
    </StyledHeader>
  )
}

export default Navbar