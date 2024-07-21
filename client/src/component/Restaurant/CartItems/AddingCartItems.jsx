import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Button,
  Select,
  useToast,
  Text,
  VStack,
  Flex,
  Spacer,
  Divider,
  IconButton,
  Stack,
  Tag,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaPlus, FaMinus } from 'react-icons/fa';

const AddingCartItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
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
            Authorization: `Bearer ${token}`,
          },
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
            Authorization: `Bearer ${token}`,
          },
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
              Authorization: `Bearer ${token}`,
            },
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
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: 'Cart Item Added',
        description: 'The item has been added to your cart successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setSelectedMenuItem(null);
      setQuantity(1);
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

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <Box maxW="600px" mx="auto" p={6} boxShadow="lg" rounded="md" bg="white">
      <Heading as="h1" mb={6} textAlign="center">
        Add Item to Cart
      </Heading>
      <VStack spacing={4} align="stretch">
        <FormControl id="restaurant">
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
          <Box>
            <FormLabel>Select Menu Item</FormLabel>
            <Stack spacing={3}>
              {menuItems.map((menuItem) => (
                <Tag
                  key={menuItem.id}
                  size="lg"
                  variant={selectedMenuItem === menuItem.id ? 'solid' : 'outline'}
                  colorScheme="purple"
                  cursor="pointer"
                  onClick={() => setSelectedMenuItem(menuItem.id)}
                >
                  {menuItem.name} - ₹{menuItem.price.toFixed(2)}
                </Tag>
              ))}
            </Stack>
          </Box>
        )}
        {selectedMenuItem && (
          <Box p={4} boxShadow="md" rounded="md" bg="gray.50">
            <Flex alignItems="center">
              <Box flex="1">
                <Text fontWeight="bold">Name:</Text>
                <Text>{menuItems.find((item) => item.id === Number(selectedMenuItem)).name}</Text>
              </Box>
              <Spacer />
              <Box flex="1">
                <Text fontWeight="bold">Price:</Text>
                <Text>₹{menuItems.find((item) => item.id === Number(selectedMenuItem)).price.toFixed(2)}</Text>
              </Box>
            </Flex>
            <Divider my={4} />
            <Text fontWeight="bold">Description:</Text>
            <Text>{menuItems.find((item) => item.id === Number(selectedMenuItem)).description}</Text>
            <Text fontWeight="bold">Vegetarian:</Text>
            <Text>{menuItems.find((item) => item.id === Number(selectedMenuItem)).vegetarian ? 'Yes' : 'No'}</Text>
            <Text fontWeight="bold">Category:</Text>
            <Text>{menuItems.find((item) => item.id === Number(selectedMenuItem)).category}</Text>
          </Box>
        )}
        {selectedMenuItem && (
          <>
            <FormControl id="quantity">
              <FormLabel>Quantity</FormLabel>
              <Flex alignItems="center">
                <IconButton
                  icon={<FaMinus />}
                  aria-label="Decrease quantity"
                  onClick={decrementQuantity}
                  isRound
                  size="sm"
                  variant="outline"
                />
                <Box mx={4} w="50px" textAlign="center">
                  <Text fontSize="lg" fontWeight="bold">{quantity}</Text>
                </Box>
                <IconButton
                  icon={<FaPlus />}
                  aria-label="Increase quantity"
                  onClick={incrementQuantity}
                  isRound
                  size="sm"
                  variant="outline"
                />
              </Flex>
            </FormControl>
            <Button colorScheme="purple" onClick={handleSubmit} mt={4}>
              Add to Cart
            </Button>
          </>
        )}
      </VStack>
      <Button mt={6} w="full" colorScheme="blue">
        <Link to="/cart/bill">Proceed To Payment</Link>
      </Button>
    </Box>
  );
};

export default AddingCartItems;
