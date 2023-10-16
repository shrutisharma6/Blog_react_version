import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Table, Tbody, Tr, Td } from "@chakra-ui/react"; 
import { Button ,Alert} from 'react-bootstrap'; 
import { Container, Flex } from '@chakra-ui/react';


function Friends(){
    const { userId } = useParams();
    const [friends, setFriends] = useState([]);
    const user_id = localStorage.getItem('user_id');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/users/${userId}/friends`)
        .then(response => {
            console.log(response.data.data);
            setFriends(response.data.data);
        })
    }, []);

    const handleDelete = async (friendId) => {
      try {
        const response= axios.delete(`http://localhost:3000/api/v1/users/${userId}/friendships/${friendId}`);
        if (response.status === 204) {
          setSuccessMessage('Friendship deleted successfully');
        } 
      }
      catch(error){
        console.log('Error', error);
        setError('Failed to delete unfriend');
      }
    }
    return(
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
        {successMessage && (
          <Alert variant="success">
            {successMessage}
          </Alert>
          ) }
        {error && 
          <Alert variant="danger" dismissible>
            {error}
          </Alert>
        }
        
        <h1>Friends</h1>
        <Table
          variant="striped">
          <Tbody>
            {friends &&
              friends.map((friend) => (
                <Tr key={friend.id}>
                  <Td>{friend.attributes.username}</Td>
                  <Td>{friend.attributes.email}</Td>
                  <Td>
                    <Link to={`/ShowUser/${friend.id}`}>
                      <Button variant="success" size="sm" className="btn">
                        Show Profile
                      </Button>
                    </Link>
                  </Td>
                  <Td>
                    <Link to={`/ShowUser/${friend.id}`}>
                      <Button variant="danger" size="sm" className="btn" onClick={() => handleDelete(friend.id)}>
                        Unfriend
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
export default Friends;
