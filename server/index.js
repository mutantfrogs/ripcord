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
        const newData1 = {message: data.username + " has joined " + data.lobby + "!", user: data.user, timestamp: timestamp, username: "Server", color: 'white', pfp: "/pfp/yukko3.png"};
        socket.join(data.lobby);
        io.to(data.lobby).emit("joinClientToLobby", (newData1));
    })
    
    socket.on("sendMsgToServer", (data) => {
        const timestamp = Date.now();
        const newData = {lobby: data.lobby, message: data.message, user: data.user, timestamp: timestamp, username: data.username, color: data.color, pfp: data.pfp}; 
        io.to(data.lobby).emit("sendMsgToClient", (newData));
    })
});

server.listen(3001, () => {
    console.log("Server is online!")
});