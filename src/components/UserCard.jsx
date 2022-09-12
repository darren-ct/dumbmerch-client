import StyledUserCard from "../core-ui/UserCard.style"
import unknown from "../assets/unknown.jpg"


const UserCard = ({user,navigate,api,token}) => {

  const userId = user.user_id;
  console.log(user.profile_img)

  const chatUser = async() => {

    try {
      
       console.log(userId)
       const res = await api.post(`/chat/${userId}`,{},{
       headers: {'Authorization':`Bearer ${token}`}
      });

      const payload = res.data;
      const roomId = payload.data.room_id;

      navigate(`/complain/${roomId}`);

      
   } catch(err) {

       const payload = err.response.data;
       const message = payload.message;

       // navigate to error page
       console.log(message)

   };

  }

  return (
    <StyledUserCard>
        {
            user.profile_img ? <img src={user.profile_img} /> : <img src={unknown}/>
        }
        
        <div className="user-info">
             <span>{user.username}</span>
             <p>{user.isAdmin ? "Admin" : "User"} </p>
            <button onClick={chatUser}>Say Hi</button>
        </div>
    </StyledUserCard>
  )
}

export default UserCard