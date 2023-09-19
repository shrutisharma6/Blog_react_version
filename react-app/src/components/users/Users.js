import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Tbody, Tr, Td } from "@chakra-ui/react"; 
import { Button } from 'react-bootstrap'; 
import { useColorMode } from '@chakra-ui/color-mode';
import { Container, Flex } from '@chakra-ui/react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const API_URL = 'http://localhost:3000/api/v1/users';
    axios
      .get(API_URL)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
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
        <h1>Bloggers</h1>
        <Table
          variant="striped"
          colorScheme={colorMode === 'dark' ? 'gray' : 'teal'} // Set the color scheme based on the color mode
        >
          <Tbody>
            {users &&
              users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.attributes.username}</Td>
                  <Td>{user.attributes.email}</Td>
                  <Td>
                    <Link to={`/ShowUser/${user.id}`}>
                      <Button variant="success" size="sm" className="btn">
                        Show Profile
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

export default Users;
