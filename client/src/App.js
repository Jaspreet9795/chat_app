import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import CreateRoom from './components/CreateRoom'
import LandingPage from './components/LandingPage'

function App () {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(false)
  const [messages, setMessages] = useState([])
  const [rooms, setRooms] = useState([])
  const [chatUsers, setChatUsers] = useState([])

  useEffect(() => {
    fetch('/users')
      .then(res => res.json())
      .then(users => {
        setUsers(users)
        console.log('Users' + JSON.stringify(users))
      })
  }, [])

  function addUser (newUser) {
    setUsers([...users, newUser])
  }

  useEffect(() => {
    fetch('/authorised_user').then(res => {
      if (res.ok) {
        res.json().then(user => {
          setCurrentUser(user)
          console.log('check 2' + JSON.stringify(user))
        })
      }
    })
  }, [])

  useEffect(() => {
    fetch('/messages')
      .then(r => r.json())
      .then(messages => setMessages(messages))
  }, [])

  function addMessage (newMessage) {
    setMessages([...messages, newMessage])
  }

  useEffect(() => {
    fetch('/chat_rooms')
      .then(r => r.json())
      .then(rooms => setRooms(rooms))
  }, [])

  function addRoom (newRoom) {
    setRooms([...rooms, newRoom])
  }

  useEffect(() => {
    fetch('/chat_users')
      .then(r => r.json())
      .then(chatUsers => setChatUsers(chatUsers))
  }, [])

  function addChatUser (chatUser) {
    setChatUsers([...chatUsers, chatUser])
  }

  const updateUser = user => setCurrentUser(user)
  console.log('Check1' + JSON.stringify(setCurrentUser))

  return (
    <Routes>
      <Route
        exact
        path='/'
        element={
          <LandingPage
            addUser={addUser}
            updateUser={updateUser}
            currentUser={currentUser}
          ></LandingPage>
        }
      ></Route>
      
      <Route
        path='chat_rooms'
        element={
          <CreateRoom
            currentUser={currentUser}
            updateUser={updateUser}
            addMessage={addMessage}
            addRoom={addRoom}
            addChatUser={addChatUser}
          ></CreateRoom>
        }
      ></Route>
    </Routes>
  )
}

export default App
