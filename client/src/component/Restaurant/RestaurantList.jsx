import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  Input,
  Image,
  VStack,
  Flex,
  useColorModeValue,
  Badge,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { SearchIcon, StarIcon } from "@chakra-ui/icons";
import { FaUtensils } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          "http://localhost:8080/restaurants/getRestaurant",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRestaurants(response.data);
        setFilteredRestaurants(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch restaurants.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleBookNow = (restaurantId) => {
    navigate(`/booking/${restaurantId}/add`);
  };

  const handleSearch = () => {
    const filtered = restaurants.filter((restaurant) =>
      restaurant.restaurantName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.700");

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg={bgColor}>
        <Spinner size="xl" color="purple.500" thickness="4px" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg={bgColor}>
        <Text color="red.500" fontSize="xl" fontWeight="bold">
          {error}
        </Text>
      </Flex>
    );
  }

  return (
    <Box
      minH="100vh"
      bgSize="cover"
      bgPosition="center"
      bgAttachment="fixed"
    >
      <Container maxW="container.xl" py={12}>
        <MotionBox
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          bg={`${bgColor}CC`}
          borderRadius="xl"
          p={8}
          boxShadow="xl"
        >
          <Heading
            as="h1"
            size="2xl"
            textAlign="center"
            color="purple.500"
            mb={8}
            fontWeight="extrabold"
            textShadow="2px 2px 4px rgba(0,0,0,0.1)"
          >
            Discover Culinary Delights
          </Heading>
          <Flex w="100%" maxW="md" mb={8} mx="auto">
            <Input
              placeholder="Search Restaurants"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg={cardBgColor}
              borderRadius="full"
              pr="4.5rem"
              fontSize="lg"
            />
            <Button
              onClick={handleSearch}
              colorScheme="purple"
              position="absolute"
              right={0}
              borderLeftRadius={0}
              borderRightRadius="full"
              size="lg"
              px={6}
            >
              <SearchIcon />
            </Button>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6} w="100%">
            {filteredRestaurants.map((restaurant, index) => (
              <MotionBox
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Box
                  bg={cardBgColor}
                  p={6}
                  borderRadius="lg"
                  boxShadow="md"
                  transition="all 0.3s"
                  _hover={{ transform: "translateY(-5px)", boxShadow: "lg" }}
                  height="100%"
                  display="flex"
                  flexDirection="column"
                >
                  <Image
                    src={`https://source.unsplash.com/featured/400x300/?restaurant,food&${restaurant.id}`}
                    alt={restaurant.restaurantName}
                    borderRadius="md"
                    mb={4}
                    objectFit="cover"
                    h="200px"
                    w="100%"
                  />
                  <Heading as="h3" size="lg" mb={2} color="purple.500">
                    {restaurant.restaurantName}
                  </Heading>
                  <Text fontSize="sm" color="gray.500" mb={4} flex={1}>
                    {restaurant.restaurantAddress.street}, {restaurant.restaurantAddress.city}
                  </Text>
                  <Flex justify="space-between" align="center" mb={4}>
                    <Badge colorScheme="purple" fontSize="sm" p={2} borderRadius="full">
                      ID: {restaurant.id}
                    </Badge>
                    <HStack>
                      {Array.from({ length: 5 }, (_, i) => (
                        <StarIcon
                          key={i}
                          color={i < Math.round(restaurant.averageRating) ? "purple.500" : "gray.300"}
                        />
                      ))}
                    </HStack>
                  </Flex>
                  <Button
                    colorScheme="purple"
                    onClick={() => handleBookNow(restaurant.id)}
                    w="100%"
                    leftIcon={<Icon as={FaUtensils} />}
                    _hover={{ transform: "scale(1.05)" }}
                    transition="all 0.2s"
                  >
                    Book Now
                  </Button>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default RestaurantList;
