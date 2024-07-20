import { Box, Heading, Text, Button, VStack, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="gray.50"
      p={4}
    >
      <VStack spacing={8} maxWidth="600px" textAlign="center">
        <Icon as={FaExclamationTriangle} w={20} h={20} color="purple.500" />
        <Heading as="h1" size="4xl" color="purple.600">
          404
        </Heading>
        <VStack spacing={4}>
          <Heading as="h2" size="xl" color="gray.700">
            Page Not Found
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Oops! The page you are looking for seems to have vanished into thin air.
          </Text>
        </VStack>
        <Button
          as={Link}
          to="/"
          colorScheme="purple"
          size="lg"
          fontWeight="bold"
          px={8}
          _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
          transition="all 0.2s"
        >
          Return to Home
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFound;