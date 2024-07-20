import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Center, Heading, List, ListItem, Spinner, Text, Input } from "@chakra-ui/react";
import "./RestaurantList.css"; // Import the CSS file

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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
        setRestaurants(response.data);
        setFilteredRestaurants(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch restaurants.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleBookNow = (restaurantId) => {
    navigate(`/booking/${restaurantId}/add`);
  };

  const handleSearch = () => {
    const filtered = restaurants.filter(restaurant =>
      restaurant.restaurantName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  if (loading) {
    return (
      <Center className="spinner-container">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center className="error-message">
        <Text>{error}</Text>
      </Center>
    );
  }

  return (
    <Box className="container">
      <Heading as="h1" mb={5}>
        Restaurants
      </Heading>
      <Box className="search-bar">
        <Input
          placeholder="Search Restaurants"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </Box>
      <List className="restaurant-list">
        {filteredRestaurants.map((restaurant) => (
          <ListItem key={restaurant.id} className="restaurant-item">
            <img src={`/path/to/restaurant-images/${restaurant.id}.jpg`} alt={restaurant.restaurantName} />
            <Text fontWeight="bold" fontSize="xl">{restaurant.restaurantName}</Text>
            <Text>
              {restaurant.restaurantAddress.street}, {restaurant.restaurantAddress.city}, {restaurant.restaurantAddress.state}, {restaurant.restaurantAddress.zipCode}
            </Text>
            <Text>ID: {restaurant.id}</Text>
            <Button className="book-now" onClick={() => handleBookNow(restaurant.id)}>
              Book Now
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RestaurantList;
