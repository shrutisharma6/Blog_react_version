import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  FormLabel,
  FormControl,
  Heading,
  Flex, 
  Link,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './auth.css'; 

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/login', {
        user: {
          email,
          password,
        },
      });
      if (response.data.token) {
        console.log(response);
        const token = response.data.token;
        const user_id =response.data.user_id;
        localStorage.setItem('authToken', token); 
        localStorage.setItem('user_id', user_id); 
        navigate('/');
      } 
      else {
        setError('Invalid email or password',error);
      }
    } 
    catch (error) {
      setError('Invalid email or password',error);

    }

    
  };


  const navigateToForgotPassword = () => {
    navigate('/forgot-password'); 
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
          Log In
        </Heading>
        <form onSubmit={handleLogin}>
          <FormControl mb={6}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required 
            />
            <br/> <br/>
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
            {/* localhost:3000/users/password/new */}
          </FormControl>
          {/* <Link mt={4} to ="http://www.google.com">
          Forgot Password?
          </Link> */}
          <a href="http://localhost:3000/users/password/new">Forgot Password ?</a>
          <br/> 

          <Button type="submit" colorScheme="blue" className="login-button">
            Log In
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

export default Login;
