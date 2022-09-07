import styled from "styled-components";

 const StyledFormCategory = styled.section`
  padding-right: 84px;
  padding-left: 84px;

  b{
   font-size: 24px;
  }

  form{
    margin-top:48px;

    .form-control{
            position: relative;
            margin-bottom: 32px;
            
            input{
                 outline: none;
                 border: 1px solid #D2D2D240;
                 border-radius: 5px;
               
                padding: 12px;
                width: 100%;
                background-color:#BCBCBC;
                color: #555555;
                font-size:18px;

                transition: 150ms ease;
            }}

    button{
        margin-top: 70px;
        width: 100%;
        background: #56C05A;
        font-size: 18px;
        padding: 12px;
        &:hover{
            scale: 1;
        }
    }
  }
`;

export default StyledFormCategory;