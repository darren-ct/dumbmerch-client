import styled from "styled-components";

const StyledSuccess = styled.div`
position: fixed;
display: flex;
align-items: center;
justify-content: center;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0,0,0,.8);
z-index: 50;

div{
    background-color: #212121;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    padding: 12px 24px;
}

.title{
    color: white;
    font-size:30px;
    margin-bottom: 32px;
    font-weight: 600;
}

.content {
    color: white;
    font-size: 20px;
    margin-top: 16px;
}
`;

export default StyledSuccess;
