import styled from "styled-components";

const StyledError = styled.div`

position: fixed;
display: flex;
align-items: center;
justify-content: center;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0,0,0,.8);

.body{
    background-color: #212121;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    padding: 24px 48px;
}

.title{
    color: white;
    font-size:30px;
    margin-bottom: 32px;
    font-weight: 600;
}

.cross {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius:100vw;
    width: 64px;
    height: 64px;
    color:white;
    background-color: #f74d4d;
    font-weight: 600;
    font-size: 20px;
}

.content {
    color: white;
    font-size: 20px;
    margin-top: 16px;
}
`;

export default StyledError;
