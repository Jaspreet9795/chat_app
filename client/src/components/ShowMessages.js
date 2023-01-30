import React ,{useState,useEffect} from "react";
import {Message } from '@chatscope/chat-ui-kit-react'




export default function ShowMessages ({message, currentUser, key}){
    const [userName, setUserName] = useState([])

 useEffect(()=>{
    // fetch(`/users/${message.user_id}`)
    fetch (`/message_users/${message.user_id}`)
  .then(r=>r.json())
  .then(userInfo => {setUserName(userInfo.name)
    console.log("Sender A:" + userInfo.name)
    console.log("Sender Id: "+ JSON.stringify(message.user_id))
});

  },[message])
   

  if (message.user_id === currentUser.id) {
    return( <Message
    key={key}
    model={{
      message: message.content,
    //   sentTime: 'just now',
      // sender: getUserName( message.user_id),
      sender: currentUser.id,
       direction: "outgoing",
      position: "single"
    }}>
        
      <Message.Footer  sender={currentUser.name} />
      </Message> )
  

  } else {
    return <Message
                key={key }
                model={{
                  message: message.content,
                //   sentTime: 'just now',
                  sender: {userName},
                  direction: "incoming",
                  position: "single"
                }}>
                    <Message.Footer sender={userName}  />
                </Message> 
  }

}






