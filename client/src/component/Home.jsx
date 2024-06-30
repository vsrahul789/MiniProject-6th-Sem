import { Box, Heading, Text } from '@chakra-ui/react';

const Home = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Welcome to Our Restaurant Booking Website
      </Heading>
      <Text color={'gray.500'}>
        Please register or login to book a table at your favorite restaurant.
      </Text>
    </Box>
  );
};

export default Home;
