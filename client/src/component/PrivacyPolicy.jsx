import React from 'react';
import { Box, Container, Heading, Text, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <Container maxW="container.lg" mt={8}>
      <Box bg="white" p={6} rounded="md" shadow="md">
        <Heading as="h1" size="xl" mb={4}>Privacy Policy</Heading>
        <Text mb={4}>
          This is where your Privacy Policy content will go.
        </Text>
        <Button
          as={RouterLink}
          to="/AdminPage"
          colorScheme="yellow"
          size="lg"
        >
          AdminPage secret button
        </Button>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
