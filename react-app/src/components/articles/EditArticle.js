import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './article.css';
import { useNavigate } from 'react-router-dom';

function EditArticle() {
  const [article, setArticle] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { articleId } = useParams();
  const navigate = useNavigate();

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
  const handleDelete = async () => {
    const userConfirmed = window.confirm('Are you sure?');
    if (!userConfirmed) {
      return;
    }
    try {
      const response = await axios.delete(`http://localhost:3000/api/v1/articles/${articleId}`);
      if (response.status === 204) {
        
        alert('Article deleted successfully');
        navigate('/');
        
      } else {
        
        alert('Failed to delete the article');
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      
      alert('An error occurred while deleting the article');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:3000/api/v1/articles/${articleId}`, {
        article: {
          title,
          description,
        },
      });

      if (response.status === 200) {
        setTitle('');
        setDescription('');
        navigate('/Articles');
        alert('Article updated successfully');
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
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group>
            <Button type="submit" variant="primary" className="shared-button" onClick={handleSubmit}>
              Update Article
            </Button>
            <Button variant="danger" size="sm" className="shared-button" onClick={handleDelete} 
          >Delete</Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default EditArticle;
