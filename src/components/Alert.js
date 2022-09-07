import React from 'react'
import {useState} from "react";
import StyledAlert from '../core-ui/Alert';


const Alert = ({message}) => {
  return (
    <StyledAlert>
       <div className='message'>{message}</div>
    </StyledAlert>
  )
}

export default Alert