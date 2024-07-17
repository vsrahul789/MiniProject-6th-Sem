import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import axios from 'axios';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const AdminRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const registerAdmin = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8080/auth/register/admin', {
        username,
        email,
        password,
        age,
      });
      alert('Admin registration successful!');
    } catch (error) {
      console.error(error);
      alert('Admin registration failed. Please try again.');
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6" mt="20" maxWidth="700px" mx="auto">
      <Heading as="h1" mb={6} textAlign="center">
        Admin Registration
      </Heading>
      <form onSubmit={registerAdmin}>
        <VStack spacing={4}>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              focusBorderColor="purple.500"
              aria-label="Username"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              focusBorderColor="purple.500"
              aria-label="Email"
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
                aria-label="Password"
              />
              <InputRightElement>
                <IconButton
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl id="age" isRequired>
            <FormLabel>Age</FormLabel>
            <Input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              focusBorderColor="purple.500"
              aria-label="Age"
            />
          </FormControl>
          <Button type="submit" colorScheme="purple" width="full">
            Register as Admin
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AdminRegister;
