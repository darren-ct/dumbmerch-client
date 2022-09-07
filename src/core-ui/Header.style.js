import styled from "styled-components";

export const StyledHeader = styled.header`

.container.nav{
         max-width: 1600px;
         height: 80px;
         font-size: AvenirBold;

         margin: 0 auto;
         padding: 64px 48px;

         display: flex;
         align-items: center;
         justify-content: space-between;

         color:white;
         font-size: 18px;
         font-weight: bold;

         .right{
            display: flex;
            align-items: center;
         }

        p{ margin-left: 24px;
           cursor: pointer;
           transition: 150ms ease;
           
         }

        a{
         text-decoration: none;
        }

         
}

`