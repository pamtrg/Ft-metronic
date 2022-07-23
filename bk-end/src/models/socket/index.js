

const { Server } = require('socket.io');
const express = require('express');
const { createServer } = require('http');
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        
    
    }
});



module.exports = {
    io,app,httpServer
}
