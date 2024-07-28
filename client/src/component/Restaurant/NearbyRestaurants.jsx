import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Heading,
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
  Input,
  InputGroup,
  InputLeftElement,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Switch,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaUtensils, FaSearch } from "react-icons/fa";

const MotionBox = motion(Box);

const NearbyRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [radius, setRadius] = useState(15);
  const [showSlider, setShowSlider] = useState(true); // New state for showing/hiding the slider
  const toast = useToast();

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const headingColor = useColorModeValue("purple.600", "purple.300");

  const fetchNearbyRestaurants = (latitude, longitude, radius) => {
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setLoading(true);
    axios
      .get("http://localhost:8080/restaurants/nearby", {
        params: { latitude, longitude, radius },
      })
      .then((response) => {
        setRestaurants(response.data);
        setFilteredRestaurants(response.data);
        setError(null);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Error fetching nearby restaurants or Please Login to view!",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchNearbyRestaurants(latitude, longitude, radius);
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
  }, [toast, radius]);

  useEffect(() => {
    const filtered = restaurants.filter((restaurant) =>
      restaurant.restaurantName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  }, [searchTerm, restaurants]);

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-r, purple.600, pink.400, blue.300)"
      py={16}
      px={4}
    >
      <Container maxW="1200px">
        <MotionBox
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          bg={useColorModeValue("white", "gray.800")}
          p={8}
          borderRadius="xl"
          boxShadow="lg"
        >
          <Heading
            as="h1"
            mb={8}
            textAlign="center"
            color={headingColor}
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="extrabold"
          >
            Discover Nearby Culinary Delights
          </Heading>
          <InputGroup mb={8}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg={cardBg}
              borderRadius="full"
            />
          </InputGroup>
          <Flex align="center" mb={8}>
            <Text mb={2} color={headingColor} fontWeight="bold">
              Show Radius Slider
            </Text>
            <Switch
              ml={4}
              isChecked={showSlider}
              onChange={() => setShowSlider(!showSlider)}
            />
          </Flex>
          {showSlider && (
            <Box mb={8}>
              <Text mb={2} color={headingColor} fontWeight="bold">
                Adjust Search Radius: {radius} km
              </Text>
              <Slider
                defaultValue={radius}
                min={1}
                max={50}
                step={1}
                onChange={(value) => setRadius(value)}
              >
                <SliderTrack bg="purple.100">
                  <SliderFilledTrack bg="purple.500" />
                </SliderTrack>
                <SliderThumb boxSize={6}>
                  <Box color="purple.500" as={FaMapMarkerAlt} />
                </SliderThumb>
                <SliderMark value={radius} mt={2} ml={-2} fontSize="sm">
                  {radius}
                </SliderMark>
              </Slider>
            </Box>
          )}
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
              {filteredRestaurants.map((restaurant, index) => (
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
                        color={headingColor}
                        fontWeight="bold"
                      >
                        {restaurant.restaurantName}
                      </Heading>
                      <Text color={textColor} mb={4} flex={1}>
                        <Icon as={FaMapMarkerAlt} mr={2} color="purple.500" />
                        {restaurant.restaurantAddress.street}, {restaurant.restaurantAddress.city}
                      </Text>
                      <Flex justify="space-between" align="center">
                        <Badge colorScheme="purple" fontSize="sm" p={2} borderRadius="full">
                          <Icon as={FaUtensils} mr={2} />
                          Book Now
                        </Badge>
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

export default NearbyRestaurants;
