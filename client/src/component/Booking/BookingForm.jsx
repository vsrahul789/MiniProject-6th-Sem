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
import { Navigate, useParams } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaClock, FaCheckCircle } from 'react-icons/fa';

// New component for the confirmation page
const ConfirmationPage = ({ restaurantName }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const headingColor = useColorModeValue('purple.600', 'purple.300');

  return (
    <Box bg={bgColor} minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Container maxW="lg">
        <Box bg={cardBg} p={8} borderRadius="xl" boxShadow="2xl" textAlign="center">
          <Icon as={FaCheckCircle} w={20} h={20} color="green.500" mb={4} />
          <Heading as="h1" size="xl" mb={4} color={headingColor}>
            Booking Confirmed!
          </Heading>
          <Text fontSize="lg">
            Your table at {restaurantName} has been successfully reserved.
            Email has been sent to you for Confirmation
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

const BookingForm = () => {
  const { restaurantId } = useParams();
  const [bookingDate, setBookingDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [slotId, setSlotId] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState('idle'); // 'idle', 'loading', 'confirmed'
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
        // console.log('Fetched slots:', response.data);
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
    setBookingStatus('loading');
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
      setBookingStatus('confirmed');
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: 'Booking Failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setBookingStatus('idle');
    }
  };

  // console.log('Current slotId:', slotId);

  if (loading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" color="purple.500" />
      </Box>
    );
  }

  if (bookingStatus === 'confirmed') {
    return <ConfirmationPage restaurantName={restaurantName} />;

  }
  const handleBackToHome = () => {
       Navigate('/'); // Adjust this path if your home route is different
     }

  return (
      <Box
            bg={bgColor}
            minH="100vh"
            py={16}
            bgImage="url('https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
            bgSize="cover"
            bgPosition="center"
          >
            <Container maxW="lg">
              <Box
                bg={cardBg}
                p={8}
                borderRadius="xl"
                boxShadow="2xl"
                opacity={1}
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
                  // bg={useColorModeValue('gray.100', 'gray.700')}
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
                  // bg={useColorModeValue('gray.100', 'gray.700')}
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
                    // console.log('Slot selected:', value);
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
                          // console.log('Clicked slot:', slot.id);
                          setSlotId(slot.id);
                        }}
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
                isLoading={bookingStatus === 'loading'}
                loadingText="Reserving..."
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