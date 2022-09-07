import { useState,useEffect,useContext } from "react";
import { useNavigate,useParams } from "react-router-dom";

import { AppContext } from "../App";


import StyledFormProduct from '../core-ui/page/FormProduct.style.js'
import Input from "../components/Input";

import {api} from "../connection";
import { pushError } from "../auth";
import Alert from "../components/Alert";

const EditProduct = () => {
  const {token} = useContext(AppContext);
  const navigate = useNavigate();
  const {id} = useParams();

//  State
  const[originalImg,setOriginalImg] = useState(null);

  const[form,setForm] = useState(
    {
      image : {
       value : "" , errMsg: ""
      },
      name : {
        value : "" , errMsg: ""
      },
      desc : {
        value : "" , errMsg: ""
      },
      price : {
        value : "" , errMsg: ""
      },
      qty : {
        value : "" , errMsg: ""
      },
      category : {
        value : "" , errMsg : ""
      }
    }
  )
  const[errMsg,setErrMsg] = useState("");

  const[categories,setCategories] = useState([]);

// Use Effects

useEffect(()=>{
  if(form.image.value && typeof form.image.value !== "string"){
  const image = URL.createObjectURL(form.image.value);
  setOriginalImg(image)
  
}
},[form])

 useEffect(()=>{
    getInputs();
 },[])

 useEffect(()=>{
  
  getCategories();
  
},[])

 
// Functions
  const onChange = (e) => {
     setForm(prev => {
      return {
        ...prev,
        [ e.target.name ] : {
          
         value : e.target.value ,
         errMsg : prev[e.target.name].errMsg

        }
      }
     })
  }

  const onSelect = (e) => {
    setForm(prev => {
      return {
        ...prev,
        image : {
          value : e.target.files[0] ,
          errMsg : "" }
      }
     })
  }

  const getInputs = async () => {
    try {
      const res = await api.get(`/product/${id}`, {
        headers: {'Authorization':`Bearer ${token}`}
        });

        // Extract data
      const payload = res.data;
      const product = payload.data.product;

      setForm( {
        image : {
         value :  "", errMsg: ""
        },
        name : {
          value : product.title , errMsg: ""
        },
        desc : {
          value : product.desc , errMsg: ""
        },
        price : {
          value : product.price , errMsg: ""
        },
        qty : {
          value : product.qty , errMsg: ""
        },
        category : {
          value : product.category , errMsg : ""
        }

      });

      setOriginalImg(product.image)



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

    // Filter
    if(!form.image.value){
        return setErrMsg("Please select a new file(Not empty)")
    };

    if(form.name.value.length < 4){
      return pushError(setForm, "name" , "Name can't be lower than 4 characters")
    }else {
      pushError(setForm, "name", "")
    };

    if(form.desc.value.length < 8){
      return pushError(setForm, "desc" , "Desc can't be lower than 8 characters")
    }else {
      pushError(setForm, "desc", "")
    };

    if(form.price.value < 1){
      return pushError(setForm, "price" , "Price must be bigger than 1")
    }else {
      pushError(setForm, "price", "")
    };

    if(form.qty.value < 1){
      return pushError(setForm, "qty" , "Quantity must be bigger than 1")
    }else {
      pushError(setForm, "qty", "")
    };

    if(form.image.value.type.slice(0,5) !== "image"){
      return setErrMsg("File must be image type");
    }


// FormData
    const formData = new FormData();

    formData.append("image",form.image.value);
    formData.append("title",form.name.value);
    formData.append("desc",form.desc.value);
    formData.append("price",form.price.value);
    formData.append("qty",form.qty.value);
    formData.append("category",form.category.value);


    try {
      await api.put(`/product/${id}`, formData , {
        headers: {'Authorization':`Bearer ${token}`}
        });

        
        navigate("/product");


      } catch (err) {
      const payload = err.response.data;
      const message = payload.message;

      setErrMsg(message)
      };

    
}

const getCategories = async() => {
  try {

    const res = await api.get("/categories", {
      headers: {'Authorization':`Bearer ${token}`}
      });

    // Extract data
    const payload = res.data;
    const categories = payload.data.categories;

    setCategories(categories);

  } catch (err) {
    const payload = err.response.data;
    const message = payload.message;

    // navigate to error page
    console.log(message)
    

  };
}

  

  return (
    <StyledFormProduct>
         {errMsg && <Alert message={errMsg}/>}
         <b>Edit Product</b>
      <label className="upload-img">
          <div>Upload Image</div>
          <input style={{display:"none"}} type="file" onChange={onSelect} name="image"/>
          <img src={originalImg} style={{width:"64px",marginLeft:"8px"}}/>
      </label>
      <form>
           <Input type="input" placeholder="name" value={form.name.value} err={form.name.errMsg} setForm={setForm}/>
           <div className="form-control">
                <textarea style={form.desc.errMsg ? {border:"1px solid red"} : {}} placeholder="description" name="desc" value={form.desc.value} onChange={onChange}>{form.desc.value}</textarea>
                <p>{form.desc.errMsg}</p>
           </div>
           <Input type="input" placeholder="price" value={form.price.value} err={form.price.errMsg} setForm={setForm}/>
           <Input type="input" placeholder="qty" value={form.qty.value} err={form.qty.errMsg} setForm={setForm}/>
           <label style={{marginRight : "20px"}}>Choose category</label>
           <select id="category" name="category" onChange={onChange} value={form.category.value}>
                  {categories.map(cat => <option value={cat.name}>{cat.name}</option>)}
           </select>
           <button onClick={onSubmit}>Save</button>
      </form>
    </StyledFormProduct>
  )
}

export default EditProduct