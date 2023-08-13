import { gql } from '@apollo/client';
export const QUERY_USERS = gql`
query Users {
    users {
      _id
      username
      email
      role
    }
  }
`;
export const QUERY_USER = gql`
query User($userId: ID) {
    user(userId: $userId) {
      _id
      username
      email
      role
    }
  }
`;
export const QUERY_POSTS = gql`
query Posts {
    posts {
      _id
      heading
      message
      postAuthor {
        _id
      }
      topic
    }
  }
`;
export const QUERY_POST_BY_ID = gql`
query Post($postId: ID!) {
  post(postId: $postId) {
    _id
    heading
    message
    postAuthor {
      _id
      username
    }
    responses {
      message 
    }
    
  }
}
`;
export const QUERY_POST_BY_TOPIC = gql`
query PostsByTopic($topic: String!) {
    postsByTopic(topic: $topic) {
      _id
      heading
      message
      postAuthor {
        _id
        username
      }
      topic
      responses {
        _id
        message
        responseAuthor {
          _id
        }
      }
    }
  }
`;

