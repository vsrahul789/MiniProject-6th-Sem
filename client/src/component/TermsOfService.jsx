// src/components/TermsOfService.jsx
import { Box, Container, Heading, Text } from '@chakra-ui/react';

const TermsOfService = () => {
  return (
    <Container maxW="container.lg" mt={8}>
      <Box bg="white" p={6} rounded="md" shadow="md">
        <Heading as="h1" size="xl" mb={4}>Terms of Service</Heading>
        <Text>
          This is where your Terms of Service content will go.
        </Text>
      </Box>
    </Container>
  );
};

export default TermsOfService;