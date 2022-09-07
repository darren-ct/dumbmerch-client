import { useState,useEffect,createContext,useLayoutEffect} from "react";
import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom";


import Navbar from "./components/Navbar";

import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Product from "./pages/Product";

import AddCategory from "./pages/AddCategory";
import Category from "./pages/Category";
import EditCategory from "./pages/EditCategory";


import SearchUser from "./pages/SearchUser";
import Complain from "./pages/Complain";
import  Auth  from "./pages/Auth";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

import Home from "./pages/Home"
import Detail from "./pages/Detail"
import NotFound from "./pages/NotFound"
import Favorites from "./pages/Favorites";

import {api} from "./connection";



export const AppContext = createContext(null);


function App() {
  // States
  const[user,setUser] = useState("");
  

  const token = user ? user.token : null;
  const isAdmin = user ? user.isAdmin : null;


  useEffect(()=>{
  //  get token first time
     const userInfo =  JSON.parse(localStorage.getItem("user"));

     if(!userInfo) return;

     setUser(userInfo);
  },[])

  useEffect(()=>{
    if(user){
      // save token to localstorage
      localStorage.setItem("user",JSON.stringify(user));
    }
  },[user])


  
  return (
    <div className="App">

    <AppContext.Provider value={{user,token}}>
    <BrowserRouter>
       { user && <Navbar  setUser={setUser} isAdmin={isAdmin}/> }
                                     
        <Routes>
            <Route path="/myprofile" element={!user ? <Navigate to="/auth"/> : isAdmin ? <Navigate to="/product"/> : <Profile/>} />
            <Route path="/" element={!user ? <Navigate to="/auth"/> : isAdmin ? <Navigate to="/product"/> : <Home/>  }/>
            <Route path="/detail/:id" element={!user ? <Navigate to="/auth"/> : isAdmin ? <Navigate to="/product"/> : <Detail/>  }/>
            <Route path="/myfavorites" element={!user ? <Navigate to="/auth"/> : isAdmin ? <Navigate to="/product"/> : <Favorites/>} />

            <Route path="/auth" element={user ? <Navigate to="/product"/>: <Auth setUser={setUser}/>}/>

            <Route path="/product" element={!user?  <Navigate to="/auth"/> : !isAdmin? <Navigate to="/"/> : <Product/> }/>
            <Route path="/editproduct/:id" element={!user?  <Navigate to="/auth"/> : !isAdmin? <Navigate to="/"/> : <EditProduct/> }/>
            <Route path="/addproduct" element={!user?  <Navigate to="/auth"/> : !isAdmin? <Navigate to="/"/> : <AddProduct/> }/>

            <Route path="/category" element={!user?  <Navigate to="/auth"/> : !isAdmin? <Navigate to="/"/> : <Category/> }/> 
            <Route path="/editcategory/:id" element={!user?  <Navigate to="/auth"/> : !isAdmin? <Navigate to="/"/> : <EditCategory/> }/>
            <Route path="/addcategory" element={!user?  <Navigate to="/auth"/> : !isAdmin? <Navigate to="/"/> : <AddCategory/> }/>
            
            

            
            <Route path="/editprofile" element={!user ? <Navigate to="/auth"/> : isAdmin ? <Navigate to="/product"/> : <EditProfile/>} />


            <Route path="/complain/:id" element={!user? <Navigate to="/auth"/> : <Complain/>}/>
            <Route path="/searchuser" element={!user? <Navigate to="/auth"/> : <SearchUser/>}/>

            <Route path="*" element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
    </AppContext.Provider>
    
    </div>
  );
}

export default App;
