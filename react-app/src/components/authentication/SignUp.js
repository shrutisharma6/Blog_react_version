import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  FormLabel,
  FormControl,
  Heading,
  Flex,
} from '@chakra-ui/react'; // Import Chakra UI components
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './auth.css'; // Import your CSS file

function SignUp({ onSignUp }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/users', {
        user: {
          username,
          email,
          password,
        },
      });

      if (response.status === 201) {
        onSignUp();
        setUsername('');
        setEmail('');
        setPassword('');
        console.log('User signed up successfully');
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="login-background">
      <Flex
        className="glassmorphic-box"
        p={6}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="auto"
      >
        <Heading as="h1" size="xl" mb={6}>
          Sign Up

        </Heading>
        <form onSubmit={handleSignUp}>
          <FormControl mb={6}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              required
            /><br/> <br/>
          </FormControl>
          <FormControl mb={6}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            /><br/> <br/>
          </FormControl>
          <FormControl mb={6}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
            <br/> <br/>
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            className="login-button"
          >
            Sign Up
          </Button>
          <br/> <br/>
        </form>
        {error && (
          <Box mt={4} color="red.500">
            {error}
          </Box>
        )}
      </Flex>
    </div>
  );
}

export default SignUp;
