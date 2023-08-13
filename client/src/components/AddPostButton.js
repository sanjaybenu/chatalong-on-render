import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../utils/mutations';
import '../Style/AddPostButton.css';
import { Card, Form, Icon } from 'semantic-ui-react';

const AddPostButton = ({ topic, refetchPost }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    //username: '',
    heading: '',
    message: '',
  });
  const navigate = useNavigate();
  const [addPost] = useMutation(ADD_POST);

  const handleAddPostClick = () => {
    setShowForm(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (
        //formData.username.trim() === '' ||
        formData.heading.trim() === '' ||
        formData.message.trim() === ''
      ) {
        alert('Please fill all the fields.');
        return;
      }
      await addPost({
        variables: {
          heading: formData.heading,
          message: formData.message,
          topic,
        },
      });
      refetchPost()
      setShowForm(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      {showForm ? (
        <div className="AddPostContainer">
          <Card className="AddPostCard ">
            <Card.Content>
              <Card.Header>Post to {topic}.</Card.Header>
            </Card.Content>

            <Card.Content>
              <Form onSubmit={handleFormSubmit}>
                <Form.Input
                  fluid
                  label="Title:"
                  placeholder="Title"
                  className="input-field-addPost"
                  type="text"
                  id="heading"
                  name="heading"
                  value={formData.heading}
                  onChange={handleInputChange}
                  required
                />
                <Form.TextArea
                  fluid
                  label="Description:"
                  placeholder="Description"
                  className="input-field-addPost"
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />

                <Form.Button color="orange">Submit</Form.Button>
              </Form>
            </Card.Content>
          </Card>
        </div>
      ) : (
        <Icon
          onClick={handleAddPostClick}
          name="plus circle"
          size="big"
          color="orange"
          className="custom-icon"
        ></Icon>
      )}
    </>
  );
};

export default AddPostButton;

