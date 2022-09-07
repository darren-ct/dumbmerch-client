import styled from "styled-components";

const StyledAlert = styled.div`

position: fixed;
right: 50%;
transform: translateX(50%);
top : 16px;
z-index: 100;



padding: 16px;
text-align: center;
border-radius: 8px;

background-color: rgba(255, 255, 255, .8);
border: 2px solid #F74D4D;;


.message{
    color:#F74D4D;
    font-weight: bold;
}

`;

export default StyledAlert;