import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  VStack,
  Container,
  useToast,
  Link as ChakraLink,
  Text,
  Spinner,
  SimpleGrid,
  Badge,
  Image,
  Flex,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaUtensils } from "react-icons/fa";

const MotionBox = motion(Box);

const NearbyRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const radius = 8;

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.700");
  useEffect(() => {
    const fetchNearbyRestaurants = () => {
      const token = localStorage.getItem("jwtToken");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      if (navigator.geolocation) {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            axios
              .get("http://localhost:8080/restaurants/nearby", {
                params: {
                  latitude,
                  longitude,
                  radius, // Radius in kilometers
                },
              })
              .then((response) => {
                setRestaurants(response.data);
                setError(null);
              })
              .catch((error) => {
                toast({
                  title: "Error",
                  description: "Error fetching nearby restaurants",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
                setError(error.message);
              })
              .finally(() => {
                setLoading(false);
              });
          },
          (error) => {
            toast({
              title: "Error",
              description: error.message,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
            setError(error.message);
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };
 fetchNearbyRestaurants();
  }, [toast, radius]);

  return (
    <Box
      minH="100vh"
      bgImage="url('https://images.pexels.com/photos/618491/pexels-photo-618491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
      bgSize="cover"
      bgPosition="center"
      bgAttachment="fixed"
      display="flex"
      justifyContent="center"
      alignItems="center"
      py={16}
    >
      <Container maxW="1200px" zIndex={1}>
        <MotionBox
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          bg={`${bgColor}CC`}
          borderRadius="xl"
          p={8}
          boxShadow="2xl"
        >
          <Heading
            as="h1"
            mb={8}
            textAlign="center"
            color="purple.500"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="extrabold"
            textShadow="2px 2px 4px rgba(0,0,0,0.1)"
          >
            Discover Nearby Culinary Delights
          </Heading>
          {loading ? (
            <Flex justify="center" align="center" minH="300px">
              <Spinner size="xl" thickness="4px" color="purple.500" />
            </Flex>
          ) : error ? (
            <Text color="red.500" textAlign="center" fontSize="xl">
              {error}
            </Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {restaurants.map((restaurant, index) => (
                <MotionBox
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ChakraLink
                    as={Link}
                    to={`/booking/${restaurant.id}/add`}
                    _hover={{ textDecoration: "none" }}
                  >
                    <MotionBox
                      bg={cardBg}
                      p={6}
                      borderRadius="xl"
                      boxShadow="lg"
                      transition="all 0.3s"
                      _hover={{ transform: "translateY(-5px)", boxShadow: "2xl" }}
                      height="100%"
                      display="flex"
                      flexDirection="column"
                    >
                      <Image
                        src={`https://source.unsplash.com/featured/400x300/?restaurant,food&${restaurant.id}`}
                        alt={restaurant.restaurantName}
                        borderRadius="lg"
                        objectFit="cover"
                        mb={4}
                        height="200px"
                      />
                      <Heading
                        as="h3"
                        size="lg"
                        mb={2}
                        color="purple.500"
                        fontWeight="bold"
                      >
                        {restaurant.restaurantName}
                      </Heading>
                      <Text color="gray.600" mb={4} flex={1}>
                        <Icon as={FaMapMarkerAlt} mr={2} color="purple.500" />
                        {restaurant.restaurantAddress.street}, {restaurant.restaurantAddress.city}
                      </Text>
                      <Flex justify="space-between" align="center">
                        <Badge colorScheme="purple" fontSize="sm" p={2} borderRadius="full">
                          <Icon as={FaUtensils} mr={2} />
                          Book Now
                        </Badge>
                        <Text fontSize="sm" fontWeight="bold" color="purple.500">
                          ID: {restaurant.id}
                        </Text>
                      </Flex>
                    </MotionBox>
                  </ChakraLink>
                </MotionBox>
              ))}
            </SimpleGrid>
          )}
        </MotionBox>
      </Container>
    </Box>
  );
};

export default NearbyRestaurants