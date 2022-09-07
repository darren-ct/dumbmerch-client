import styled from "styled-components";

 const StyledDetail = styled.section`
    
    display: flex;
    justify-content: center;

    img{
        width:436px;
        height: 555px;
        object-fit: cover;
        margin-right:54px;
    }

    .right-section{
        max-width: 544px;
        padding-top: 64px;

        .product-title{
            margin-top: 32px;
            font-size: 48px;
            color: #F74D4D;
            font-weight: bold;
        }

        P{
            margin: 4px 0 36px 0;
        }

        ul{
            margin-bottom: 36px;
            margin-left:12px;
        }

        .product-details{
            display: flex;
            align-items: center;
            justify-content: space-between;
            
        }

        .qty{
           .op{
               display: inline-flex;
               justify-content: center;
               align-items: center;
               background-color: #F74D4D;
               width: 24px;
               height: 24px;
               font-weight: bold;
               border-radius: 100vw;
               cursor: pointer;
               transition: 150ms;
           }

           .op:hover{
              transform: scale(1.2);
           }

           .number{
            margin: 0 8px;
            position: relative;

           }

           .number::after{
            position: absolute;
            bottom: -2px;
            left: -2px;

            width: 150%;
            height: 2px;
            content: "";
            background-color: white;
           }

        }

        .price{
            text-align: end;
            font-weight: bold;
            color: #F74D4D;
            font-size: 24px;
           
        }

        button{
            margin-top: 24px;
            width: 100%;
            border-radius: 5px;
            background-color: #F74D4D;

            font-size: 18px;
        }

    }
 `

 export default StyledDetail;