import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Tbody, Tr, Td } from "@chakra-ui/react"; // Import Chakra UI components
import { Button } from 'react-bootstrap'; // Use Bootstrap components for consistency
import { useColorMode } from '@chakra-ui/color-mode'; // Import Chakra UI color mode hook
import { Box, Center, Container, Flex } from '@chakra-ui/react'; // Import Chakra UI components

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { colorMode } = useColorMode(); // Get the current color mode (light or dark)

  useEffect(() => {
    const API_URL = 'http://localhost:3000/api/v1/categories';
    axios
      .get(API_URL)
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
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
        <h1>Categories</h1>
        <Table
          variant="striped"
          colorScheme={colorMode === 'dark' ? 'gray' : 'teal'} // Set the color scheme based on the color mode
        >
          <Tbody>
            {categories &&
              categories.map((category) => (
                <Tr key={category.id}>
                  <Td>{category.attributes.name}</Td>
                  <Td>
                    <Link to={`/ShowCategory/${category.id}`}>
                      <Button variant="success" size="sm" className="btn">
                        Show
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

export default Categories;
