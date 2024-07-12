import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Select, Button, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const RestaurantSelection = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://localhost:8080/restaurants/getRestaurant', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const sortedRestaurants = response.data.sort((a, b) => a.distance - b.distance);
        setRestaurants(sortedRestaurants);
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error fetching restaurants',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchRestaurants();
  }, [toast]);

  const handleSelect = () => {
    if (selectedRestaurant) {
      navigate(`/booking/${selectedRestaurant}/add`);
    } else {
      toast({
        title: 'No restaurant selected',
        description: 'Please select a restaurant to proceed.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Heading as="h1">Select a Restaurant</Heading>
      <Select
        placeholder="Select a Restaurant"
        onChange={(e) => setSelectedRestaurant(e.target.value)}
        mt={4}
      >
        {restaurants.map((restaurant) => (
          <option key={restaurant.id} value={restaurant.id}>
            {restaurant.restaurantName} (Distance: {restaurant.distance} km)
          </option>
        ))}
      </Select>
      <Button mt={4} colorScheme="teal" onClick={handleSelect}>
        Next
      </Button>
    </Box>
  );
};

export default RestaurantSelection;
