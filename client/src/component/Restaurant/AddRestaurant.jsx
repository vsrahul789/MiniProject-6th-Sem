import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  VStack,
  Heading,
  Text,
  Container,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const AddRestaurant = () => {
  const [restaurant, setRestaurant] = useState({
    restaurantName: '',
    maxTable: '',
    latitude: '',
    longitude: '',
    foodType: '',
    restaurantAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });
  const navigate = useNavigate();
  const toast = useToast();

// Code for checking weather the user is Admin or User
  const getInfo = async() => {
    const response = await axios.get("http://localhost:8080/auth/user/getInfo");
    const authorities = response.data.authorities;
    if (authorities === "USER") {
      toast({
        title: 'Not Authorized',
        description: 'You are not authorized to access this page.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      navigate("/");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    getInfo();
  });
// Code End
  useEffect(() => {
    if (restaurant.latitude && restaurant.longitude) {
      fetchAddress(restaurant.latitude, restaurant.longitude);
    }
  }, [restaurant.latitude, restaurant.longitude]);

  const fetchAddress = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const { address } = response.data;
      setRestaurant((prev) => ({
        ...prev,
        restaurantAddress: {
          street: address.road || '',
          city: address.city || address.town || address.village || '',
          state: address.state || '',
          zipCode: address.postcode || '',
        },
      }));
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('restaurantAddress.')) {
      const addressField = name.split('.')[1];
      setRestaurant({
        ...restaurant,
        restaurantAddress: { ...restaurant.restaurantAddress, [addressField]: value },
      });
    } else {
      setRestaurant({ ...restaurant, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting restaurant:', restaurant);
    try {
        const token = localStorage.getItem('jwtToken');
      const response = await axios.post('http://localhost:8080/restaurants/addRestaurants', [restaurant], {
        headers: {
            Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Response from backend:', response);
      toast({
        title: 'Restaurant added successfully.',
        description: `Restaurant ${response.data.restaurantName} has been added.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setRestaurant({
        restaurantName: '',
        maxTable: '',
        latitude: '',
        longitude: '',
        foodType: '',
        restaurantAddress: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
        },
      });
    } catch (error) {
      console.error('Error adding restaurant:', error);
      toast({
        title: 'An error occurred.',
        description: 'Unable to add restaurant.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setRestaurant((prev) => ({
          ...prev,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        }));
      },
    });

    return restaurant.latitude && restaurant.longitude ? (
      <Marker position={[restaurant.latitude, restaurant.longitude]} />
    ) : null;
  };
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.700");

  return (
    <Box
      minH="100vh"
      py={12}
    >
      <Container maxW="container.xl">
        <MotionBox
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          bg={`${cardBg}CC`}
          borderRadius="xl"
          p={8}
          boxShadow="2xl"
        >
          <Heading as="h1" size="xl" textAlign="center" mb={8} color="purple.500">
            Add New Restaurant
          </Heading>
          <form onSubmit={handleSubmit}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              <VStack spacing={4} align="stretch">
                <FormControl id="restaurantName" isRequired>
                  <FormLabel>Restaurant Name</FormLabel>
                  <Input
                    type="text"
                    name="restaurantName"
                    value={restaurant.restaurantName}
                    onChange={handleChange}
                    focusBorderColor="purple.500"
                  />
                </FormControl>
                <FormControl id="maxTable" isRequired>
                  <FormLabel>Max Table</FormLabel>
                  <Input
                    type="number"
                    name="maxTable"
                    value={restaurant.maxTable}
                    onChange={handleChange}
                    focusBorderColor="purple.500"
                  />
                </FormControl>
                <FormControl id="foodType" isRequired>
                  <FormLabel>Food Type</FormLabel>
                  <Select
                    placeholder="Select preferred cuisine"
                    name="foodType"
                    value={restaurant.foodType}
                    onChange={handleChange}
                    focusBorderColor="purple.500"
                  >
                    <option value="VEGETARIAN">VEGETARIAN</option>
                    <option value="NON_VEGETARIAN">NON VEGETARIAN</option>
                  </Select>
                </FormControl>
                <FormControl id="street" isRequired>
                  <FormLabel>Street</FormLabel>
                  <Input
                    type="text"
                    name="restaurantAddress.street"
                    value={restaurant.restaurantAddress.street}
                    onChange={handleChange}
                    focusBorderColor="purple.500"
                  />
                </FormControl>
                <FormControl id="city" isRequired>
                  <FormLabel>City</FormLabel>
                  <Input
                    type="text"
                    name="restaurantAddress.city"
                    value={restaurant.restaurantAddress.city}
                    onChange={handleChange}
                    focusBorderColor="purple.500"
                  />
                </FormControl>
                <FormControl id="state" isRequired>
                  <FormLabel>State</FormLabel>
                  <Input
                    type="text"
                    name="restaurantAddress.state"
                    value={restaurant.restaurantAddress.state}
                    onChange={handleChange}
                    focusBorderColor="purple.500"
                  />
                </FormControl>
                <FormControl id="zipCode" isRequired>
                  <FormLabel>Zip Code</FormLabel>
                  <Input
                    type="text"
                    name="restaurantAddress.zipCode"
                    value={restaurant.restaurantAddress.zipCode}
                    onChange={handleChange}
                    focusBorderColor="purple.500"
                  />
                </FormControl>
              </VStack>
              <VStack spacing={4} align="stretch">
                <Text fontWeight="bold" mb={2}>
                  Click on the map to set restaurant location
                </Text>
                <Box borderRadius="lg" overflow="hidden" boxShadow="md">
                  <MapContainer
                    center={[20.5937, 78.9629]}
                    zoom={5}
                    style={{ height: '400px', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LocationMarker />
                  </MapContainer>
                </Box>
                <FormControl id="latitude" isRequired>
                  <FormLabel>Latitude</FormLabel>
                  <Input
                    type="number"
                    name="latitude"
                    value={restaurant.latitude}
                    readOnly
                    focusBorderColor="purple.500"
                  />
                </FormControl>
                <FormControl id="longitude" isRequired>
                  <FormLabel>Longitude</FormLabel>
                  <Input
                    type="number"
                    name="longitude"
                    value={restaurant.longitude}
                    readOnly
                    focusBorderColor="purple.500"
                  />
                </FormControl>
              </VStack>
            </SimpleGrid>
            <Button
              type="submit"
              colorScheme="purple"
              size="lg"
              mt={8}
              w="full"
              _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
            >
              Add Restaurant
            </Button>
          </form>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default AddRestaurant;