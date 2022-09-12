import { useState } from "react";

import { pushError,emailChecker } from "../auth";
import {api} from "../connection";
import Loader from "../components/notify/Loader";
import Error from "../components/notify/Error";

import logo from "../assets/dumbmerch-logo.svg";
import Input from "../components/Input";
import StyledAuth from "../core-ui/page/Auth.style.js"


 const Auth = ({setUser}) => {
  const[auth,setAuth] = useState("register");
  const[errMsg,setErrMsg] = useState("");
  const[isLoading,setIsLoading] = useState(false)

// STATE
  const[loginForm,setLoginForm]=useState({
    email : {
      value : "" , errMsg: ""
    },
    password : {
      value : "" , errMsg: ""
    },
  });

  const[registerForm,setRegisterForm]=useState({
    name : {
      value : "" , errMsg: ""
    },
    email : {
      value : "" , errMsg: ""
    },
    password : {
      value : "" , errMsg: ""
    },
  });

// FUNCTIONS
  const submitLoginForm = async(e) => {
    e.preventDefault();

    // Reset
    setErrMsg("")


    //  Validate format
    if(loginForm.email.value.length < 4){
      return pushError(setLoginForm,"email","Email must be more than 3 characters");
    } else {pushError(setLoginForm,"email","")}

    if(!emailChecker(loginForm.email.value)){
      return pushError(setLoginForm,"email","Email format incorrect")
   } else {pushError(setLoginForm,"email","")}

    if(loginForm.password.value.length < 8){
      return pushError(setLoginForm,"password","Password must be more than 7 characters");
    } else {pushError(setLoginForm,"password","")}

    
    

    // Post
    try {
      setIsLoading(true)
      let res = await api.post("/login", {
        email : loginForm.email.value,
        password : loginForm.password.value
      });
      setIsLoading(false)
  
      const payload = res.data;
      const user = payload.data.user;
      setUser(user);
    
    } catch(err){
      const payload = err.response.data;
      const message = payload.message;
      setErrMsg(message);
      
      };


  }

  const submitRegisterForm = async(e) => {
    e.preventDefault();

    setErrMsg("")

    //  Validate format

    // username
    if(registerForm.name.value === ""){
      return pushError(setRegisterForm,"name","Name cannot be empty");
    } else {pushError(setRegisterForm,"name","")}

    // email
    if(!emailChecker(registerForm.email.value)){
       return pushError(setRegisterForm,"email","Email format incorrect")
    } else {pushError(setRegisterForm,"email","")}

    //  pw
    if(registerForm.password.value.length < 8){
      return pushError(setRegisterForm,"password","Minimal password length is 8")
    } else {pushError(setRegisterForm,"password","")}



    // Post
    try {

    setIsLoading(true)
    let res = await api.post("/register", {
      name : registerForm.name.value,
      email : registerForm.email.value,
      password : registerForm.password.value
    })
    setIsLoading(false)

    const payload = res.data;
    const user = payload.data.user;
    console.log(user);
    setUser(user);
  
  } catch(err){
    const payload = err.response.data;
    const message = payload.message;
    setErrMsg(message);
    
    }

  };

  // 

  if(errMsg) return <Error error={errMsg} />
  if(isLoading) return <Loader msg="Loading..."/>
  

  return (
    <>      
      <StyledAuth>

          <div className="auth-desc">
                <img src={logo} alt="logo" style={{width:"264px"}}/>
                <h1>Easy, Fast and Reliable</h1>
                <p>Go shopping for merchandise, just go to dumb merch shopping. 
                The biggest merchandise in <b>Indonesia</b></p>
                <div className="btn-group">
                    <button className="login-btn" onClick={()=>{setAuth("login")}}>Login</button>
                    <button className="register-btn" onClick={()=>{setAuth("register")}}>Register</button>
                </div>
          </div>

          <div className="auth-form">
                {auth === "register" ? <b>Register</b> : <b>Login</b>}

                <form>

                   {auth === "register" ? 
                     <>
                        <Input type={"text"} placeholder={"name"} value={registerForm.name.value} err={registerForm.name.errMsg} setForm={setRegisterForm}/>
                        <Input type={"email"} placeholder={"email"} value={registerForm.email.value} err={registerForm.email.errMsg} setForm={setRegisterForm}/>
                        <Input type={"password"} placeholder={"password"} value={registerForm.password.value} err={registerForm.password.errMsg} setForm={setRegisterForm}/>
                     </> :
                     <>
                        <Input type={"email"} placeholder={"email"} value={loginForm.email.value} err={loginForm.email.errMsg} setForm={setLoginForm}/>
                        <Input type={"password"} placeholder={"password"} value={loginForm.password.value} err={loginForm.password.errMsg} setForm={setLoginForm}/>
                     </>
                   }
                   
                   {auth === "register" ? 
                      <button onClick={submitRegisterForm}>Register</button>
                    : <button onClick={submitLoginForm}>Login</button>
                   }
                </form>
          </div>
      </StyledAuth>
    </>
  )
}

export default Auth;
