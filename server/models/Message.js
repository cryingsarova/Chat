const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const MessageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    type: String,
    user: String,
    at: {type: Date, expires: '1h'},
    text: {
        type: String,
        required: true
    }
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;