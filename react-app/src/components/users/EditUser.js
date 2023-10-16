import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './user.css';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function EditUser() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/users/${userId}`)
      .then((response) => {
        setUser(response.data);
        setUsername(response.data.data.attributes.username);
        setEmail(response.data.data.attributes.email);
        setPassword(response.data.data.attributes.password);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  }, [userId]);
  const handleDelete = async () => {
    const userConfirmed = window.confirm('Are you sure?');
    if (!userConfirmed) {
      return;
    }
    try {
      const response = await axios.delete(`http://localhost:3000/api/v1/users/${userId}`);
      if (response.status === 204) {
        setSuccessMessage('Profile deleted successfully');
        setTimeout(() => {
          navigate('/');
        }, 1000);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user_id');
      } else {
        
        alert('Failed to delete the Profile');
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
      setError('Failed to delete profile');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:3000/api/v1/users/${userId}`, {
        user: {
          username,
          password,
        },
      });

      if (response.status === 200) {
        setSuccessMessage('Profile Updated successfully');
        setTimeout(() => {
          navigate(`/ShowUser/${userId}`);
        }, 2000);
      }
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  return (
    <div className="shared-background">
      <div className="glassmorphic-box">
        <h1 className="mt-4">{username}</h1>
        {successMessage && (
          <Alert variant="success">
            {successMessage}
          </Alert>
          ) }
          {error && 
          <Alert variant="danger" dismissible>
            {error}
          </Alert>
          }
        <Form>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" disabled readOnly value={email}  />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Username
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Col>
          </Form.Group>
          

          <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="password"
                placeholder="Enter new password here..." 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group>
            <Button type="submit" variant="primary" className="shared-button" onClick={handleSubmit}>
              Update User
            </Button>
            <Button variant="danger" size="sm" className="shared-button" onClick={handleDelete} 
          >Delete</Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default EditUser;
