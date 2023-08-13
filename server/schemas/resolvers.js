const { AuthenticationError } = require('apollo-server-express');
const { User, Topic, Post, Response } = require('../models');
const { signToken } = require('../utils/auth');
const resolvers = {
    Query: {
      users: async () => {
        return User.find()
      },

      user: async (parent, { userId }) => {
        return User.findOne({ _id: userId })          
      },
 
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate('posts');
        }
        throw new AuthenticationError('You need to be logged in!');
      },

      posts: async () => {
        return Post.find().populate('postAuthor').populate('responses');
      },

      postsByTopic: async(parent, { topic }) => { 
        const posts = await Post.find({topic}).populate('postAuthor').populate('responses');  
        return posts;
      },

      post: async (parent, { postId }) => {
        return Post.findOne({ _id:postId }).populate('postAuthor').populate('responses');           
      },
      response: async (parent, { responseId }) => {
        return Response.findOne({ _id:responseId }).populate('responseAuthor');           
      },



    },
    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
      
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });  
        if (!user) {
          throw new AuthenticationError('No user found with this email address');
        }  
        const correctPw = await user.isCorrectPassword(password);  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }  
        const token = signToken(user);  
        return { token, user };
      },

      addPost: async (parent, {heading, message, topic}, context) => {
        console.log("context.user", context.user._id )
        if (context.user) {
          console.log ("context.user", context.user._id);
          const post = await Post.create({
            heading, message, topic,
            postAuthor: context.user._id,
          });  
          return post;
        }
        throw new AuthenticationError('You need to be logged in!');
      },


      updatePost: async (parent, {postId, message}, context) => {
        console.log("context.user._id", context.user._id)
        if (context.user){
          const post = await Post.findOne({_id:postId});
          console.log (post.postAuthor._id)
          if (post && post.postAuthor._id.toString() === context.user._id.toString()) {
            const updatedPost = await Post. findOneAndUpdate(
            {_id:postId},
            {message},
            {new: true}
            );
            return updatedPost;
          }
        }
        throw new AuthenticationError('You can update only your posts while logged in!');
      },

      deletePost: async (parent, {postId}, context) => {
        if (context.user){
          const post = await Post.findOne({_id:postId});
          if (post && post.postAuthor._id.toString() === context.user._id.toString()) {
            const deletedPost = await Post. findOneAndDelete({_id:postId});
            return deletedPost;
          }
        }
        throw new AuthenticationError('You can delete only your posts while logged in!');
      },

      addResponse: async (parent, {postId, message}, context) => {
        if (context.user) {
          const response = await Response.create({ message, responseAuthor:context.user._id});
          await Post.findOneAndUpdate(
            { _id: postId },
            {
              $push: {
                responses: response
              },
            },
            {
              new: true,
              runValidators: true,
            }
          
          );
          return response;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      // updateResponse: async (parent, {heading, message, topic}, context) => {

      // },

      deleteResponse: async (parent, {responseId}, context) => {
        if (context.user){
          const response = await Response.findOne({_id:responseId});
          if (response && response.responseAuthor._id.toString() === context.user._id.toString()) {
            const deletedResponse = await Response. findOneAndDelete({_id:responseId});
            return deletedResponse;            
          }
        }
        throw new AuthenticationError('You can delete only your responses while logged in!');
      },
    },
};


module.exports = resolvers;