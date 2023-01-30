import React, { useEffect, useState } from 'react'
import {Box} from '@chakra-ui/react'

import actionCable from 'actioncable'
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader
} from '@chatscope/chat-ui-kit-react'
import ShowMessages from './ShowMessages'

const cableApp = {}

export default function Chats ({ currentUser, addMessage, id }) {
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [room, setRoom] = useState([])

  // const [chatUsers, setChatUsers] = useState([])
  const [userName, setUserName] = useState('')
  const [userRole, setUserRole] = useState("")

  useEffect(() => {
    cableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')
    const paramsToSend = {
      channel: 'ChatRoomChannel',
      id: room.id
    }
    console.log('Checking connection id:' + JSON.stringify(paramsToSend))
    const handlers = {
      received (data) {
        // console.log('Data' + JSON.stringify(data))
        setMessages(data.messages)
        // setMessages([...messages, data])
        setUsers(data.users)
      },

      connected () {
        console.log('connected')
      },
      disconnected () {
        console.log('disconnected')
      }
    }
    const subscription = cableApp.cable.subscriptions.create(
      paramsToSend,
      handlers
    )
    return function cleanup () {
      console.log('unsubscribing from', room.id)
      subscription.unsubscribe()
    }
  }, [room.id, messages])

  function handleSubmit (messageContent) {
    // e.preventDefault()
    // console.log("input is "+e)
    const newMessage = {
      content: messageContent,
      user_id: currentUser.id,
      chat_room_id: room.id
    }
    fetch('/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessage)
    })
      .then(r => r.json())
      .then(message => {
        addMessage(message)
      })
  }

  useEffect(() => {
    if (id !== null) {
      fetch(`/chat_rooms/${id}`)
        .then(r => r.json())
        .then(room => {
          setRoom(room)
          console.log('Title: ' + JSON.stringify(room.title))
          setMessages(room.messages)
          // setChatUsers(room.chatUsers)
        })
    }
  }, [id])

  
  useEffect(()=>{
    if(room.user_id != null){
    fetch(`/message_users/${room.user_id}`)
    .then(r=>r.json())
    .then(userInfo=>{
      setUserName(userInfo.name)
      setUserRole(userInfo.role)
    })}

  },[room.user_id])

  return (
    <Box
      display='flex'
      position={'absolute'}
      alignItems='center'
      flexDir='column'
      // float={'center'}
      p={1}
      // bg="pink.50"
      style={{backgroundImage: "url(https://thumbs.dreamstime.com/b/drawn-symbols-school-subjects-chalkboard-copy-space-93532820.jpg)"}}
   
      backgroundSize='cover'
      margin={'50px 50px 10px 650px '}
      h={700}
      w={{ base: '100%', md: '55%' }}
      borderRadius='lg'
      borderWidth='1px'
      overflow='scroll'
    >
      <ChatContainer   style={{ width: '70%' }}>
        <ConversationHeader>
          <ConversationHeader.Content>
            <b>{room.title}</b> Created By: {userName} ({userRole}) 
          </ConversationHeader.Content>
        </ConversationHeader>

        <MessageList scrollBehavior='smooth'>
          {/* {console.log("messages array is  "+ JSON.stringify(messages.user_id))} */}
          {messages.map((message, index) => {
            // console.log('message is '+JSON.stringify(message))

            return (
              <ShowMessages
                message={message}
                key={index}
                currentUser={currentUser}
              ></ShowMessages>
            )
          })}
        </MessageList>
        <MessageInput placeholder='Type message here' onSend={handleSubmit} />
      </ChatContainer>
    </Box>
  )
}
