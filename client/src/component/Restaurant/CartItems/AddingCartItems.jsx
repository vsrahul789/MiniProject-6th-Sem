import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
//   Input,
  Button,
  Select,
  NumberInput,
  NumberInputField,
  useToast,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const AddingCartItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [username, setUsername] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const toast = useToast();

  useEffect(() => {
    // Fetch logged-in user's username
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('jwtToken');
      try {
        const response = await axios.get('http://localhost:8080/auth/user/getInfo', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('http://localhost:8080/restaurants/getRestaurant', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
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

  useEffect(() => {
    if (restaurantId) {
      const fetchMenuItems = async () => {
        try {
          const token = localStorage.getItem('jwtToken');
          const response = await axios.get(`http://localhost:8080/menu/restaurant/${restaurantId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setMenuItems(response.data);
        } catch (error) {
          console.error('Error fetching menu items:', error);
          toast({
            title: 'Error fetching menu items',
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      };

      fetchMenuItems();
    }
  }, [restaurantId, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.post(
        'http://localhost:8080/cart/add',
        {
          username,
          menuItemId: selectedMenuItem,
          quantity,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      toast({
        title: 'Cart Item Added',
        description: 'The item has been added to your cart successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setSelectedMenuItem('');
      setQuantity(1);
      setRestaurantId('');
    } catch (error) {
      console.error('Error adding cart item:', error);
      toast({
        title: 'Error adding cart item',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Heading as="h1">Add Item to Cart</Heading>
      <FormControl id="restaurant" mt={4}>
        <FormLabel>Select Restaurant</FormLabel>
        <Select
          placeholder="Select Restaurant"
          onChange={(e) => setRestaurantId(e.target.value)}
          value={restaurantId}
        >
          {restaurants.map((restaurant) => (
            <option key={restaurant.id} value={restaurant.id}>
              {restaurant.restaurantName}
            </option>
          ))}
        </Select>
      </FormControl>
      {restaurantId && (
        <FormControl id="menuItem" mt={4}>
          <FormLabel>Select Menu Item</FormLabel>
          <Select
            placeholder="Select Menu Item"
            onChange={(e) => setSelectedMenuItem(e.target.value)}
            value={selectedMenuItem}
          >
            {menuItems.map((menuItem) => (
              <option key={menuItem.id} value={menuItem.id}>
                {menuItem.name} - {menuItem.description} - ${menuItem.price.toFixed(2)}
              </option>
            ))}
          </Select>
        </FormControl>
      )}
      {selectedMenuItem && (
        <Box mt={4}>
          <Text><strong>Name:</strong> {menuItems.find(item => item.id === Number(selectedMenuItem)).name}</Text>
          <Text><strong>Description:</strong> {menuItems.find(item => item.id === Number(selectedMenuItem)).description}</Text>
          <Text><strong>Price:</strong> ${menuItems.find(item => item.id === Number(selectedMenuItem)).price.toFixed(2)}</Text>
          <Text><strong>Vegetarian:</strong> {menuItems.find(item => item.id === Number(selectedMenuItem)).vegetarian ? 'Yes' : 'No'}</Text>
          <Text><strong>Category:</strong> {menuItems.find(item => item.id === Number(selectedMenuItem)).category}</Text>
        </Box>
      )}
      {selectedMenuItem && (
        <>
          <FormControl id="quantity" mt={4}>
            <FormLabel>Quantity</FormLabel>
            <NumberInput min={1} value={quantity} onChange={(valueString) => setQuantity(Number(valueString))}>
              <NumberInputField />
            </NumberInput>
          </FormControl>
          <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
            Add to Cart
          </Button>
        </>
      )}
      <Button>
        <Link to="/cart/bill">Proceed To payment</Link>
      </Button>
    </Box>
  );
};

export default AddingCartItems;
