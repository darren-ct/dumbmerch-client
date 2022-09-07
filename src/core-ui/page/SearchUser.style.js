import styled from "styled-components";

 const StyledSearchUser = styled.section`
 
    form {
        max-width: 800px;
        margin: 0 auto 80px auto;

        .form-control{
            display: flex;
            justify-content: center;
            margin-bottom: 0px;
        };

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
        }

        .search-btn{
        margin-top: 70px;
        width: 100%;
        background: #56C05A;
        font-size: 18px;
        padding: 12px;

        &:hover{
            scale: 1;
        }
    }


    };

    .user-container {
        height: 800px;
        overflow-y: scroll;
        scrollbar-width: none;

        
    }

    .user-container::-webkit-scrollbar {
        display: none;
    }



 `

 export default StyledSearchUser;