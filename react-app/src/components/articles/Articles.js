import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './article.css';
import { Link } from 'react-router-dom';
import { Table, Tbody, Tr, Td } from "@chakra-ui/react"; // Import Chakra UI components
import { Button } from 'react-bootstrap'; // Use Bootstrap components for consistency
import { useColorMode } from '@chakra-ui/color-mode'; // Import Chakra UI color mode hook
import { Box, Center, Container, Flex } from '@chakra-ui/react'; // Import Chakra UI components

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const { colorMode } = useColorMode(); // Get the current color mode (light or dark)

  useEffect(() => {
    const API_URL = 'http://localhost:3000/api/v1/articles';
    axios
      .get(API_URL)
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
        width="100%" // Set width to 100% for full-width table
        maxW="100%" // Limit container width to 100% of its parent
        overflowX="auto" // Enable horizontal scrolling if table exceeds container width
      >
        <h1>Articles</h1>
        <Table
          variant="striped"
          colorScheme={colorMode === 'dark' ? 'gray' : 'teal'} // Set the color scheme based on the color mode
        >
          <Tbody>
            {articles &&
              articles.map((article) => (
                <Tr key={article.id}>
                  <Td>{article.attributes.title}</Td>
                  <Td>{article.attributes.description}</Td>
                  <Td>{article.attributes.likes}</Td>
                  <Td>
                    <Link to={`/ShowArticle/${article.id}`}>
                      <Button variant="success" size="sm" className="btn">
                        Show
                      </Button>
                    </Link>
                  </Td>
                  <Td>
                    <Link to={`/EditArticle/${article.id}`}>
                      <Button variant="dark" size="sm" className="btn">
                        Edit
                      </Button>
                    </Link>
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
