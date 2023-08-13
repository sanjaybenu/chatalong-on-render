const { Schema, model } = require('mongoose');

const responseSchema = new Schema ({
    message: {
        type: String,
        required: true,
        unique: true,
    },
    responseAuthor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
});
const Response = model('Response', responseSchema);

module.exports = Response;