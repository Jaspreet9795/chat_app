import React, { useState, useEffect } from 'react'
import { Box, Stack } from '@chakra-ui/react'
import { Select, Form, Input, Button, Divider } from 'antd'

import Chats from './Chats'
import Header from './Header'

function selectedUsers (selectedTeachers, selectedStudents) {
  console.log(
    'check Final:' + JSON.stringify([...selectedStudents, ...selectedTeachers])
  )
  return [...selectedStudents, ...selectedTeachers]
}

export default function CreateRoom ({
  addRoom,
  addMessage,
  updateUser,
  currentUser,
  addChatUser
}) {
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])
  const [roomTitle, setRoomTitle] = useState('')
  const [rooms, setRooms] = useState([])
  const [addedRoom, setAddedRoom] = useState('')

  const [showChat, setShowChat] = useState(false)
  const [id, setId] = useState(null)

  const [selectedStudents, setSelectedStudents] = useState([])
  const filteredStudentOptions = students.filter(
    o => !selectedStudents.includes(o)
  )

  const [selectedTeachers, setSelectedTeachers] = useState([])
  const filteredTeacherOptions = teachers.filter(
    o => !selectedTeachers.includes(o)
  )

  console.log('Check B1:' + JSON.stringify(selectedTeachers))
  console.log('Check B2:' + JSON.stringify(selectedStudents))

  useEffect(() => {
    fetch('/students')
      .then(res => res.json())
      .then(students => setStudents(students))
  }, [])

  useEffect(() => {
    fetch('/teachers')
      .then(res => res.json())
      .then(teachers => setTeachers(teachers))
  }, [])

  useEffect(() => {
    fetch('/filter_chat_rooms')
      .then(r => r.json())
      .then(rooms => setRooms(rooms))
  }, [addedRoom])




//   POSTING ROOM
  function handleSubmit () {
   
    const newRoom = {
      title: roomTitle,
      users: []
    }
    fetch('/chat_rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRoom)
    })
      .then(r => r.json())
      .then(room => {
        addRoom(room)
        
        // console.log('creator:' + JSON.stringify(room.creator))
        fetch('/chat_users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chat_room_id: room.id,
            user_id: selectedUsers(selectedStudents, selectedTeachers)
          })
        })
          .then(r => r.json())
          .then(chat_user => {
            addChatUser(chat_user)
            
          })
       setAddedRoom(room.id)
        setRoomTitle('')
        setSelectedTeachers([])
        setSelectedStudents([])
      })
  }

  return (
    <>
      <Header currentUser={currentUser} updateUser={updateUser}></Header>

      <Box
        display='flex'
       
        position={'absolute'}
        alignItems='center'
        flexDir='column'
        p={1}
        bg='white'
        margin={'50px 50px 0 50px '}
        h={700}
        w={{ base: '100%', md: '35%' }}
        borderRadius='lg'
        borderWidth='1px'
        // backgroundImage={"https://images.squarespace-cdn.com/content/v1/5eff5565a16ce9490e9c419b/2b701903-49f9-491b-9c73-45eb392c81ad/TotallyTalking+Social+073.png"}
        // backgroundSize="cover"
      >
        <h1 style={{ marginTop: 30 }}>
          <b>Create your Chat Room!</b>
        </h1>
        <Form style={{ marginTop: 30 }} onFinish={handleSubmit}>
          <Form.Item label='Chat Title:'>
            <Input
              style={{ width: '250px', marginLeft: 25 }}
              value={roomTitle}
              onChange={e => {
                setRoomTitle(e.target.value)
              }}
              required
            ></Input>
          </Form.Item>

          <Form.Item label='Add Students:'>
            <Select
              mode='multiple'
              placeholder='Add Students'
              value={selectedStudents}
              onChange={setSelectedStudents}
              style={{
                width: '100%'
              }}
              options={filteredStudentOptions.map(item => ({
                value: item.id,
                label: item.name
              }))}
            />
          </Form.Item>

          <Form.Item label='Add Teachers:'>
            <Select
              mode='multiple'
              placeholder='Add Teachers'
              value={selectedTeachers}
              onChange={setSelectedTeachers}
              style={{
                width: '100%'
              }}
              options={filteredTeacherOptions.map(item => ({
                value: item.id,
                label: item.name
              }))}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 16,
              span: 16
            }}
          >
            <Button type='primary' htmlType='submit'>
              Create Room
            </Button>
          </Form.Item>
        </Form>

        <Divider></Divider>

        <Box
          h={'auto'}
          marginTop={'40px'}
          width={{ base: '100%', md: '85%' }}
          overflow='scroll'
        >
          <h2 style={{ fontSize: '17px', marginLeft: '180px' }}>
            <b>Your Rooms</b>
          </h2>

          <Box marginTop={'50px'}>
            <Stack display={'flex'} spacing='30px'>
              {rooms.map((room, index) => {
                return (
                  <ol
                    key={index}
                    style={{
                      fontSize: '15px'
                    }}
                  >
                    {room.title}
                    <Button
                      style={{ float: 'right' }}
                      onClick={() => {
                        setId(room.id)
                        setShowChat(!showChat)
                        console.log('Room id:' + room.id)
                      }}
                    >
                      Enter
                    </Button>
                  </ol>
                )
              })}
            </Stack>
          </Box>
        </Box>
      </Box>
      <Chats id={id} currentUser={currentUser} addMessage={addMessage}></Chats>
    </>
  )
}
