import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_POST_BY_ID } from '../utils/queries';
import { UPDATE_POST, ADD_RESPONSE } from '../utils/mutations';
import { Card, Button, Form, Header, Input, Segment } from 'semantic-ui-react';
import '../Style/PostContent.css';

const PostContent = () => {
  const { id } = useParams();
  const { loading, data, refetch } = useQuery(QUERY_POST_BY_ID, {
    variables: { postId: id },
  });

  const [showResponseForm, setShowResponseForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [message, setMessage] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');
  const [addResponse] = useMutation(ADD_RESPONSE);
  const [updatePost] = useMutation(UPDATE_POST);

  // Data is still being fetched, show loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // Data has been fetched, continue with the component logic
  const postContent = data?.post;
  const responseMessages = postContent?.responses?.map(response => response.message) || [];

  const handleResponseClick = () => {
    setShowResponseForm(true);
    setShowUpdateForm(false);
   
  };

  const handleUpdateClick = () => {
    setShowUpdateForm(true);
    setShowResponseForm(false);
    setUpdatedContent(postContent?.message || "")
  };

  const handleResponseFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (message.trim() === '') {
        alert('Please fill all the fields.');
        return;
      }

      await addResponse({
        variables: {
          postId: id,
          message: `${message}`,
        },
      });

      setMessage('');

      refetch();
      setShowResponseForm(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleUpdateFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (updatedContent.trim() === '') {
        alert('Please enter updated content.');
        return;
      }

      await updatePost({
        variables: {
          postId: id,
          message: updatedContent,
        },
      });

 
      setUpdatedContent('');

      setShowUpdateForm(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="PostContainer">
        <h1 className="PostTitle">{postContent?.heading}</h1>
        <p className="PostUsername">By: <span className="span">{postContent?.postAuthor.username}</span></p>
        <h2>{postContent?.message}</h2>
        
        <div>
          {responseMessages.length > 0 ? (
            responseMessages.map((response, index) => (
              <Segment vertical key={index}>{response}</Segment>
            ))
          ) : (
            <h3>No replies yet</h3>
          )}
        </div>

        {/* Render buttons in a container */}
        <div className="ButtonContainer">
          {!showResponseForm && !showUpdateForm && (
            <>
              <button onClick={handleResponseClick}>Response</button>
              <button onClick={handleUpdateClick}>Update Post</button>
            </>
          )}

          {/* Render the response form */}
          {showResponseForm && !showUpdateForm && (
            <>
              <div className='postcontentCardInputfeild'>
                <Card>
                  <Card.Content>
                    <Card.Header>Comment:</Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <Form onSubmit={handleResponseFormSubmit}>
                      <Form.Input
                        placeholder="Comment"
                        type="text"
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                      <Form.Button color="orange">Submit</Form.Button>
                    </Form>
                  </Card.Content>
                </Card>
              </div>
            </>
          )}

          {/* Render the update form */}
          {!showResponseForm && showUpdateForm && (
            <div className='postcontentCardInputfeild'>
              <Card>
                <Card.Content>
                  <Card.Header>Updated Content:</Card.Header>
                </Card.Content>
                <Card.Content>
                  <Form onSubmit={handleUpdateFormSubmit}>
                    <Form.TextArea
                      id="updatedContent"
                      name="updatedContent"
                      value={updatedContent}
                      onChange={(e) => setUpdatedContent(e.target.value)}
                      required
                    />
                    <Form.Button color="orange">Submit</Form.Button>
                  </Form>
                </Card.Content>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PostContent;
