import { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  useToast,
} from '@chakra-ui/react';

const AddRestaurant = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [maxTable, setMaxTable] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [foodType, setFoodType] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('jwtToken');
    try {
      const response = await axios.post(
        'http://localhost:8080/restaurants/addRestaurants',
        {
          restaurantName,
          maxTable: parseInt(maxTable, 10),
          restaurantAddress: {
            street,
            city,
            state,
            zipCode,
          },
          foodType,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      toast({
        title: 'Restaurant added.',
        description: `Restaurant ${response.data.restaurantName} added successfully.`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
//       setRestaurantName('');
//       setMaxTable('');
//       setStreet('');
//       setCity('');
//       setState('');
//       setZipCode('');
//       setFoodType('');
//       setLatitude('');
//       setLongitude('');
    } catch (error) {
      toast({
        title: 'Error.',
        description: 'Failed to add restaurant.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>Add Restaurant</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="restaurantName" isRequired>
            <FormLabel>Restaurant Name</FormLabel>
            <Input
              type="text"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
            />
          </FormControl>
          <FormControl id="maxTable" isRequired>
            <FormLabel>Max Table</FormLabel>
            <Input
              type="number"
              value={maxTable}
              onChange={(e) => setMaxTable(e.target.value)}
            />
          </FormControl>
          <FormControl id="street" isRequired>
            <FormLabel>Street</FormLabel>
            <Input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </FormControl>
          <FormControl id="city" isRequired>
            <FormLabel>City</FormLabel>
            <Input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </FormControl>
          <FormControl id="state" isRequired>
            <FormLabel>State</FormLabel>
            <Input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </FormControl>
          <FormControl id="zipCode" isRequired>
            <FormLabel>Zip Code</FormLabel>
            <Input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </FormControl>
          <FormControl id="foodType" isRequired>
            <FormLabel>Food Type</FormLabel>
            <Select
              placeholder="Select food type"
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
            >
              <option value="VEGETARIAN">Vegetarian</option>
              <option value="NON_VEGETARIAN">Non-Vegetarian</option>
              <option value="VEGAN">Vegan</option>
            </Select>
          </FormControl>
          <FormControl id="latitude" isRequired>
            <FormLabel>Latitude</FormLabel>
            <Input
              type="number"
              step="any"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </FormControl>
          <FormControl id="longitude" isRequired>
            <FormLabel>Longitude</FormLabel>
            <Input
              type="number"
              step="any"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="purple" width="full">
            Add Restaurant
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddRestaurant;
