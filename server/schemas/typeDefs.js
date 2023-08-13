//Revisit queries and mutations
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!   
    role: String
  }
  type Topic {
    _id: ID
    name: String!
    auther: User  
  }

  type Post {
    _id: ID
    heading: String!
    message: String!
    postAuthor: User
    topic: String!
    responses: [Response]
  }

  type Response {
    _id: ID
    message: String!
    responseAuthor: User! 
    post:Post!  
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID): User
    posts: [Post]
    postsByTopic(topic: String!): [Post]!
    post(postId: ID!): Post
    me: User
    response(responseId:ID!): Response
  
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, role: String): Auth
    addPost(heading: String!, message: String!,  topic: String!) : Post    
    updatePost(postId:ID!, message: String!): Post
    deletePost(postId: ID!): Post
    addResponse( postId: ID!, message: String!): Response  
    updateResponse(responseId: ID!, message: String!): Response
    deleteResponse (responseId: ID!): Response
  }
`;

module.exports = typeDefs;
