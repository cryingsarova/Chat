const User = require('./models/User');
const Message = require('./models/Message');

module.exports = {

    saveUsertoDB: function (socket, name, password, room) {
        const newUser = new User({
            name, password, room
        });

        console.log(newUser);

        return newUser.save().then(function () {
            console.log("User saved");

            const token = newUser.setToken();
            console.log(token);

            socket.user_info = newUser;

            return {status: 'success', token: token};
        }).catch(function () {
            console.log("Error registering new user please try again.");
            return {status: 'error', message: 'Error registering new user please try again'};
        });
    },

    signUp: function (socket, name, password, room, callback) {
        const ctx = this;
        User.findOne({name}, async function (err, user) {
            if (err) {
                console.log('Internal error please try again');
                callback({status: 'error', message: 'Internal error please try again'});
            } else if (user) {
                console.log('User authorized');
                callback({status: 'warning', message: 'User has already registered'});
            } else {
                const status = await ctx.saveUsertoDB(socket, name, password, room);
                console.log(status);
                callback(status);
            }
        });
    },

    signIn: function (socket, name, password, room, callback) {
        User.findOne({name}, async function (err, user) {
            if (err) {
                console.log('Internal error please try again');
                callback({status: 'error', message: 'Internal error please try again'});
            } else if (!user) {
                console.log('User not authorized');
                callback({status: 'error', message: 'Incorrect name or password'});
            } else {
                await user.isCorrectPassword(password, function (err, same) {
                    if (err) {
                        console.log('Internal error please try again');
                        callback({status: 'error', message: 'Internal error please try again'});
                    } else if (!same) {
                        console.log('Incorrect password');
                        callback({status: 'error', message: 'Incorrect name or password'});
                    } else {
                        console.log('valid');

                        const token = user.setToken();
                        console.log(token);

                        socket.user_info = user;

                        callback({status: 'success', token: token});
                    }
                });
            }
        });
    },

    getUsers: function(room, callback) {
        let users = [];
        const cursor = User.find({room}).cursor();

        cursor.on('data', function (doc) {
            console.log(doc);
            users.push(doc);
        });

        cursor.on('close', function () {
            console.log(users);
            callback(users);
        });
    },

    enterChat: function (io, socket, name, room) {
        const text = `${name}, welcome to the room`;
        this.createMessage(io, socket, 'admin', room, 'welcome', name, text, function (response) {
            if(response.status === 'success') {
                console.log(response.newmsg);
                socket.emit('message', response.newmsg);
            }
        });

        const notif = `${name} has joined`;
        this.createMessage(io, socket, 'admin', room, 'join', name, notif, function (response) {
            if(response.status === 'success') {
                socket.broadcast.to(room).emit('message', response.newmsg);
            }
        });

        socket.join(room);

        this.getUsers(room, function (users) {
            io.to(room).emit('roomData', {users});
        });
    },

    createMessage: function (io, socket, name, room, type, user, text, callback) {
        let message = new Message({
            name: name,
            room: room,
            type: type,
            user: user,
            at: new Date(),
            text: text
        });
        console.log(message);
        message.save((err, newmsg) => {
            if (err) {
                callback({status: 'error'});
            } else {
                console.log('message saved in db');
                console.log({status: 'success', newmsg});
                callback({status: 'success', newmsg});
            }
        });
    },

    getLatestMessages: function (room, callback) {
        let messages = [];
        const cursor = Message.find({room}).cursor();

        cursor.on('data', function (doc) {
            console.log(doc);
            messages.push(doc);
        });

        cursor.on('close', function () {
            console.log(messages);
            callback(messages);
        });
    }
};