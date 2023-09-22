import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'; 
import {
    Container,
    Flex,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Link as ChakraLink,
  } from '@chakra-ui/react';
  import './user.css'; 

  const PendingRequest = () => {
    const {userId} =useParams();
    const [senders, setSenders] = useState([]);
    const authToken = localStorage.getItem('authToken');
        const user_id = localStorage.getItem('user_id');
    useEffect(() => {
        const API_URL = `http://localhost:3000/api/v1/users/${userId}/friend_requests/received`;
        axios
          .get(API_URL)
          .then((response) => {
            console.log(response.data);
            setSenders(response.data.data);
          })
          .catch((error) => {
            console.error('Error fetching users:', error);
          });
      }, []);

      const handleAccept = async (senderId) => {
        
        
          const response = await axios.post(`http://localhost:3000/api/v1/users/${senderId}/friendships`, {
            headers: {
              Authorization: `Bearer ${authToken}`, 
              'Content-Type': 'application/json',
            },
            user: {
              user_id,
            },
            
          }
          );
    
          
        
      };

    //   const handleDecline = async (senderId) => {
        
    //       const response = await axios.delete(`http://localhost:3000/api/v1/users/${senderId}/friend_requests/reject`, {
    //         headers: {
    //           Authorization: `Bearer ${authToken}`, 
    //           'Content-Type': 'application/json',
    //         },
    //         user: {
    //           user_id,
    //         },
            
    //       }
    //       );
    // };

      return (
        <Flex
      className="shared-background"
      direction="column"
      align="center"
      justify="flex-start"
      pt="20px"
      minH="100vh"
      width="100%"
      overflow="hidden"
    >
      <Container
        width="100%" 
        maxW="100%" 
        overflowX="auto"
      >
        <h1>Pending Requests</h1>
        <Table
          variant="striped"
        >
          <Tbody>
            {senders &&
              senders.map((sender) => (
                <Tr key={sender.id}>
                  <Td>{sender.attributes.username}</Td>
                  <Td>{sender.attributes.email}</Td>
                  <Td>
                    <Link to={`/ShowUser/${sender.id}`}>
                      <Button variant="info" size="sm" className="btn">
                        Show Profile
                      </Button>
                    </Link>
                  </Td>
                  <Td>
                    <Link to={`/ShowUser/${sender.id}`}>
                      <Button variant="success" size="sm" className="btn" onClick= {() =>handleAccept(sender.id)}>
                        Accept Request
                      </Button>
                    </Link>
                  </Td>
                  {/* <Td>
                    <Link to={`/ShowUser/${sender.id}`}>
                      <Button variant="danger" size="sm" className="btn" onClick={handleDecline(sender.id)}>
                        Decline Request
                      </Button>
                    </Link>
                  </Td> */}
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Container>
    </Flex>
      );
    };

  export default PendingRequest;