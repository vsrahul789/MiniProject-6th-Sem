import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  Link,
  Image,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import Footer from './Footer';

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        bg="url('home_background.jpg')"
        bgSize="cover"
        bgPosition="center"
        height="100vh"
        position="relative"
      >
        <Box
          bg="rgba(0, 0, 0, 0.6)"
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <VStack spacing={4} textAlign="center" p={8} color="white">
            <Heading as="h1" size="2xl" fontFamily="'Advent Pro', sans-serif" letterSpacing="wider">
              The pure taste of
            </Heading>
            <Heading as="h1" size="4xl" fontFamily="'Aladin', cursive" color="#FF9933">
              India
            </Heading>
            <Text fontSize="xl" maxW="600px" lineHeight="1.6">
              DineEase, the ultimate app for effortless table reservations at your favorite restaurants,
              blending convenience with the vibrant flavors of India.
            </Text>
{/*             <Flex mt={4} flexWrap="wrap" justifyContent="center"> */}
{/*               <Button as={RouterLink} to="/login/user" colorScheme="purple" m={2}>Log In</Button> */}
{/*               <Button as={RouterLink} to="/restaurants/list" colorScheme="purple" m={2}>Restaurants</Button> */}
{/*               <Button as={RouterLink} to="/book-table" colorScheme="purple" m={2}>BOOK A TABLE</Button> */}
{/*             </Flex> */}
          </VStack>
        </Box>
      </Box>

      {/* Features Section */}
     <Box py={16} bg="linear-gradient(135deg, #AA076B 0%, #AA076B 50%, #61045F 100%)">
       <VStack spacing={12} maxW="1200px" mx="auto" px={4}>
         <Heading as="h2" size="2xl" textAlign="center" color="white">
           Discover the Flavors of India
         </Heading>

         <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={8}>
            <GridItem>
              <Box bg="white" borderRadius="lg" overflow="hidden" boxShadow="lg">
                <Image src="flaghome1.jpg" alt="Find Restaurants" objectFit="cover" h="200px" w="100%" />
                <Box p={6}>
                  <Heading as="h3" size="lg" mb={4}>Find Restaurants</Heading>
                  <Text mb={4}>Discover the best Indian restaurants in your area.</Text>
                  <Button as={RouterLink} to="/restaurants/list" colorScheme="purple">Explore Now</Button>
                </Box>
              </Box>
            </GridItem>

            <GridItem>
              <Box bg="white" borderRadius="lg" overflow="hidden" boxShadow="lg">
                <Image src="flaghome2.jpg" alt="Authentic Cuisine" objectFit="cover" h="200px" w="100%" />
                <Box p={6}>
                  <Heading as="h3" size="lg" mb={4}>Authentic Cuisine</Heading>
                  <Text mb={4}>Experience the rich flavors of traditional Indian dishes.</Text>
                  <Button as={RouterLink} to="/menu" colorScheme="purple">View Menu</Button>
                </Box>
              </Box>
            </GridItem>

            <GridItem>
              <Box bg="white" borderRadius="lg" overflow="hidden" boxShadow="lg">
                <Image src="flaghome3.jpg" alt="Special Offers" objectFit="cover" h="200px" w="100%" />
                <Box p={6}>
                  <Heading as="h3" size="lg" mb={4}>Special Offers</Heading>
                  <Text mb={4}>Get exclusive deals and discounts on your favorite meals.</Text>
                  <Button as={RouterLink} to="/offers" colorScheme="purple">See Offers</Button>
                </Box>
              </Box>
            </GridItem>
          </Grid>
        </VStack>
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;