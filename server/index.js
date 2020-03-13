const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://alinau:admin@cluster0-lk3bb.mongodb.net/chat?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("DB Connected..."))
    .catch(err => console.log(err));

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);
app.use(cors());

const chat = require('./chatCore');

io.on('connection', (socket) => {
    console.log('new connection');

    socket.on('register', ({name, password, room}, callback) => {
        console.log(name, room);

        chat.signUp(socket, name, password, room, function (response) {
            console.log(response);
            callback(response);
        });
    });

    socket.on('login', ({name, password, room}, callback) => {
        console.log(name, room);

        chat.signIn(socket, name, password, room, function (response) {
            console.log(response);
            callback(response);
        });
    });

    socket.on('enterChat', ({name, room}) => {
        chat.enterChat(io, socket, name, room);
    });

    socket.on('getUsers', ({room}, callback) => {
        chat.getUsers(room, function (response) {
            console.log(response);
            callback(response);
        });
        socket.join(room);
    });

    socket.on('getLatestMessages', ({room}, callback) => {
        chat.getLatestMessages(room, function (response) {
            console.log(response);
            callback(response);
        });
    });

    socket.on('createMessage', ({name, room, message}, callback) => {
        console.log({name, room, message});

        chat.createMessage(io, socket, name, room, 'usermsg', name, message, function (response) {
            console.log(response);
            if(response.status === 'success') {
                console.log('sending to users in the room');
                io.to(room).emit('message', response.newmsg);
            }
            callback(response);
        });
    });

    socket.on('end', ({name, room}, callback) => {
        console.log(`User ${name} has left`);

        io.to(room).emit('message', {
            name: 'admin',
            text: `${name} has left`
        });

        chat.getUsers(room, function (response) {
            console.log(response);
            io.to(room).emit('roomData', {room, response});
        });

        callback();
    });
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));