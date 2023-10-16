import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './article.css';
import { Link } from 'react-router-dom';
import { Table, Tbody, Tr, Td, Thead } from "@chakra-ui/react"; 
import { Button } from 'react-bootstrap'; 
import { Box, Center, Container, Flex, Th } from '@chakra-ui/react'; 
const Articles = () => {
  const [articles, setArticles] = useState([]);
  const user_id = localStorage.getItem('user_id');
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const API_URL = 'http://localhost:3000/api/v1/articles';
    axios
      .get(API_URL,
      {
      params: {
        headers: {
          Authorization: `Bearer ${authToken}`, 
          'Content-Type': 'application/json',
        },
        user_id: user_id,
      }})
      .then((response) => {
        setArticles(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching articles:', error);
      });
  }, []);

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
        <h1>Articles</h1>
        <Table
          variant="striped"
        >
          <Thead>
            <Th>Title</Th>
            <Th>Description</Th>
            
            <Th >Show</Th>
            
          </Thead>
          <Tbody>
            {articles &&
              articles.map((article) => (
                <Tr key={article.id}>
                  <Td>{article.attributes.title}</Td>
                  <Td>{article.attributes.description}</Td>
                  
                  <Td>
                    <Link to={`/ShowArticle/${article.id}`}>
                      <Button variant="success" size="sm" className="btn">
                        Show
                      </Button>
                    </Link>
                  </Td>
                  <Td>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Container>
    </Flex>
  );
};

export default Articles;
