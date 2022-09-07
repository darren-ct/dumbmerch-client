import styled from "styled-components";

const StyledModal = styled.div`
  position: absolute;
  z-index: 50;
  left: 50%;
  top: 50%;
  display: flex;
  flex-direction:column;

  transform: translate(-50%,-50%);
  padding: 44px 30px;

  width: 698px;
  background-color:white;
  border-radius: 6px;

  b{
    font-size: 26px;
    color: #000000;
    margin-bottom: 16px;
  }

  p{
    font-size: 24px;
    color: #000000;
    margin-bottom: 40px;
  }

  .btn-group{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    

    .yes-btn{
      background-color: #56C05A;
    }

    .no-btn{
      margin-left:26px ;
      background-color:#F74D4D;

    }
  }

`;

export default StyledModal;
