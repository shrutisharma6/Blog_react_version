import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './article.css';
import { FormGroup } from 'react-bootstrap';
import { Select } from '@chakra-ui/react';
import {  useNavigate} from 'react-router-dom';



function CreateArticle() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [articleId, setArticleId]= useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const API_URL = 'http://localhost:3000/api/v1/categories';
    axios
      .get(API_URL)
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const selectedCategories = selectedOptions.map((option) => option.value);
    setSelectedCategories(selectedCategories);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const authToken = localStorage.getItem('authToken');
    const user_id = localStorage.getItem('user_id');
    try {
      const response = await axios.post('http://localhost:3000/api/v1/articles', {
        article: {
          title,
          description,
          category_ids: selectedCategories,
        },
        headers: {
          Authorization: `Bearer ${authToken}`, 
          'Content-Type': 'application/json',
        },
        user: {
          user_id,
        },
        
      }
      );

      if (response.status === 200) {
        setTitle('');
        setDescription('');
        navigate('/Articles');
        alert('Article created successfully');
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
                rows={6} 
                placeholder="Enter article description here..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={4}>
              Choose Categories
            </Form.Label>
            <Col >
            <Select
              multiple
              value={selectedCategories}
              onChange={handleCategoryChange}
            >
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.attributes.name}
                  </option>
                ))}
            </Select>
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
