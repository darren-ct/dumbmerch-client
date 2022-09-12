import {MutatingDots} from 'react-loader-spinner'
import StyledLoader from '../../core-ui/Loader.style'

const Loader = ({msg}) => {
  return (
  <StyledLoader>
        <div>
            <MutatingDots height="100" width="100" color="#BFACE0" secondaryColor= '#A084CA' radius='12.5' ariaLabel="mutating-dots-loading"  wrapperStyle={{}} wrapperClass="" visible={true}/>
            <span>{msg}</span>
        </div>
  </StyledLoader>
  )
}

export default Loader