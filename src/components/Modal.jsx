import StyledModal from "../core-ui/Modal.style"

const Modal = ({id,deleteRow,setIsModal}) => {
  return (
    <StyledModal>
        <b>Delete Data</b>
        <p>Are you sure you want to delete this data?</p>
        <div className="btn-group">
              <button className="yes-btn" onClick={()=>{setIsModal(false);deleteRow(id)}}>Yes</button>
              <button className="no-btn" onClick={()=>{setIsModal(false)}}>No</button>
        </div>
    </StyledModal>
  )
}

export default Modal