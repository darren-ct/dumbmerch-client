import StyledError from "../../core-ui/Error.style"

const Error = ({error}) => {
  return (
    <StyledError>
        <div className='body'>
            <span className="title">ERROR...</span>
            <div className='cross'>X</div>
            <span className='content'>Oopss....{error ? error : ""}.. Try reloading</span>
        </div>
    </StyledError>
  )
}

export default Error