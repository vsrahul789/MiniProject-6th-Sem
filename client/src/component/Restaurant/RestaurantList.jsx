import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Center, Heading, List, ListItem, Spinner, Text } from "@chakra-ui/react";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Assuming the token is stored in localStorage with the key 'jwtToken'
        const response = await axios.get('http://localhost:8080/restaurants/getRestaurant', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setRestaurants(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch restaurants.');
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return <Center><Spinner size="xl" /></Center>;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }
  return (
    <Box p={5}>
      <Heading as="h1" mb={5}>
        Restaurants
      </Heading>
      {error && <Text color="red.500">{error}</Text>}
      <List spacing={3}>
        {restaurants.map((restaurant) => (
          <ListItem key={restaurant.id}>
            <Text fontWeight="bold">{restaurant.restaurantName}</Text>
            <Text>
              {restaurant.restaurantAddress.street},{" "}
              {restaurant.restaurantAddress.city},{" "}
              {restaurant.restaurantAddress.state},{" "}
              {restaurant.restaurantAddress.zipCode}
            </Text>
            <Text>ID: {restaurant.id}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RestaurantList;
