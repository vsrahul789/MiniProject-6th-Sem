import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Select,
  Switch,
  useToast,
  Container,
  Spinner,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaUtensils, FaTags, FaRupeeSign, FaLeaf } from 'react-icons/fa';
import ImageUpload from './ImageUpload';

const AddMenuItem = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [vegetarian, setVegetarian] = useState(false);
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const headingColor = useColorModeValue('purple.900', 'purple.600');

  const getInfo = async () => {
    try {
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
    } catch (error) {
      console.error('Error checking authorization:', error);
      toast({
        title: 'Authorization Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    getInfo();
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
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwtToken');
      const selectedRestaurantData = restaurants.find(
        (restaurant) => restaurant.id === Number(selectedRestaurant)
      );
      await axios.post(
        'http://localhost:8080/menu/add',
        {
          name,
          description,
          price,
          vegetarian,
          category,
          restaurantId: selectedRestaurant,
          restaurantName: selectedRestaurantData.restaurantName,
          imageUrl,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      toast({
        title: 'Menu Item Added',
        description: 'The menu item has been added successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setName('');
      setDescription('');
      setPrice('');
      setVegetarian(false);
      setCategory('');
      setSelectedRestaurant('');
      setImageUrl('');
    } catch (error) {
      console.error('Error adding menu item:', error);
      toast({
        title: 'Error adding menu item',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" color="purple.500" />
      </Box>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh" py={16}>
      <Container maxW="lg">
        <Box
          bg={cardBg}
          p={8}
          borderRadius="xl"
          boxShadow="2xl"
        >
          <Heading as="h1" size="xl" textAlign="center" mb={8} color={headingColor}>
            Add Menu Item
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <FormControl id="restaurant" isRequired>
                <FormLabel>Select Restaurant</FormLabel>
                <Select
                  placeholder="Select Restaurant"
                  onChange={(e) => setSelectedRestaurant(e.target.value)}
                  value={selectedRestaurant}
                  bg={useColorModeValue('gray.100', 'gray.700')}
                  borderRadius="md"
                >
                  {restaurants.map((restaurant) => (
                    <option key={restaurant.id} value={restaurant.id}>
                      {restaurant.restaurantName}
                    </option>
                  ))}
                </Select>
              </FormControl>
              {selectedRestaurant && (
                <>
                  <FormControl id="name" isRequired>
                    <FormLabel>
                      <Icon as={FaUtensils} mr={2} color={headingColor} />
                      Item Name
                    </FormLabel>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      bg={useColorModeValue('gray.100', 'gray.700')}
                      borderRadius="md"
                    />
                  </FormControl>
                  <FormControl id="description" isRequired>
                    <FormLabel>
                      <Icon as={FaTags} mr={2} color={headingColor} />
                      Description
                    </FormLabel>
                    <Input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      bg={useColorModeValue('gray.100', 'gray.700')}
                      borderRadius="md"
                    />
                  </FormControl>
                  <FormControl id="price" isRequired>
                    <FormLabel>
                      <Icon as={FaRupeeSign} mr={2} color={headingColor} />
                      Price
                    </FormLabel>
                    <Input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      bg={useColorModeValue('gray.100', 'gray.700')}
                      borderRadius="md"
                    />
                  </FormControl>
                  <FormControl id="vegetarian" display="flex" alignItems="center">
                    <FormLabel mb="0">
                      <Icon as={FaLeaf} mr={2} color={headingColor} />
                      Vegetarian
                    </FormLabel>
                    <Switch
                      isChecked={vegetarian}
                      onChange={(e) => setVegetarian(e.target.checked)}
                    />
                  </FormControl>
                  <FormControl id="category" isRequired>
                    <FormLabel>Category</FormLabel>
                    <Select
                      placeholder="Select Category"
                      onChange={(e) => setCategory(e.target.value)}
                      value={category}
                      bg={useColorModeValue('gray.100', 'gray.700')}
                      borderRadius="md"
                    >
                      <option value="APPETIZER">Appetizer</option>
                      <option value="SOUP">Soup</option>
                      <option value="SALAD">Salad</option>
                      <option value="STARTER">Starter</option>
                      <option value="MAIN_COURSE">Main Course</option>
                      <option value="SIDE_DISH">Side Dish</option>
                      <option value="DESSERT">Dessert</option>
                      <option value="DRINKS">Drinks</option>
                    </Select>
                  </FormControl>
                  <ImageUpload setImageUrl={setImageUrl} />
                  <Button
                    mt={8}
                    colorScheme="purple"
                    type="submit"
                    width="full"
                    size="lg"
                    fontWeight="bold"
                    _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                  >
                    Add Menu Item
                  </Button>
                </>
              )}
            </VStack>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default AddMenuItem;
