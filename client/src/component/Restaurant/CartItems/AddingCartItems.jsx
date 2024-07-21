import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Button,
  useToast,
  Text,
  Grid,
  Image,
  Flex,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";

const AddingCartItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [username, setUsername] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("jwtToken");
      try {
        const response = await axios.get(
          "http://localhost:8080/auth/user/getInfo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast({
          title: "Error fetching user details",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchUserDetails();
  }, [toast]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          "http://localhost:8080/restaurants/getRestaurant",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        toast({
          title: "Error fetching restaurants",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchRestaurants();
  }, [toast]);

  useEffect(() => {
    if (selectedRestaurant) {
      const fetchMenuItems = async () => {
        try {
          const token = localStorage.getItem("jwtToken");
          const response = await axios.get(
            `http://localhost:8080/menu/restaurant/${selectedRestaurant.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setMenuItems(response.data);
        } catch (error) {
          console.error("Error fetching menu items:", error);
          toast({
            title: "Error fetching menu items",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      };

      fetchMenuItems();
    }
  }, [selectedRestaurant, toast]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      await axios.post(
        "http://localhost:8080/cart/add",
        {
          username,
          menuItemId: selectedMenuItem.id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Added to Cart",
        description: `${quantity} x ${selectedMenuItem.name} added successfully.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      setQuantity(1);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add item to cart.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <Box maxW="1200px" mx="auto" p={6}>
      <Heading as="h1" mb={6} textAlign="center">
        {selectedRestaurant
          ? selectedRestaurant.restaurantName
          : "Choose a Restaurant"}
      </Heading>

      {!selectedRestaurant && (
        <Grid
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          gap={6}
          mb={8}
        >
          {restaurants.map((restaurant) => (
            <Box
              key={restaurant.id}
              borderWidth={1}
              borderRadius="lg"
              p={4}
              cursor="pointer"
              onClick={() => setSelectedRestaurant(restaurant)}
              _hover={{ boxShadow: "md" }}
            >
              <Image
                src={restaurant.imageUrl || "https://via.placeholder.com/150"}
                alt={restaurant.restaurantName}
                borderRadius="md"
                mb={2}
              />
              <Text fontWeight="bold">{restaurant.restaurantName}</Text>
            </Box>
          ))}
        </Grid>
      )}

      {selectedRestaurant && (
        <>
          <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
            {menuItems.map((item) => (
              <Box
                key={item.id}
                borderWidth={1}
                borderRadius="lg"
                overflow="hidden"
                _hover={{ boxShadow: "lg" }}
              >
                <Image
                  src={item.imageUrl || "https://via.placeholder.com/300x200"}
                  alt={item.name}
                  h={48}
                  w="100%"
                  objectFit="cover"
                />
                <Box p={4}>
                  <Flex justify="space-between" align="baseline" mb={2}>
                    <Text fontWeight="semibold" fontSize="lg">
                      {item.name}
                    </Text>
                    <Badge colorScheme={item.vegetarian ? "green" : "red"}>
                      {item.vegetarian ? "Veg" : "Non-Veg"}
                    </Badge>
                  </Flex>
                  <Text fontSize="sm" color="gray.600" mb={2}>
                    {item.description}
                  </Text>
                  <Flex justify="space-between" align="center">
                    <Text fontWeight="bold">₹{item.price.toFixed(2)}</Text>
                    <Button
                      size="sm"
                      colorScheme="purple"
                      leftIcon={<FaPlus />}
                      onClick={() => {
                        setSelectedMenuItem(item);
                        onOpen();
                      }}
                    >
                      Add
                    </Button>
                  </Flex>
                </Box>
              </Box>
            ))}
          </Grid>

          <Flex justify="space-between" mt={8}>
            <Button
              onClick={() => setSelectedRestaurant(null)}
              colorScheme="gray"
            >
              Back to Restaurants
            </Button>
            <Button
              as={Link}
              to="/cart/bill"
              colorScheme="blue"
              rightIcon={<FaShoppingCart />}
            >
              Proceed to Payment
            </Button>
          </Flex>
        </>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedMenuItem?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Image
                src={
                  selectedMenuItem?.imageUrl ||
                  "https://via.placeholder.com/300x200"
                }
                alt={selectedMenuItem?.name}
                borderRadius="md"
              />
              <Text>{selectedMenuItem?.description}</Text>
              <Flex justify="space-between" align="center">
                <Text fontWeight="bold">
                  ₹{selectedMenuItem?.price.toFixed(2)}
                </Text>
                <HStack>
                  <IconButton
                    icon={<FaMinus />}
                    onClick={decrementQuantity}
                    isRound
                    size="sm"
                    variant="outline"
                  />
                  <Text fontWeight="bold">{quantity}</Text>
                  <IconButton
                    icon={<FaPlus />}
                    onClick={incrementQuantity}
                    isRound
                    size="sm"
                    variant="outline"
                  />
                </HStack>
              </Flex>
              <Button
                colorScheme="purple"
                onClick={handleAddToCart}
                leftIcon={<FaShoppingCart />}
              >
                Add to Cart
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AddingCartItems;
