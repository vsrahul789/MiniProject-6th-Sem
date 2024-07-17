import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  VStack,
  useToast
} from '@chakra-ui/react';

const GetRestaurantId = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://localhost:8080/restaurants/getRestaurant', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRestaurantList(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        toast({
          title: 'Error fetching restaurants.',
          description: 'There was an error fetching the restaurants list.',
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      }
    };

    fetchRestaurants();
  }, [toast]);

  const handleSelectChange = (e) => {
    setSelectedRestaurantId(e.target.value);
  };

  const handleNavigate = () => {
    if (!selectedRestaurantId) {
      toast({
        title: 'Please select a restaurant.',
        status: 'warning',
        duration: 3000,
        isClosable: true
      });
      return;
    }
    navigate(`/restaurants/update/${selectedRestaurantId}`);
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <FormControl id="restaurantSelect">
          <FormLabel>Select Restaurant</FormLabel>
          <Select placeholder="Select restaurant" onChange={handleSelectChange}>
            {restaurantList.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.restaurantName}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button colorScheme="teal" onClick={handleNavigate}>
          Update Restaurant
        </Button>
      </VStack>
    </Box>
  );
};

export default GetRestaurantId;
