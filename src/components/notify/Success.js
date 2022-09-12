import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import StyledSuccess from "../../core-ui/Success.style";
import image from "../../assets/successfull.svg"

const Success = ({setSuccessMsg,successMsg,to}) => {

  const navigate = useNavigate();

  useEffect(()=>{
    setTimeout(()=>{
        setSuccessMsg(null);

        if(to) navigate(`/${to}`);
    },[2000])
  },[]);

  return (
  <StyledSuccess>
        <div>
            <span className="title">SUCCESS!!</span>
            <img src={image} width={64} height={64}/>
            <span className="content">{successMsg}</span>
        </div>
  </StyledSuccess>
  )
}

export default Success