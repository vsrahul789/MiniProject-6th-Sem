import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, FormControl, FormLabel, Input, Button, Select, Switch, useToast } from '@chakra-ui/react';

const AddMenuItem = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [vegetarian, setVegetarian] = useState(false);
  const [category, setCategory] = useState('');
  const toast = useToast();

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
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error adding menu item',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Heading as="h1">Add Menu Item</Heading>
      <FormControl id="restaurant" mt={4}>
        <FormLabel>Select Restaurant</FormLabel>
        <Select
          placeholder="Select Restaurant"
          onChange={(e) => setSelectedRestaurant(e.target.value)}
          value={selectedRestaurant}
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
          <FormControl id="name" mt={4}>
            <FormLabel>Item Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormControl>
          <FormControl id="description" mt={4}>
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </FormControl>
          <FormControl id="price" mt={4}>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </FormControl>
          <FormControl id="vegetarian" mt={4}>
            <FormLabel>Vegetarian</FormLabel>
            <Switch
              isChecked={vegetarian}
              onChange={(e) => setVegetarian(e.target.checked)}
            />
          </FormControl>
          <FormControl id="category" mt={4}>
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="Select Category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              required
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
          <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
            Add Menu Item
          </Button>
        </>
      )}
    </Box>
  );
};

export default AddMenuItem;
