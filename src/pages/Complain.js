import { useState , useEffect , useContext, useRef} from "react"
import { useNavigate, useParams} from "react-router-dom"

import { StyledComplain } from "../core-ui/page/Complain.style"
import ChatPerson from "../components/chat/ChatPerson"
import ChatMsg from "../components/chat/ChatMsg"


import {api} from "../connection";
import {pushError} from "../auth/index";
import {AppContext} from "../App";
import io from "socket.io-client";


const socket = io.connect("http://localhost:5000");


const Complain = () => {
  let {id} = useParams();
  const messagesEndRef = useRef(null);
  const {token,user} = useContext(AppContext);
  const navigate = useNavigate();


  


  // States
   const[activePerson,setActivePerson] = useState(Number(id));
   const[clickedPerson,setClickedPerson] = useState(null)
   
   const[msgList,setMsgList] = useState([]);
   const[personList,setPersonList] = useState( []);

   const[form,setForm] = useState({
       message : {
              value : "",
              errMsg : ""
       }
   });

   

// Use Effects

     // Get friend messages at first time
useEffect(()=>{
       getFriendMessages()
       
     },[])

     // Change message list every time main room id change
  useEffect(()=>{

    if(activePerson !== 0) {
       getMessageList(activePerson)
      
}

  },[activePerson]);


  useEffect(()=>{
      scrollToBottom();
  },[msgList])



      //   Clean previous listener
useEffect(()=>{
       socket.off("message_sent");
       socket.off("message_fail");
},[activePerson])

      // Add new listener
  useEffect(()=>{

    
       socket.on("message_sent",(data)=>{

       
       console.log(data.roomid , activePerson)

       if(data.roomid == activePerson){
       getMessageList(data.roomid) 
       console.log(`Executed`)
       };

       getFriendMessages();
       
    });

    socket.on("message_fail",(data)=>{
       console.log(data.message)
    })
  },[activePerson])


 

  // Functions
  const getFriendMessages = async() => {
      try {

         const res = await api.get(`/messages`,{
              headers : {'Authorization':`Bearer ${token}`}
         });

         const payload = res.data;
         const messages = payload.data.messages;

       //  Join room
       const rooms = messages.map(message => {return message.room_id});

       socket.emit("join_room", { room_ids : rooms})

       // Show messages
         setPersonList(messages);

      } catch(err) {
         const payload = err.response.data;
         const message = payload.message;

          // navigate to error page
         console.log(message)
      }
  };

  const getMessageList = async(roomid) => {
       try{
             const res = await api.get(`/messages/${roomid}`,{
              headers: {'Authorization':`Bearer ${token}`}
             });

             const payload = res.data;
             const messages = payload.data.messages;
             setMsgList(messages);

       } catch(err) {

             const payload = err.response.data;
             const message = payload.message;

              // navigate to error page
              console.log(message)

       }
  };

  const postMessage = async(roomid) => {
       
          socket.emit("send_message",{
              userId: user.user_id,
              roomID : roomid,
              message : form.message.value
          })

  };

  const deleteMessage = async() => {

  };

  const onChange = (e) => {
        setForm((prev)=>{
              return {
                     ...prev,
                     [e.target.name] :{
                            value:e.target.value,
                            errMsg : prev[e.target.name].errMsg
                     } 
              }
        })
  }

  const onSubmit = (e) => {
     e.preventDefault();
     

     if(!form.message.value){
       return pushError(setForm,"message","Cannot send empty text")
     };


     
     postMessage(activePerson);

     setForm({
       message : {
              value : "",
              errMsg : ""
       }
   })
  }

  const scrollToBottom = () => {
       messagesEndRef.current?.scrollIntoView({behavior:"smooth"});
  }

  return (
    
      <StyledComplain>
           {/* Left */}
           <div className='chat-container'>
                  <button className="search-btn" onClick={()=>{navigate("/searchuser")}}>Search Users</button>
                  <div className="chat-list">
                        {personList ? personList.map(person => <ChatPerson key={person.room_id} person={person} setActivePerson={setActivePerson} setClickedPerson={setClickedPerson} clickedPerson={clickedPerson}/>) : <p>You don't have any active messages...</p>}
                  </div>
           </div>

           {/* Line */}
           <div className="middle-line"></div>

           {/* Right */}
           <div className='chatbody'>
                  <div className="messages-container">
                         <div className="messages-list">
                                {activePerson == 0 ? <p>Please click one of your friends and start chatting!!</p>  :  msgList.map(msg => <ChatMsg key={msg.message_id} msg={msg}/>)}
                         </div>
                         <div ref={messagesEndRef}></div>
                  </div>
                {activePerson != 0 &&  <form onSubmit={onSubmit}>
                     <input name="message" type="text" placeholder="Send message" onChange={onChange} value={form.message.value}/>
                  </form> }
           </div>

      </StyledComplain>
    
  )
}

export default Complain
