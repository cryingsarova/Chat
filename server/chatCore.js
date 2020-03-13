const User = require('./models/User');

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
    }
};