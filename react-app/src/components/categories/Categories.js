import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Tbody, Tr, Td } from "@chakra-ui/react"; 
import { Button } from 'react-bootstrap'; 
import { Box, Center, Container, Flex } from '@chakra-ui/react';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const user_id = localStorage.getItem('user_id');
  const [isAdmin ,setIsAdmin] = useState(false);
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
  
    useEffect(() => {
      
  
        if (user_id) {
          const API_URL = `http://localhost:3000/api/v1/users/${user_id}`;
          console.log('API_URL:', API_URL);
          axios
            .get(API_URL)
            .then((response) => {
              console.log(response);
              if (response.data && response.data.data.attributes && response.data.data.attributes.admin === true) {
                setIsAdmin(true);
              }
              
            })
          }
    }, [user_id]);
 
  

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
        <h1>Categories</h1>
        <p>
        {isAdmin ?(
        <Link to={'/CreateCategories'}>
                      <Button variant="success" size="lg" className="btn">
                        Create category
                      </Button>
                    </Link>)  :null}</p>
                    
        <Table
          variant="striped"
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
