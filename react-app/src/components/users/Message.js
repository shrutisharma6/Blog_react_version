import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
 
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {
    Box,
    Text,
    Container,
    Link as ChakraLink,
  } from '@chakra-ui/react';
  import './user.css'; 


function Message(){
    const { userId } = useParams();
    const user_id = localStorage.getItem('user_id');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage]= useState();
    const [content, setContent]= useState();
    const [userName, setUserName]= useState();
    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/users/${userId}/messages/${user_id}`)
        .then(response => {
            console.log(response.data);
            setMessages(response.data.data);
        })
        axios.get(`http://localhost:3000/api/v1/users/${userId}`)
        .then(response => {
          setUserName(response.data.data.attributes.username);
        })
        
    }, []);

    const handleSend = async (e) => {
        e.preventDefault();
        
        const authToken = localStorage.getItem('authToken');
        const user_id = localStorage.getItem('user_id');
        try {
          const response = await axios.post(`http://localhost:3000/api/v1/users/${userId}/messages`, {
            message: {
              content,
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
        } catch (error) {
          console.log('Failed to send message');
        }
      };
    
    return(
        <Box className='shared-background'>
        <Container className='glassmorphic-box'>
        <Text as="h1">{userName}</Text>

<div className='chat-box'>
          {messages &&
            messages.map((message) => (
              <div
                key={message.id}
                className={`message ${
                  message.attributes.sender.id == userId ? 'received' : 'sent'
                }`}
              >
                <div className="message-content">
                    {/* <strong>{message.attributes.sender.username}:</strong> */}
                    {message.attributes.content}
                </div>
              </div>
            ))}
        </div>
        
        <Form>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">

            <Col sm={12}>
              <Form.Control type="text" placeholder="Type your message..."value={content} onChange={(e) => setContent(e.target.value)}/>
              <Button type="submit" variant="primary" className="shared-button" onClick={handleSend}>
              Send
            </Button>
            </Col>
            
          </Form.Group>
          </Form>
     
        </Container>
      </Box>
    );
};
export default Message;
