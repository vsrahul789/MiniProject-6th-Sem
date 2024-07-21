import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, List, ListItem, Text, Button, VStack, Spinner, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const BillGeneration = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
        bg="gray.50"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="100vh"
        bg="gray.50"
      >
        <Text color="red.500" fontSize="xl">{error}</Text>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      bg="gray.100"
      p={4}
    >
      <Box
        bg="white"
        p={6}
        borderRadius="lg"
        boxShadow="lg"
        maxW="md"
        mx="auto"
      >
        <Heading as="h1" size="lg" textAlign="center" mb={6}>
          Your Bill
        </Heading>
        <VStack spacing={4} align="stretch">
          <List spacing={3}>
            {cartItems.map((item) => (
              <ListItem key={item.menuItemId} borderBottom="1px" borderColor="gray.200" py={2}>
                <Text fontSize="lg">
                  {item.menuItem.name} - {item.quantity} x ₹{item.menuItem.price.toFixed(2)}
                </Text>
              </ListItem>
            ))}
          </List>
          <Text fontSize="2xl" fontWeight="bold" textAlign="middle">
            Total: ₹{totalAmount.toFixed(2) }
          </Text>
          <Link to="/payment/charge">
            <Button colorScheme="teal" width="full" mt={4} size="lg">
              Proceed to Payment
            </Button>
          </Link>
        </VStack>
      </Box>
    </Box>
  );
};

export default BillGeneration;
