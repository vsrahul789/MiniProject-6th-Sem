import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  Button,
  useToast,
  VStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const RestaurantSelection = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://localhost:8080/restaurants/getRestaurant', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      navigate(`/booking/${selectedRestaurant.id}/add`);
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
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgImage="url('https://images.pexels.com/photos/12620880/pexels-photo-12620880.jpeg')" // Change this to your image path
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      p={4}
    >
      <Box
        bg="rgba(255, 255, 255, 0.9)" // Semi-transparent background for better readability
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        maxW="lg"
        width="100%"
      >
        <VStack spacing={4}>
          <Heading as="h1" size="lg" textAlign="center" color="purple.500">
            Select a Restaurant
          </Heading>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} width="100%">
              {selectedRestaurant ? selectedRestaurant.restaurantName : 'Select a Restaurant'}
            </MenuButton>
            <MenuList>
              {restaurants.map((restaurant) => (
                <MenuItem
                  key={restaurant.id}
                  onClick={() => setSelectedRestaurant(restaurant)}
                  _hover={{ bg: 'gray.100' }}
                  _focus={{ bg: 'gray.100' }}
                >
                  <Box>
                    <Text fontWeight="bold">{restaurant.restaurantName}</Text>
                    <Text>Distance: {restaurant.distance} km</Text>
                    <Text>Address: {restaurant.address}</Text>
                  </Box>
                </MenuItem>
              ))}
              {restaurants.length > 0 && <MenuDivider />}
            </MenuList>
          </Menu>
          <Button mt={4} colorScheme="purple" onClick={handleSelect} width="full">
            Next
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default RestaurantSelection;
