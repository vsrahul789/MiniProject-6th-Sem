// src/components/NearbyRestaurants.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react';

const NearbyRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    axios.get('http://localhost:8080/restaurants/nearby', {
                        params: {
                            latitude,
                            longitude,
                            radius: 10000 // Radius in kilometers
                        }
                    })
                    .then(response => {
                        setRestaurants(response.data);
                    })
                    .catch(error => {
                        setError(error.message);
                    });
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    }, []);

    return (
        <Box>
            <Heading as="h1">Nearby Restaurants</Heading>
            {error && <Text color="red.500">{error}</Text>}
            <List spacing={3}>
                {restaurants.map((restaurant) => (
                    <ListItem key={restaurant.restaurantID}>
                        {restaurant.restaurantName}
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default NearbyRestaurants;
