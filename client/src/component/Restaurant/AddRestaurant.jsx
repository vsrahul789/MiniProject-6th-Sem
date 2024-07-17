import { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const AddRestaurant = () => {
  const [restaurant, setRestaurant] = useState({
    restaurantName: '',
    maxTable: '',
    latitude: '',
    longitude: '',
    foodType: '',
    restaurantAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });

  const toast = useToast();

  useEffect(() => {
    if (restaurant.latitude && restaurant.longitude) {
      fetchAddress(restaurant.latitude, restaurant.longitude);
    }
  }, [restaurant.latitude, restaurant.longitude]);

  const fetchAddress = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const { address } = response.data;
      setRestaurant((prev) => ({
        ...prev,
        restaurantAddress: {
          street: address.road || '',
          city: address.city || address.town || address.village || '',
          state: address.state || '',
          zipCode: address.postcode || '',
        },
      }));
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('restaurantAddress.')) {
      const addressField = name.split('.')[1];
      setRestaurant({
        ...restaurant,
        restaurantAddress: { ...restaurant.restaurantAddress, [addressField]: value },
      });
    } else {
      setRestaurant({ ...restaurant, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting restaurant:', restaurant);
    try {
      const response = await axios.post('http://localhost:8080/restaurants/addRestaurants', restaurant, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response from backend:', response);
      toast({
        title: 'Restaurant added successfully.',
        description: `Restaurant ${response.data.restaurantName} has been added.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setRestaurant({
        restaurantName: '',
        maxTable: '',
        latitude: '',
        longitude: '',
        foodType: '',
        restaurantAddress: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
        },
      });
    } catch (error) {
      console.error('Error adding restaurant:', error);
      toast({
        title: 'An error occurred.',
        description: 'Unable to add restaurant.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setRestaurant((prev) => ({
          ...prev,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        }));
      },
    });

    return restaurant.latitude && restaurant.longitude ? (
      <Marker position={[restaurant.latitude, restaurant.longitude]} />
    ) : null;
  };

  return (
    <Box maxW="md" mx="auto" mt={5} p={5} borderWidth={1} borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <FormControl id="restaurantName" isRequired>
          <FormLabel>Restaurant Name</FormLabel>
          <Input
            type="text"
            name="restaurantName"
            value={restaurant.restaurantName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="maxTable" isRequired mt={4}>
          <FormLabel>Max Table</FormLabel>
          <Input
            type="number"
            name="maxTable"
            value={restaurant.maxTable}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="latitude" isRequired mt={4}>
          <FormLabel>Latitude</FormLabel>
          <Input
            type="number"
            name="latitude"
            value={restaurant.latitude}
            readOnly
          />
        </FormControl>
        <FormControl id="longitude" isRequired mt={4}>
          <FormLabel>Longitude</FormLabel>
          <Input
            type="number"
            name="longitude"
            value={restaurant.longitude}
            readOnly
          />
        </FormControl>
        <FormControl id="foodType" isRequired mt={4}>
          <FormLabel>Food Type</FormLabel>
          <Select
            name="foodType"
            value={restaurant.foodType}
            onChange={handleChange}
          >
            <option value="VEGETARIAN">Veg</option>
            <option value="NON_VEGETARIAN">Non-Veg</option>
          </Select>
        </FormControl>
        <FormControl id="street" isRequired mt={4}>
          <FormLabel>Street</FormLabel>
          <Input
            type="text"
            name="restaurantAddress.street"
            value={restaurant.restaurantAddress.street}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="city" isRequired mt={4}>
          <FormLabel>City</FormLabel>
          <Input
            type="text"
            name="restaurantAddress.city"
            value={restaurant.restaurantAddress.city}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="state" isRequired mt={4}>
          <FormLabel>State</FormLabel>
          <Input
            type="text"
            name="restaurantAddress.state"
            value={restaurant.restaurantAddress.state}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="zipCode" isRequired mt={4}>
          <FormLabel>Zip Code</FormLabel>
          <Input
            type="text"
            name="restaurantAddress.zipCode"
            value={restaurant.restaurantAddress.zipCode}
            onChange={handleChange}
          />
        </FormControl>
        <Box mt={4}>
          <MapContainer
            center={[20.5937, 78.9629]} // Center on India
            zoom={5}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
          </MapContainer>
        </Box>
        <Button type="submit" colorScheme="purple" mt={4}>
          Add Restaurant
        </Button>
      </form>
    </Box>
  );
};

export default AddRestaurant;
