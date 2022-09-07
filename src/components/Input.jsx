import React from 'react'

const Input = ({type,placeholder,value,err,setForm}) => {
    const onChangeForm = (e) => {
          setForm(prev => {
            return {
                ...prev,
                [e.target.name] : {
                    value :  e.target.value ,
                    errMsg : prev[e.target.name].errMsg
                }
            }
          })
    }


  return (
    <div className='form-control'>
    <input type={type} style={err ? {border:"1px solid red"} : {}} placeholder={placeholder} name={placeholder} value={value} onChange={(e)=>{onChangeForm(e)}}/>
    <p style={{color:"red",position:"absolute", top:"calc(100% + 2px)"}}>{err}</p>
    </div>
  )
}

export default Input