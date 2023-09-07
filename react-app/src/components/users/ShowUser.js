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
  // const [canEditUser, setEditUser]= useState(false);
  const canEditUser = user_id == userId;

  useEffect(() => {
    axios.get(`http://localhost:3000/api/v1/users/${userId}`)
      .then(response => {
        console.log('API Response:', response.data);
        setUser(response.data);

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
  }, [userId]);

  if (!user) {
    return <p>Loading...</p>;
  }
  

  return (
    <Box className='shared-background'>
      <Container className='glassmorphic-box'>
        <Text as="h1">{user.data.attributes.username}'s Profile</Text>
        <Text>Email: {user.data.attributes.email}</Text>
        <Text as="h3">Articles By {user.data.attributes.username}</Text>
        {canEditUser && (
          <Button variant="solid" as={Link} to={`/EditUser/${userId}`} className='shared-button'>
          Edit Profile
        </Button>
        )}

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
