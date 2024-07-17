import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
} from '@chakra-ui/react';

const UpdateRestaurantForm = () => {
  const { restaurantId } = useParams();
  const [restaurantData, setRestaurantData] = useState({
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
  const toast = useToast();

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get(`http://localhost:8080/restaurants/getRestaurant/${restaurantId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRestaurantData(response.data);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
        toast({
          title: 'Error fetching restaurant details.',
          description: 'There was an error fetching the restaurant details.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchRestaurantDetails();
  }, [restaurantId, toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData((prevData) => ({
      ...prevData,
      restaurantAddress: {
        ...prevData.restaurantAddress,
        [name]: value,
      },
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.put(`http://localhost:8080/restaurants/update/${restaurantId}`, restaurantData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: 'Restaurant updated.',
        description: 'The restaurant details have been updated successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating restaurant:', error);
      toast({
        title: 'Error updating restaurant.',
        description: 'There was an error updating the restaurant.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} as="form" onSubmit={handleFormSubmit}>
        <FormControl id="restaurantName">
          <FormLabel>Restaurant Name</FormLabel>
          <Input
            type="text"
            name="restaurantName"
            value={restaurantData.restaurantName}
            onChange={handleInputChange}
            required
          />
        </FormControl>
        <FormControl id="maxTable">
          <FormLabel>Max Table</FormLabel>
          <Input
            type="number"
            name="maxTable"
            value={restaurantData.maxTable}
            onChange={handleInputChange}
            required
          />
        </FormControl>
        <FormControl id="latitude">
          <FormLabel>Latitude</FormLabel>
          <Input
            type="number"
            name="latitude"
            value={restaurantData.latitude}
            onChange={handleInputChange}
            required
          />
        </FormControl>
        <FormControl id="longitude">
          <FormLabel>Longitude</FormLabel>
          <Input
            type="number"
            name="longitude"
            value={restaurantData.longitude}
            onChange={handleInputChange}
            required
          />
        </FormControl>
        <FormControl id="foodType">
          <FormLabel>Food Type</FormLabel>
          <Select
            name="foodType"
            value={restaurantData.foodType}
            onChange={handleInputChange}
            required
          >
            <option value="VEGETARIAN">Vegetarian</option>
            <option value="NON_VEGETARIAN">Non-Vegetarian</option>
            <option value="VEGAN">Vegan</option>
          </Select>
        </FormControl>
        <FormControl id="street">
          <FormLabel>Street</FormLabel>
          <Input
            type="text"
            name="street"
            value={restaurantData.restaurantAddress.street}
            onChange={handleAddressChange}
            required
          />
        </FormControl>
        <FormControl id="city">
          <FormLabel>City</FormLabel>
          <Input
            type="text"
            name="city"
            value={restaurantData.restaurantAddress.city}
            onChange={handleAddressChange}
            required
          />
        </FormControl>
        <FormControl id="state">
          <FormLabel>State</FormLabel>
          <Input
            type="text"
            name="state"
            value={restaurantData.restaurantAddress.state}
            onChange={handleAddressChange}
            required
          />
        </FormControl>
        <FormControl id="zipCode">
          <FormLabel>Zip Code</FormLabel>
          <Input
            type="text"
            name="zipCode"
            value={restaurantData.restaurantAddress.zipCode}
            onChange={handleAddressChange}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Update Restaurant
        </Button>
      </VStack>
    </Box>
  );
};

export default UpdateRestaurantForm;
