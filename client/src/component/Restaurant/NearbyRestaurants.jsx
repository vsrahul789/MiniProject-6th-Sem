import { useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  List,
  ListItem,
  // Text,
  Input,
  Button,
  VStack,
  Container,
} from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const NearbyRestaurants = () => {
  const [radius, setRadius] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  const handleRadiusChange = (e) => {
    setRadius(e.target.value);
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          axios
            .get("http://localhost:8080/restaurants/nearby", {
              params: {
                latitude,
                longitude,
                radius: radius, // Radius in kilometers
              },
            })
            .then((response) => {
              setRestaurants(response.data);
              setError(null);
            })
            .catch((error) => {
              toast.error("Error fetching nearby restaurants");
              setError(error.message);
            });
        },
        (error) => {
          toast.error(error.message);
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <Container maxW="container.md" py={20}>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6" mt="4">
        <Heading as="h1" mb={4}>
          Nearby Restaurants
        </Heading>
        <VStack spacing={4} align="start">
          <Input
            type="number"
            placeholder="Enter radius in kilometers"
            value={radius}
            onChange={handleRadiusChange}
          />
          <Button onClick={handleSubmit} colorScheme="teal">
            Find Restaurants
          </Button>
        </VStack>
        {error &&
          toast.error(error)}
        <List spacing={3} mt={4}>
          {restaurants.map((restaurant) => (
            <ListItem key={restaurant.id}>
              <Link to={`/booking/${restaurant.id}/add`}>
                {restaurant.restaurantName}
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default NearbyRestaurants;
