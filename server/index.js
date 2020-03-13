const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8080;

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

    socket.emit('connect', () => {
       console.log('connection with client has established');
    });

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
});

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));

