import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './article.css';
import Badge from 'react-bootstrap/Badge';

const ShowArticle = () => {
  const [article, setArticle] = useState(null);
  const { articleId } = useParams();
  const [userName, setUserName] = useState(null);
  const [categoryName, setCategoryName] = useState([]);
  const [likes, setLikes] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/articles/${articleId}`)
      .then(response => {
        console.log('API Response:', response.data);
        setArticle(response.data);
        const userName = response.data.included[0].attributes.username;
        setUserName(userName);

        const categories = response.data.included
          .filter(item => item.type === 'category')
          .map(item => item.attributes.name);
        setCategoryName(categories);

        const likes = response.data.attributes.likes;
        setLikes(likes);
      })
      .catch(error => {
        console.error('Error fetching article:', error);
      });
  }, [articleId]);

  if (!article) {
    return <p>Loading...</p>;
  }

  const handleLike = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/articles/${articleId}/like`);
      setLikes(response.data.attributes.likes + 1);
    } catch (error) {
      console.error('Error liking article:', error);
    }
  };

  return (
    <div className="shared-background">
      <div className="glassmorphic-box">
        <h1 className='mt-4'>{article.data.attributes.title}</h1>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Title
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" disabled readOnly value={article.data.attributes.title} />
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
                placeholder="Enter article description here..."
                disabled
                readOnly
                value={article.data.attributes.description}
              />
            </Col>
          </Form.Group>
          <p>By: {userName}</p>
          <div className="badge-container">
  {categoryName.map((category, index) => (
    <Badge key={index} bg="secondary" className="custom-badge">
      {category}
    </Badge>
  ))}
</div>

          <div onClick={handleLike}>
            <p>Likes: {article.data.attributes.likes}</p>
            <Button type="submit" variant="success" className="shared-button">
              Like
            </Button>
          </div>
          <div>
            <Button  className="shared-button" as={Link} to={`/EditArticle/${articleId}`}>
              Edit Article
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ShowArticle;
