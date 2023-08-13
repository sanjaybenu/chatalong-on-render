import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import AddPostButton from './AddPostButton';
import { Segment } from 'semantic-ui-react';
import { QUERY_POST_BY_TOPIC } from '../utils/queries';
import '../Style/Post.css';

const Post = ({ setPosts }) => {
  const { topic } = useParams();

  // Fetch data using useQuery hook
  const { loading, error, data, refetch } = useQuery(QUERY_POST_BY_TOPIC, {
    variables: { topic },
  });

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Access the posts from the returned data
  const posts = data.postsByTopic;

  return (
    <div className="PostContainer">
      <h1>{topic}</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id}>
            <Segment className='PostSegment'>
              <Link to={`/post/${topic}/${post._id}`}>
                {post.heading}
              </Link>
            </Segment>
          </div>
        ))
      ) : (
        <p>No posts yet. Please add a post.</p>
      )}
      <AddPostButton setPosts={setPosts} topic={topic} refetchPost={refetch} />
      <Outlet />
    </div>
  );
};

export default Post;
