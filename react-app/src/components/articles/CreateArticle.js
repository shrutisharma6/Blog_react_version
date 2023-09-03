import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './article.css';

function CreateArticle({ onArticleCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/articles', {
        article: {
          title,
          description,
        },
      });

      if (response.status === 201) {
        setTitle('');
        setDescription('');
      }
    } catch (error) {
      setError('Failed to create article');
    }
  };

  return (
    <div className="shared-background">
      <div className="glassmorphic-box">
        <h1 className="mt-4">Create Article</h1>
        <Form >
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2} >
              Title
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label column sm={2} >
              Description
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="textarea"
                rows={6} // You can adjust the number of rows as needed
                placeholder="Enter article description here..." // Placeholder text
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group>
            <Button type="submit" variant="primary" className="shared-button" onClick={handleSubmit}>
              Create Article
            </Button>
          </Form.Group>
        </Form>
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
}

export default CreateArticle;
