import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';


// const cableApp ={};

// cableApp.cable = actionCable.createConsumer("ws://localhost:3000/cable");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <ChakraProvider>
    {/* <App cableApp={cableApp} /> */}
    <App/>
    </ChakraProvider>
    </BrowserRouter>
);


