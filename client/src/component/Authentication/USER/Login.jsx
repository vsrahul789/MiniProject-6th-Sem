import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container, Box, VStack, FormControl, FormLabel, Input, Button, Text,
  InputGroup, InputRightElement, IconButton, Heading, useColorModeValue,
  Flex
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const boxBgColor = useColorModeValue('white', 'gray.700');

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
      window.location.reload();
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('Login failed. Please try again.');
    }
  }

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center" bg={bgColor}>
      <Container maxW="md" py={12}>
        <Box
          bg={boxBgColor}
          boxShadow="2xl"
          rounded="lg"
          p={8}
          textAlign="center"
        >
          <VStack spacing={8}>
            <Flex
              w={20}
              h={20}
              align="center"
              justify="center"
              color="white"
              rounded="full"
              bg="purple.500"
              mb={1}
              fontSize="2xl"
              fontWeight="bold"
              fontFamily="'Advent Pro', sans-serif"
            >
              DE
            </Flex>
            <Heading fontSize="2xl">User Login</Heading>
            <form onSubmit={loginUser} style={{ width: '100%' }}>
              <VStack spacing={4}>
                <FormControl id="username" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    borderRadius="full"
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      borderRadius="full"
                    />
                    <InputRightElement width="3rem">
                      <IconButton
                        h="1.75rem"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        variant="ghost"
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="purple"
                  size="lg"
                  fontSize="md"
                  borderRadius="full"
                  width="full"
                >
                  Sign In
                </Button>
              </VStack>
            </form>
          </VStack>
          <Text mt={6}>
            Dont have an account?{' '}
            <Link to="/register/user" style={{ color: 'purple.500', fontWeight: 'bold' }}>
              Register here
            </Link>
          </Text>
        </Box>
      </Container>
    </Flex>
  );
};

export default Login;