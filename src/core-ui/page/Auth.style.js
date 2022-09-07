import styled from "styled-components";

 const StyledAuth = styled.section`
  
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top:40px;
  padding-bottom: 40px;

  .auth-desc{
       margin-right: 92px;
       h1{
        font-size: 56px;
        margin: 36px 0 8px 0;
       }

       p{
         font-size: 18px;
         color: #6A6A6A;
         margin-bottom:84px;
         max-width: 453px;
         b{
            color: #6A6A6A;
         }
       }

       .login-btn{
        padding:8px 40px;
        font-size: 18px;
        background-color:#F74D4D;

       }

       .register-btn{
        padding:8px 40px;
        background-color:transparent;
        font-size: 18px;
        color: #B7B7B7;
       }



  }

  .auth-form{
    width: 416px;
    border-radius:10px;
    padding: 40px 32px 32px 32px ;
    background: #181818;

    b{
        color: white;
        font-size: 36px;
        
    }

    form{
        margin-top: 32px;
        

        .form-control{
            
            position: relative;
            margin-bottom: 32px;
           
            
            input{ 
                outline: none;
                border: 2px solid white;
                border-radius: 5px;


                padding: 12px;
                width: 100%;
                background-color:#BCBCBC;
                color: #555555;
                font-size:18px;

                transition: 150ms ease;
            }

            
        }

        button{
                width: 100%;
                padding: 12px;
                background-color: #F74D4D;
                font-size: 18px;
            }
    }
  }


`;

export default StyledAuth;