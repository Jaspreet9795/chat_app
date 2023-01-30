import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  VStack,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Button
} from '@chakra-ui/react'


export default function Login ({updateUser}) {
    console.log("update user"+ updateUser)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const handleClick = () => setShow(!show)

  function handleSubmit(e){
    e.preventDefault()
    const user = {
      email: email,
      password: password
    }
    fetch ("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(user)
    })
    .then (res=>{
        if(res.ok){
            res.json().then (user => {
                console.log("check A" +JSON.stringify(user))
                updateUser(user);
                navigate("/chat_rooms")})
        }else {
            // Set Error
        }
  })}
  
  return (
    <VStack spacing={'25px'}>
      <FormControl id='email' isRequired>
        <Input
          h='40px'
          placeholder='Email address '
          onChange={e => setEmail(e.target.value)}
          value={email}
        ></Input>
      </FormControl>

      <FormControl id='password' isRequired>
        <InputGroup>
          <Input
          value={password}
            h='40px'
            type={show ? 'text' : 'password'}
            placeholder='Password '
            onChange={e => setPassword(e.target.value)}
          ></Input>
          <InputRightElement width={'4.5rem'}>
            <Button h='1.5rem' size='sm' 
            onClick={handleClick}
            >
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button 
       
        colorScheme={'blue'}
        width='40%'
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </VStack>
  )
}
