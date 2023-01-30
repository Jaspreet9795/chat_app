import React from 'react'

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuGroup,
  Box,
  Button,
  Text
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import LogOut from './LogOut';

export default function Header ({currentUser,updateUser}) {
    console.log("checking current user" + JSON.stringify(currentUser))
    const [loggedIn, setLoggedIn] = useState(currentUser)

    useEffect(()=>{
        setLoggedIn(currentUser);
        console.log('changing logged in')
       }, [currentUser]);
  


  return (
    <Box display={'flex'} marginTop="10px"  margin={"20px"}  borderWidth={"2px"} borderRadius='2xl' px={4} h={'60px'}>
    <Text marginTop={"10px"} fontSize={"2xl"} fontFamily={"initial"} marginLeft={"550px"} > CHAT TO LEARN </Text>

      <Menu>
        {!loggedIn? 
        <MenuButton
          marginTop={'8px'}
          marginLeft={'500px'}
          as={Button}
          colorScheme='pink'
          width= {40}
        >
          Profile
        </MenuButton>:  <MenuButton
          marginTop={'8px'}
          marginLeft={'500px'}
          as={Button}
          width= {40}
          > {currentUser.name}</MenuButton>
        }
        <MenuList>
          <MenuGroup title='Profile'>
            <MenuItem>My Account</MenuItem>
            {!loggedIn? <NavLink to="/"><MenuItem >Login</MenuItem></NavLink> : <LogOut updateUser={updateUser}></LogOut>}
            
          </MenuGroup>
          </MenuList>
    
      </Menu>
    </Box>
  )
}
