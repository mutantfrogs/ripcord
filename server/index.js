//creates express server
const express = require('express');
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        //origin: "http://localhost:5174",
        origin: "https://ripcord-client.onrender.com",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    socket.on("joinClientToServer", (data) => {
        const timestamp = Date.now();
        const newData1 = {message: data.username + " has joined " + data.lobby + "!", user: data.user, timestamp: timestamp, username: "Server", color: 'white', pfp: ""};
        socket.join(data.lobby);
        io.to(data.lobby).emit("joinClientToLobby", (newData1));
    })
    
    socket.on("sendMsgToServer", (data) => {
        let parsedMessage = data.message;
        let modifier = "";
        if(data.message.startsWith("/r")){
            parsedMessage = data.message.slice(2);
            modifier = 'rainbow-text';
        }
        if(data.message.startsWith("/b")){
            parsedMessage = data.message.slice(2);
            modifier = 'bold';
        }
         if(data.message.startsWith("/i")){
            parsedMessage = data.message.slice(2);
            modifier = 'italic';
        }
        const timestamp = Date.now();
        const newData = {lobby: data.lobby, message: parsedMessage, user: data.user, timestamp: timestamp, username: data.username, color: data.color, pfp: data.pfp, modifier: modifier}; 
        io.to(data.lobby).emit("sendMsgToClient", (newData));
    })
});

server.listen(3001, () => {
    console.log("Server is online!")
});