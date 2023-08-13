const { Schema, model } = require('mongoose');

const postSchema = new Schema ({
    heading:{
        type: String,
        required: true,
        unique: true,
    },
    message: {
        type: String,
        required: true,
        unique: true,
    },
    postAuthor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    topic:{
        type: String
    }
,
    responses: [{
        type: Schema.Types.ObjectId,
        ref: 'Response'
        }
    ],
});
const Post = model('Post', postSchema);

module.exports = Post;