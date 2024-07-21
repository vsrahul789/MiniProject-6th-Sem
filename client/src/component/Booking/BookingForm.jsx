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
  Radio,
  RadioGroup,
  Stack,
  useToast,
  Container,
  Text,
  useColorModeValue,
  Icon,
  Spinner,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaClock } from 'react-icons/fa';

const BookingForm = () => {
  const { restaurantId } = useParams();
  const [bookingDate, setBookingDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [slotId, setSlotId] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const headingColor = useColorModeValue('purple.600', 'purple.300');

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
        console.error('Error fetching restaurant:', error);
        toast({
          title: 'Error fetching restaurant details',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    const fetchSlots = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get(`http://localhost:8080/api/bookingSlots/all`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setSlots(response.data);
        console.log('Fetched slots:', response.data);
      } catch (error) {
        console.error('Error fetching slots:', error);
        toast({
          title: 'Error fetching slots',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
    fetchSlots();
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
        description: 'Your table has been reserved successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: 'Booking Failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  console.log('Current slotId:', slotId);

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
            Book a Table at {restaurantName || "..."}
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <FormControl id="bookingDate" isRequired>
                <FormLabel>
                  <Icon as={FaCalendarAlt} mr={2} color={headingColor} />
                  Booking Date
                </FormLabel>
                <Input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  bg={useColorModeValue('gray.100', 'gray.700')}
                  borderRadius="md"
                />
              </FormControl>
              <FormControl id="numberOfPeople" isRequired>
                <FormLabel>
                  <Icon as={FaUsers} mr={2} color={headingColor} />
                  Number of People
                </FormLabel>
                <Input
                  type="number"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(e.target.value)}
                  bg={useColorModeValue('gray.100', 'gray.700')}
                  borderRadius="md"
                />
              </FormControl>
              <FormControl id="slotId" isRequired>
                <FormLabel>
                  <Icon as={FaClock} mr={2} color={headingColor} />
                  Available Time Slots
                </FormLabel>
                <RadioGroup
                  onChange={(value) => {
                    console.log('Slot selected:', value);
                    setSlotId(value);
                  }}
                  value={slotId}
                >
                  <Stack spacing={4}>
                    {slots.map(slot => (
                      <Radio
                        key={slot.id}
                        value={slot.id}
                        colorScheme="purple"
                        onClick={() => {
                          console.log('Clicked slot:', slot.id);
                          setSlotId(slot.id);
                        }}
                        bg="rgba(255, 0, 0, 0.1)"  // temporary background color
                      >
                        <Text fontSize="md" color={textColor}>
                          {slot.startTime} - {slot.endTime}
                        </Text>
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </FormControl>
              <Button
                mt={8}
                colorScheme="purple"
                type="submit"
                width="full"
                size="lg"
                fontWeight="bold"
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
              >
                Reserve Table
              </Button>
            </VStack>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default BookingForm;