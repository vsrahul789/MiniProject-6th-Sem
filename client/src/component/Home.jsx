import React, { useState, useEffect } from 'react';
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
  Container,
  Fade,
} from '@chakra-ui/react';
import Footer from './Footer';


const dishes = [
  {
    name: "Mysore Pak",
    description: "Mysore Pak is a traditional Karnataka sweet made from a rich blend of gram flour, ghee, and sugar making it a festive favorite.",
    image: "https://www.thankufoods.com/cdn/shop/products/JaggeryMysorepak-Resize.jpg?v=1671632842&width=2048"
  },
  {
    name: "Rogan Josh",
    description: "Rogan Josh is a signature dish from Kashmir. It is a fragrant lamb curry with flavors of browned onions, yogurt, garlic, ginger, and aromatic spices.",
    image: "https://www.whiskaffair.com/wp-content/uploads/2019/02/Mutton-Rogan-Josh-2-3.jpg"
  },
  {
    name: "Bebinca",
    description: "Bebinca is a traditional Goan dessert, a rich egg-based multi-layered sweet dish made with coconut milk, sugar, and ghee.",
    image: "https://ychef.files.bbci.co.uk/1280x720/p0gjfcls.jpg"
  },
  {
    name: "Litti Chokha",
    description: "Litti Chokha is a traditional dish from Bihar. Litti is made from whole wheat flour stuffed with roasted gram flour, while Chokha is a mix of mashed eggplant, tomatoes, and potatoes.",
    image: "https://www.secondrecipe.com/wp-content/uploads/2019/11/litti-chokha-1.jpg"
  },
  {
    name: "Sarson ka Saag and Makki di Roti",
    description: "This is a famous Punjabi dish made from mustard greens and served with maize flour flatbreads.",
    image: "https://c.ndtvimg.com/2022-07/g2rnr1u_saag_120x90_08_July_22.png"
  },
  // Add more dishes from different states here
];

// Function to get a dish based on index
const getDishByIndex = (index) => dishes[index % dishes.length];

const Home = () => {
  const [currentDish, setCurrentDish] = useState(getDishByIndex(0));
  const [dishIndex, setDishIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDishIndex(prevIndex => {
        const newIndex = prevIndex + 1;
        setCurrentDish(getDishByIndex(newIndex));
        return newIndex;
      });
    }, 10000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

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
                  <Button as={RouterLink} to="/restaurants/nearby" colorScheme="purple">View Menu</Button>
                </Box>
              </Box>
            </GridItem>

            <GridItem>
              <Box bg="white" borderRadius="lg" overflow="hidden" boxShadow="lg">
                <Image src={currentDish.image} alt={currentDish.name} objectFit="cover" h="200px" w="100%" />
                <Box p={6}>
                  <Heading as="h3" size="lg" mb={4}>Dishes of India</Heading>
                  <Text mb={6}><b>{currentDish.name}</b>: {currentDish.description}</Text>
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
