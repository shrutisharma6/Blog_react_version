import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './article.css';

function EditArticle() {
  const [article, setArticle] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { articleId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/articles/${articleId}`)
      .then((response) => {
        setArticle(response.data);
        setTitle(response.data.data.attributes.title);
        setDescription(response.data.data.attributes.description);
      })
      .catch((error) => {
        console.error('Error fetching article:', error);
      });
  }, [articleId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:3000/api/v1/articles/${articleId}`, {
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
      console.error('Error updating article:', error);
    }
  };

  return (
    <div className="shared-background">
      <div className="glassmorphic-box">
        <h1 className="mt-4">{title}</h1>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Title
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label column sm={2}>
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
              Update Article
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default EditArticle;
