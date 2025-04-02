const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server);


app.use(express.static(path.join(__dirname+"/public")));


io.on("connection", function(socket){
    socket.on("newuser", function(username){
        socket.broadcast.emit("update", username + " joined the chat.")
    });
    socket.on("exituser", function(username){
        socket.broadcast.emit("update", username + " left the chat.")
    });
    socket.on("chat", function(message){
        socket.broadcast.emit("chat", message);
    });
})

const port = 3000
server.listen(port, () => console.log(`Server listening on port ${port}!`))