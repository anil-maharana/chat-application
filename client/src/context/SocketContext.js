import React from 'react';
import { io } from 'socket.io-client';
import configData from '../config/config.json'
console.log(localStorage.token ? localStorage.token : null);
export const socket = io.connect(`${configData.SERVER_URL}`, {
    query: { token: localStorage.token ? localStorage.token : null }
});


const SocketContext = React.createContext(socket);
export default SocketContext