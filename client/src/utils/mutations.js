import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
export const ADD_POST = gql`
mutation AddPost($heading: String!, $message: String!, $topic: String!) {
    addPost(heading: $heading, message: $message, topic: $topic) {
      heading
      message
      _id
      postAuthor {
        _id        
      }
      topic
    }
  }
`;
export const UPDATE_POST = gql`
mutation UpdatePost($postId: ID!, $message: String!) {
  updatePost(postId: $postId, message: $message) {
    _id
    message
  }
}
`;
export const DELETE_POST = gql`
mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId) {
      _id
      heading
      message
      postAuthor {
        username
      }
    }
  }
`;
export const ADD_RESPONSE = gql`
mutation AddResponse($postId: ID!, $message: String!) {
    addResponse(postId: $postId, message: $message) {
      _id
      message
      responseAuthor {
        _id
           }
    }
  }
`;
export const DELETE_RESPONSE = gql`
mutation DeleteResponse($responseId: ID!) {
    deleteResponse(responseId: $responseId) {
      _id
      message
      responseAuthor {
        username
      }
    }
  }
`;
