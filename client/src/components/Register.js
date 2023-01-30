import React, { useState } from 'react'
import {
  Button,
  Select,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'


export default function Register ({ addUser }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selection, setSelection] = useState('')
  const [show, setShow] = useState(false)

  const navigate = useNavigate()

  const handleClick = () => setShow(!show)

  const handleSubmit = e => {
    e.preventDefault()
    const newUser = {
      name: name,
      email: email,
      password: password,
      role: selection,
      
    }
    fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(r => r.json())
      .then(user => {
        addUser(user)
        setName('')
        setPassword('')
        setEmail('')
        setSelection('')
        // navigate("/chat_rooms")

      })
  }
  return (
    <VStack spacing={'25px'}>
      <FormControl id='name' isRequired>
        <Input
          h='40px'
          placeholder='Name '
          value={name}
          onChange={e => setName(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl id='selection'>
        <Select
          value={selection}
          onChange={e => setSelection(e.target.value)}
          placeholder='Select role'
        >
          <option value='student'>Student</option>
          <option value='teacher'>Teacher</option>
        </Select>
      </FormControl>

      <FormControl id='email' isRequired>
        <Input
          h='40px'
          placeholder='Email address'
          onChange={e => setEmail(e.target.value)}
          value={email}
        ></Input>
      </FormControl>

      <FormControl id='password' isRequired>
        <InputGroup>
          <Input
            h='40px'
            type={show ? 'text' : 'password'}
            placeholder='Password '
            onChange={e => setPassword(e.target.value)}
            value={password}
          ></Input>
          <InputRightElement width={'4.5rem'}>
            <Button h='1.5rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* <FormControl id="pic" >
            <FormLabel>Upload your picture</FormLabel>
            <Input h="40px" p ="4.5px" type={"file"} accept="image/*"  
            onChange={e=>setPic(e.target.value)}></Input>
           </FormControl> */}

      <Button
        colorScheme={'blue'}
        width='40%'
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </VStack>
  )
}
