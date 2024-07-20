import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Box, VStack, FormControl, FormLabel, Input, Button, Text, InputGroup, InputRightElement, IconButton, Heading } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/login/user', {
        username,
        password,
      });
      const token = response.data.jwt;
      localStorage.setItem('jwtToken', token);
      alert('Login successful!');
      navigate('/'); // Redirect to the dashboard or any other page
    } catch (error) {
      console.error(error);
      alert('Login failed. Please try again.');
    }
  }

  return (
    <Container>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="10" mt={20}>
        <VStack spacing="5">
          <Heading as="h2" size="md">
            Log in to DineEase
          </Heading>
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
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <IconButton
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    />
                  </InputRightElement>
                </InputGroup>
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
