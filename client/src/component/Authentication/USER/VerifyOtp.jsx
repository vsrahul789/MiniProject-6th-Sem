import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, VStack, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

const OTPVerification = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  async function verify(event) {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8080/auth/verify', {
        email,
        otp,
      });
      alert('Verification successful!');
      navigate('/'); // Redirect to the dashboard or any other page
    } catch (error) {
      console.error(error);
      alert('Verification failed. Please try again.');
    }
  }

  return (
    <Container>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6" mt="4">
        <VStack spacing="4">
          <form onSubmit={verify}>
            <VStack spacing="4">
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="otp" isRequired>
                <FormLabel>OTP</FormLabel>
                <Input
                  type="text"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </FormControl>
              <Button type="submit" colorScheme="purple">
                Verify
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Container>
  );
};

export default OTPVerification;
