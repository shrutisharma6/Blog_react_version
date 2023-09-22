import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {
  Box,
  Text,
  Container,
  Button,
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

const ShowUser = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const [articles, setArticles] = useState([]);
  const user_id = localStorage.getItem('user_id');
  const authToken = localStorage.getItem('authToken');
  
  const canEditUser = user_id == userId;
  const [isAdmin ,setIsAdmin] = useState(false);
  const [canSendRequests, setCanSendRequests]=useState(true);
  const [canDeleteRequest, setCanDeleteRequests]=useState(false);
  const [isFriend, setIsFriend] = useState(false);



useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/users/${userId}`)
    .then(response => {
      console.log('API Response:', response.data);
      setUser(response.data);
      if (response.data && response.data.data.attributes && response.data.data.attributes.admin === true) {
        setIsAdmin(true);
      }

      const articles = response.data.included
        .filter(item => item.type === 'article')
        .map(article => ({
          id: article.id,
          title: article.attributes.title,
          description: article.attributes.description,
        }));
      setArticles(articles);
    })
    .catch(error => {
      console.error('Error fetching user:', error);
    });


    axios.get(`http://localhost:3000/api/v1/users/${user_id}/friends`)
    .then(response => {
      const friendsList = response.data.data.map(friend => friend.id);
      if (friendsList.includes(userId)) {
        setCanSendRequests(false);
        setIsFriend(true);
      }
    })
    .catch(error => {
      console.error('Error checking friend status:', error);
    });

    axios.get(`http://localhost:3000/api/v1/users/${user_id}/friend_requests/sent`)
      .then(response => {
        const sentList = response.data.data.map(sent => sent.id);
        if(sentList.includes(userId)){
          setCanSendRequests(false);
          setCanDeleteRequests(true);
        }
        })
      .catch(error => {
        console.error('Error checking friend request status:', error);
      });
 } ,[userId]);

    
 

  if (!user) {
    return <p>Loading...</p>;
  }

  const sendFriendRequest = () => {
    const user_id = localStorage.getItem('user_id');
    const friend_id= userId;
    axios
      .post(`http://localhost:3000/api/v1/users/${user_id}/friend_requests/send/${friend_id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`, 
          'Content-Type': 'application/json',
        },
        user: {
          user_id,
        },
      })
      .then((response) => {
        console.log('Friend request sent:', response.data);
        alert('Request sent');
       
      })
      .catch((error) => {
        console.error('Error sending friend request:', error);
        
      });
  };

  const handleDelete = async (e) => {
    const user_id = localStorage.getItem('user_id');
        e.preventDefault();
    const response = await axios.post(`http://localhost:3000/api/v1/users/${userId}/friend_requests/reject`, {
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

  

  return (
    <Box className='shared-background'>
      <Container className='glassmorphic-box'>
        <Text as="h1">{user.data.attributes.username}'s Profile</Text>
        <Text>Email: {user.data.attributes.email}</Text>
        <Text as="h3">Articles By {user.data.attributes.username}</Text>
        {canSendRequests && authToken &&
        <Button variant="solid" onClick={sendFriendRequest} className='shared-button'>
          Add Friend
        </Button>}
        {canDeleteRequest && authToken && 
        <Button variant="solid"  className='shared-button-delete' onClick={handleDelete}>
          Delete Request
        </Button>}

        {canEditUser && isAdmin && (
          <Button variant="solid" as={Link} to={`/EditUser/${userId}`} className='shared-button'>
          Edit Profile
        </Button>
        )}

        {isFriend && 
          <Button variant="solid" as={Link} to={`/ShowUSer/${userId}/Message`} className='shared-button'>
          Message
        </Button>
        }

        <Table variant="striped" colorScheme="blueAlpha" size="md" marginTop="20px">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Show</Th>
            </Tr>
          </Thead>
          <Tbody>
            {articles.map(article => (
              <Tr key={article.id}>
                <Td>{article.title}</Td>
                <Td>{article.description}</Td>
                <ChakraLink as={Link} to={`/ShowArticle/${article.id}`}>
                    <Button variant="solid" colorScheme="green" size="sm" className='shared-button'>
                      Show Article
                    </Button>
                  </ChakraLink>
              </Tr>
            ))}
          </Tbody>
        </Table>

        
      </Container>
    </Box>
  );
};

export default ShowUser;
