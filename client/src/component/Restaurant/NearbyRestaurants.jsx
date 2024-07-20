import { useState } from "react";
import axios from "axios";
import { Box, Heading, Input, Button, VStack, Container } from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import './NearbyRestaurants.css'; // Import the CSS file

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
    <div className="page-container">
      <Container className="container">
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6" mt="4">
          <Heading as="h1" className="header">Nearby Restaurants</Heading>
          <VStack spacing={4} align="start" className="input-container">
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
          {error && toast.error(error)}
          <ul className="restaurant-list">
            {restaurants.map((restaurant) => (
              <li key={restaurant.id}>
                <Link to={`/booking/${restaurant.id}/add`}>
                  {restaurant.restaurantName}
                </Link>
              </li>
            ))}
          </ul>
        </Box>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default NearbyRestaurants;
