import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const BookingForm = () => {
  const { restaurantId } = useParams();
  const [bookingDate, setBookingDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [slotId, setSlotId] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const toast = useToast();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get(`http://localhost:8080/restaurants/getRestaurant/${restaurantId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setRestaurantName(response.data.restaurantName);
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error fetching restaurant details',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchRestaurant();
  }, [restaurantId, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.post(
        'http://localhost:8080/api/bookings/addBooking',
        { restaurantId, bookingDate, numberOfPeople, slotId },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      toast({
        title: 'Booking Successful',
        description: 'Your booking has been made successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Booking Failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Heading as="h1">Book a table at {restaurantName}</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="bookingDate" mt={4}>
          <FormLabel>Booking Date</FormLabel>
          <Input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="numberOfPeople" mt={4}>
          <FormLabel>Number of People</FormLabel>
          <Input
            type="number"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="slotId" mt={4}>
          <FormLabel>Slot ID</FormLabel>
          <Input
            type="text"
            value={slotId}
            onChange={(e) => setSlotId(e.target.value)}
            required
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Book Slot
        </Button>
      </form>
    </Box>
  );
};

export default BookingForm;
