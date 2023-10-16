import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ActionCable from 'actioncable'
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
            setMessages(response.data.data);
        })
        axios.get(`http://localhost:3000/api/v1/users/${userId}`)
        .then(response => {
          setUserName(response.data.data.attributes.username);
        })
        
    }, [newMessage]);

      useEffect(() => {    
        if (user_id) {
         
          const cable = ActionCable.createConsumer('ws://localhost:3000/cable')
  
         const subscription = cable.subscriptions.create
          (
            {
              channel: 'MessagesChannel',
              user_id: user_id,
              recipient_id: userId,
            },
            {
              received: (message) => {
                console.log("message", message);
                // setMessages([...messages, message])
                setNewMessage(message);
              }
            }
          )
      
        }
      },)
  

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
                  message.attributes.sender_id == userId ? 'received' : 'sent'
                }`}
              >
                {console.log(message)}
                <div className="message-content">
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
