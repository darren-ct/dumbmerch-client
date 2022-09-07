import { useContext,useState } from "react";
import { useNavigate } from "react-router-dom";
import {AppContext} from "../App";

import StyledFormCategory from "../core-ui/page/FormCategory.style.js";
import Input from "../components/Input";
import {api} from "../connection"

import { pushError } from "../auth";
import Alert from "../components/Alert";

const AddCategory = () => {
    const{token} = useContext(AppContext);
    const navigate = useNavigate();

    // State
    const[form,setForm] = useState({
      category : {
          value : "" , errMsg: ""
        }
    });
    const[errMsg,setErrMsg] = useState("")

    // Functions
    const onSubmit = async(e) => {
        e.preventDefault();
         
        // Reset
        setErrMsg("")

        // Length
        if(form.category.value.length < 4){
          return pushError(setForm, "category" , "Category can't be lower than 4 characters")
        } else {
          pushError(setForm, "category", "")
        };


       
        try {
          const res = await api.post(`/category`, {
            "name" : form.category.value
          }, {
            headers: {'Authorization':`Bearer ${token}`}
            });
    
            navigate("/category");
    
    
    
          } catch (err) {
    
          const payload = err.response.data;
          const message = payload.message;

          setErrMsg(message)
    
          
          
    
          };
    
           
      };

  return (
    <StyledFormCategory>
        {errMsg && <Alert message={errMsg}/> }

        <b>Add Category</b>
        <form>
        <Input type="input" placeholder="category" value={form.category.value} err={form.category.errMsg} setForm={setForm}/>
        <button onClick={onSubmit}>Add</button>
        </form>
    </StyledFormCategory>
  )
}

export default AddCategory;