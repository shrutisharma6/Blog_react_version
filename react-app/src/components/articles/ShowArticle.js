import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  const [likes, setLikes] = useState(0);
  const user_id = localStorage.getItem('user_id');
  const authToken = localStorage.getItem('authToken');
  const [canEditArticle, setEditArticle]= useState(false);
  const [body, setBody]=useState();
  const [comments,setComments]= useState([]);
  const [commentUser, setCommentUser] = useState([]);
  const [commentUserName, setCommentUserName] = useState([]);
  const [canComment, setCanComment]= useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/articles/${articleId}`)
      .then(response => {
        console.log('API Response:', response.data);
        setArticle(response.data);
        const userName = response.data.included[0].attributes.username;
        setUserName(userName);

        const articleUser=response.data.data.relationships.user.data.id;
        

        if (articleUser && user_id && articleUser.toString() === user_id.toString()) {
          setEditArticle(true);
        }

        if(authToken){
          setCanComment(true);
        }
        const comments = response.data.included
        .filter(item => item.type === 'comment')
        .map(item => item.attributes.body);
        setComments(comments);
        console.log(comments);
        const commentUser = response.data.included
          .filter(item => item.type === 'comment')
          .map(item => item.relationships.user.data.id);
          setCommentUser(commentUser);

         

          const userPromises = commentUser.map(user => {
            return fetch(`http://localhost:3000/api/v1/users/${user}`)
              .then(response => response.json())
              .then(data => {
                console.log('User data:', data); 
                if (data && data.data.attributes && data.data.attributes.username) {
                  return data.data.attributes.username;
                } else {
                  throw new Error('Username not found in API response');
                }
              })
              .catch(error => {
                console.error('Error fetching user data:', error);
                return ''; 
              });
          });
          Promise.all(userPromises)
          .then(commentUserNames => {
            setCommentUserName(commentUserNames);
            setComments(comments);
            console.log(comments," user promises");
          });

        const categories = response.data.included
          .filter(item => item.type === 'category')
          .map(item => item.attributes.name);
        

        setCategoryName(categories);
      })
      axios.get(`http://localhost:3000/api/v1/articles/${articleId}/show_likes`)
        .then(response => {
          setLikes(response.data.likes_count);
        })
      .catch(error => {
        console.error('Error fetching article:', error);
      });
  }, [articleId]);

  const handleLikeClick = async () => {
    
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/articles/${articleId}/create_like`,  {
        headers: {
          Authorization: `Bearer ${authToken}`, 
          'Content-Type': 'application/json',
        },
        user: {
          user_id,
        },
      });
  
      if (response.status === 200) {
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error liking the article:', error);
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(authToken ==null){
      alert('You must log in to make a comment');
      navigate('/Login');
    }

    try {
      const response = await axios.post(`http://localhost:3000/api/v1/articles/${articleId}/comment`, {
        comment: {
          body,
        },
        headers: {
          Authorization: `Bearer ${authToken}`, 
          'Content-Type': 'application/json',
        },
        user: {
          user_id,
        },
      });

      if (response.status === 200) {
        alert('Comment added successfully');
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };
  if (!article) {
    return <p>Loading...</p>;
  }


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
          <div>
          <div>
             <Button type="submit" variant="success" className="shared-button" onClick={handleLikeClick}>Like</Button>
          </div>
          <p>Likes: {likes}</p>
          {canEditArticle && (
            <Button  className="shared-button" as={Link} to={`/EditArticle/${articleId}`}>
              Edit Article
            </Button>
            )}
          </div>
          {canComment && 
          <>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Write a Comment
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text"value={body} onChange={(e) => setBody(e.target.value)} />
            </Col>
          </Form.Group>
          <Form.Group>
            <Button type="submit" variant="primary" className="shared-button" onClick={handleSubmit}>
              Add Comment
            </Button>
          </Form.Group>
          </>}
          <br/>
           <h5>Comments</h5>
               <table>
               {comments.map((comment, index) => (
               <tr key={index}>
                <td>{commentUserName[index]}</td>
                <td>{comment}</td>
               </tr>
               ))}
               </table> 
        </Form>
      </div>
    </div>
  );
};

export default ShowArticle;
