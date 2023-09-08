import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './user.css';
import { useNavigate } from 'react-router-dom';

function EditUser() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userId } = useParams();
  const navigate = useNavigate();
  

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
        
        alert('Profile deleted successfully');
        localStorage.removeItem('authToken');
        localStorage.removeItem('user_id');
        navigate('/');
        
      } else {
        
        alert('Failed to delete the Profile');
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      
      alert('An error occurred while deleting the profile');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:3000/api/v1/users/${userId}`, {
        user: {
          username,
          email,
          password,
        },
      });

      if (response.status === 200) {
        setUsername('');
        setEmail('');
        setPassword('');
        navigate(`/ShowUser/${userId}`);
        alert('Profile Updated successfully');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="shared-background">
      <div className="glassmorphic-box">
        <h1 className="mt-4">{username}</h1>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Username
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
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
