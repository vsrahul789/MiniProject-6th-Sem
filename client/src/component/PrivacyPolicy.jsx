// src/components/PrivacyPolicy.jsx
import { Box, Container, Heading, Text } from '@chakra-ui/react';

const PrivacyPolicy = () => {
  return (
    <Container maxW="container.lg" mt={8}>
      <Box bg="white" p={6} rounded="md" shadow="md">
        <Heading as="h1" size="xl" mb={4}>Privacy Policy</Heading>
        <Text>
          This is where your Privacy Policy content will go.
        </Text>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;


