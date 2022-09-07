

const ProductRow = ({product,navigate,setIsModal,setId}) => {
  const id = product.id;

  return (
    <tr className='table-body-rows'>
                        <td>{product.index + 1}</td>
                        <td><img src = {product.image} style={{width:"40px"}}/></td>
                        <td>{product.title}</td>
                        <td>{product.desc.slice(0,8) + "...."}</td>
                        <td>{product.price}</td>
                        <td>{product.qty}</td>
                        <td className='btn-group'>
                            <button className='edit-btn' onClick={()=>{navigate(`/editproduct/${id}`)}}>Edit</button> 
                            <button className='delete-btn' onClick={()=>{setIsModal(true);setId(id)}} >Delete</button>
                        </td>
    </tr>
  ) 
}

export default ProductRow
