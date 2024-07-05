import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FormControl, FormLabel, Select, Input, Button, Box, VStack, Container, Text, InputGroup, InputRightElement, IconButton, Spinner } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState('');
  const [preferredCuisine, setPreferredCuisine] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function registerUser(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/auth/register/user', {
        username,
        email,
        password,
        age: Number(age), // Convert age to number
        preferredCuisine,
      });
      alert('Registration successful!');
      navigate('/register/verify');
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6" mt="4">
        <VStack spacing="4">
          <form onSubmit={registerUser}>
            <VStack spacing="4">
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <FormControl id="age" isRequired>
                <FormLabel>Age</FormLabel>
                <Input
                  type="number"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </FormControl>
              <FormControl id="preferred-cuisine" isRequired>
                <FormLabel>Preferred Cuisine</FormLabel>
                <Select
                  placeholder="Select preferred cuisine"
                  value={preferredCuisine}
                  onChange={(e) => setPreferredCuisine(e.target.value)}
                  focusBorderColor="purple.500"
                >
                  <option value="VEGETARIAN">VEGETARIAN</option>
                  <option value="NON_VEGETARIAN">NON VEGETARIAN</option>
                </Select>
              </FormControl>
              <Button type="submit" colorScheme="purple" isDisabled={loading}>
                {loading ? <Spinner size="sm" /> : 'Register'}
              </Button>
            </VStack>
          </form>
          <Text mt="4">
            Already have an account? <Link to="/login/user" style={{ color: 'purple' }}>Login here</Link>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default Register;
