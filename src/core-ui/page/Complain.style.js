import styled from "styled-components";

export const StyledComplain = styled.section`

display: flex;
height: 100vh;
padding-top:16px;
padding-bottom: 16px;

.search-btn{
    background-color: rgba(247, 77, 77, 1);
    margin : 4px 0px 16px 4px;
    transition: 150ms linear;
}

.search-btn:hover{
    transform:scale(1.05)
}

.chat-container{
    width:422px;
    height: 100%;
    overflow-y: scroll;
    scrollbar-width: none;
}

.chat-container::-webkit-scrollbar {
        display: none;
    }


.middle-line{
    position: absolute;
    left:460px;
    top:-120px;

    height: 116vh;
    width: 2px;
    background-color: #6A6A6A4D;

}

.chatbody{
    padding: 0 0 0 48px;
    flex:1;
    display: flex;
    flex-direction: column;

    .messages-container{
        position: relative;
        flex:1;
        overflow-y:scroll;
        scrollbar-width: none;
    }

    .messages-container::-webkit-scrollbar {
        display: none;
    }


    form{
        width: 100%;
        border: 1px solid;
        
        input {
            outline: none;
            width:100%;
            height: 59px;
            font-size: 18px;
            background-color: #ABABAB26;
            padding: 0 32px;
            border: none;
        };
    }
}

// list




`