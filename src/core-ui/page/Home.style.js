import styled from "styled-components";

 const StyledHome = styled.section`

  padding-right: 84px;
  padding-left: 84px;

  form{
   width: 500px;
   margin: 32px auto ;
   

   input{
      width: 100%;
      padding: 16px;
      background-color: rgba(171, 171, 171, 0.15);
      border-radius: 8px;
      outline: none;
   }
  }


 
 .title{
    font-family: AvenirBold;
    color: #F74D4D;
    font-size: 24px;
    text-align:center;
 }
 
 .products{
    margin:0 auto;
    margin-top: 102px;
    display: grid;
    grid-gap: 24px;
    width: 100%;
    grid-template-columns: repeat(auto-fit,minmax(240px,20%));
    
    
     }
 

 `

 export default StyledHome;