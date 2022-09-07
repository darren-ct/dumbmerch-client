
import StyledTransactionCard from '../core-ui/TransactionCard.style'
import logo from "../assets/dumbmerch-logo.svg"
import {getMonth} from "../helpers/index"



const TransactionCard = ({transaction}) => {

     const day = transaction.day;
     const month = getMonth(transaction.month);
     const year = transaction.year;

     const time = day + " " +  month + "," + year;

     
  return (
      <StyledTransactionCard status={transaction.status}>
           <img className='transaction-img' src={transaction.product.image} alt=''/>
           <div className='transaction-description'>
                <b>{transaction.product.title}</b>
                <span className='time'>{time}</span>
                <p>Price: Rp.{transaction.product.price}</p>
                <p>Qty: {transaction.qty}</p>
                <b className='total'>Sub Total:{transaction.price}</b>
           </div>
           <div className='status'>{transaction.status}</div>
      </StyledTransactionCard>
  )
}

export default TransactionCard