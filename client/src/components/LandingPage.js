import React from 'react'
import Register from './Register'
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels
} from '@chakra-ui/react'
import Login from './Login'
import Image from '../images/chat_screen.png'

export default function LandingPage ({ addUser, updateUser, currentUser }) {
  return (
    <Box style={{backgroundImage: "url(https://i.pinimg.com/originals/8c/18/48/8c1848078600b9d725a0ea6d39a40317.jpg)", backgroundRepeat:"no-repeat" , height:"900px",width:"1550px", position:"fixed"}} backgroundSize="cover" >
      <Box
        display={'flex'}
        marginTop='10px'
        margin={'20px'}
        borderWidth={'2px'}
        borderRadius='2xl'
        px={4}
        h={'60px'}
        w="1450px"
        
      >
        <Text
          marginTop={'10px'}
          fontSize={'2xl'}
          fontFamily={'initial'}
          marginLeft={'650px'}

        >
          CHAT TO LEARN
        </Text>
      </Box>

    <Box
    h="473px"
    width={"818px"}
    position={"absolute"}
     borderWidth={'2px'}
     borderRadius='2xl'
     marginLeft={"80px"}
     marginTop= "40px"
     style={{backgroundImage: `url(${Image})`, backgroundRepeat:"no-repeat", backgroundSize:"contain" }}
    
    ></Box>

      <Container maxW='xl' marginLeft={'900px'} centerContent>
        <Box
          d='flex'
          justifyContent='center'
          textAlign='center'
          p={3}
          bg='white'
          w='100%'
          m='40px 0 15px 0'
          borderRadius='20px'
          borderWidth='2px'
        >
          <Text fontSize='2xl' fontFamily={'mono'} color='Black'>
            {' '}
            Please Login to start!
          </Text>
        </Box>

        <Box
          bg='white'
          width='100%'
          p='4'
          borderRadius='20px'
          borderWidth='2px'
        >
          <Tabs variant='soft-rounded' colorScheme='green'>
            <TabList>
              <Tab width={'50%'}>Login</Tab>
              <Tab width={'50%'}>Register</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login updateUser={updateUser} />
              </TabPanel>
              <TabPanel>
                <Register addUser={addUser} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  )
}
