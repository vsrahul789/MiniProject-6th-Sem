import { useState } from 'react';
import {
  Box, Container, Heading, FormControl, FormLabel, Input, Textarea, Button, useToast, VStack
} from '@chakra-ui/react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API)
    toast({
      title: 'Message sent.',
      description: 'We will get back to you soon.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Container maxW="md" mt={8}>
      <Box bg="white" p={6} rounded="md" shadow="md">
        <Heading as="h2" size="lg" mb={4}>Contact Us</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
              />
            </FormControl>
            <FormControl id="message" isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message"
              />
            </FormControl>
            <Button type="submit" colorScheme="purple" width="full">
              Send Message
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default ContactForm;
