import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Box, VStack, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8080/auth/login', {
        username,
        password,
      });
      alert('Login successful!');
      navigate('/'); // Redirect to the dashboard or any other page
    } catch (error) {
      console.error(error);
      alert('Login failed. Please try again.');
    }
  }

  return (
    <Container>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6" mt="4">
        <VStack spacing="4">
          <form onSubmit={loginUser}>
            <VStack spacing="4">
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button type="submit" colorScheme="purple">
                Login
              </Button>
            </VStack>
          </form>
          <Text mt="4">
            Don&apos;t have an account? <Link to="/register/user" style={{ color: 'purple' }}>Register here</Link>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default Login;
