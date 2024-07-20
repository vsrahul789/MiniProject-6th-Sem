import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, List, ListItem, Text, Button, VStack, Spinner } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

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
        console.log(response.data);
        setCartItems(response.data.menuItems);
        // const total = response.data.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
    return <Spinner />;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  return (
    <Box
    //   bgImage="url('https://images.pexels.com/photos/3183182/pexels-photo-3183182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
    //   bgPosition="center"
    //   bgRepeat="no-repeat"
    //   bgSize="cover"
    //   minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bg="rgba(255, 255, 255, 0.8)"
        p={6}
        borderRadius="lg"
        boxShadow="lg"
        maxW="md"
        mx="auto"
      >
        <Heading as="h1" size="lg" textAlign="center" mb={6}>
          Your Bill
        </Heading>
        <VStack spacing={4}>
          <List spacing={3} width="full">
            {cartItems.map((item) => (
              <ListItem key={item.menuItemId}>
                <Text>
                  {item.menuItem.name} - {item.quantity} * {item.menuItem.price}
                </Text>
              </ListItem>
            ))}
          </List>
          <Text fontSize="xl" fontWeight="bold">
            Total: ${totalAmount.toFixed(2)}
          </Text>
          <Link to="/payment/charge">
            <Button colorScheme="teal" width="full">
              Proceed to Payment
            </Button>
          </Link>
        </VStack>
      </Box>
    </Box>
  );
};

export default BillGeneration;
