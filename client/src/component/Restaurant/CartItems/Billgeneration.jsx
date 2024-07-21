import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Heading,
  List,
  ListItem,
  Text,
  Button,
  VStack,
  Spinner,
  useToast,
  Flex,
  Divider,
  Icon,
  Image,
  Container
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaCreditCard } from 'react-icons/fa';

const BillGeneration = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const user = await axios.get('http://localhost:8080/auth/user/getInfo', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const response = await axios.get(`http://localhost:8080/cart/getCart/${user.data.username}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setCartItems(response.data.menuItems);
        setTotalAmount(response.data.totalCost);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.message);
        toast({
          title: 'Error fetching cart items',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [toast]);

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" minH="100vh" bg="gray.50">
        <Spinner size="xl" thickness="4px" speed="0.65s" emptyColor="gray.200" color="purple.500" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justifyContent="center" alignItems="center" minH="100vh" bg="gray.50">
        <Text color="red.500" fontSize="xl" fontWeight="bold">{error}</Text>
      </Flex>
    );
  }
  const handleProceedToPurchase = () => {
    navigate('/payment/charge', { state: { amount: totalAmount } });
  };

  return (
    <Box
      minH="100vh"
      width="100%"
      backgroundImage="url('https://images.unsplash.com/photo-1667185487417-c4ca98eb0352?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwc3dlZXR8ZW58MHx8MHx8fDA%3D')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundAttachment="fixed"
    >
      <Flex
        minH="100vh"
        alignItems="center"
        justifyContent="center"
        backgroundColor="rgba(0, 0, 0, 0.6)"
      >
        <Container maxW="lg" p={0}>
          <Box
            bg="white"
            borderRadius="xl"
            boxShadow="2xl"
            overflow="hidden"
          >
            <Box bg="purple.500" p={6}>
              <Flex alignItems="center" justifyContent="center">
                <Icon as={FaShoppingCart} w={8} h={8} color="white" mr={3} />
                <Heading as="h1" size="xl" color="white" textAlign="center">
                  Your Bill
                </Heading>
              </Flex>
            </Box>

            <VStack spacing={6} align="stretch" p={6}>
              <List spacing={4}>
                {cartItems.map((item) => (
                  <ListItem key={item.menuItemId} py={2}>
                    <Flex justifyContent="space-between" alignItems="center">
                      <Flex alignItems="center">
                        <Image
                          src={item.menuItem.imageUrl || 'https://via.placeholder.com/50'}
                          alt={item.menuItem.name}
                          boxSize="50px"
                          objectFit="cover"
                          borderRadius="md"
                          mr={3}
                        />
                        <Box>
                          <Text fontSize="lg" fontWeight="semibold">{item.menuItem.name}</Text>
                          <Text fontSize="sm" color="gray.600">Quantity: {item.quantity}</Text>
                        </Box>
                      </Flex>
                      <Text fontSize="lg" fontWeight="bold">₹{(item.quantity * item.menuItem.price).toFixed(2)}</Text>
                    </Flex>
                  </ListItem>
                ))}
              </List>

              <Divider />

              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="xl" fontWeight="bold">Total:</Text>
                <Text fontSize="2xl" fontWeight="extrabold" color="green.500">
                  ₹{totalAmount.toFixed(2)}
                </Text>
              </Flex>

                <Button
                  colorScheme="purple"
                  size="lg"
                  width="full"
                  mt={4}
                  leftIcon={<FaCreditCard />}
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                  transition="all 0.2s"
                  onClick={handleProceedToPurchase}
                >
                  Proceed to Payment
                </Button>
            </VStack>
          </Box>
        </Container>
      </Flex>
    </Box>
  );
};

export default BillGeneration;