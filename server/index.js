//creates express server
const express = require('express');
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());
require("dotenv").config();

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin: "https://ripcord-client.onrender.com",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    socket.on("joinClientToServer", (data) => {
        const timestamp = Date.now();
        const newData1 = {message: data.username + " has joined!", user: data.user, timestamp: timestamp, username: "Server", color: 'white', pfp: "/yukko3.png"};
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