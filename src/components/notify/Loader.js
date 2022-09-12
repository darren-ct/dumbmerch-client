import {MutatingDots} from 'react-loader-spinner'
import StyledLoader from '../../core-ui/Loader.style'

const Loader = ({msg}) => {
  return (
  <StyledLoader>
        <div>
            <MutatingDots height="100" width="100" color="#f74d4d" secondaryColor= '#f74d4d' radius='12.5' ariaLabel="mutating-dots-loading"  wrapperStyle={{}} wrapperClass="" visible={true}/>
            <span>{msg ? msg : "Loading..."}</span>
        </div>
  </StyledLoader>
  )
}

export default Loader