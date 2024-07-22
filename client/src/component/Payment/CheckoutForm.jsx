import { useEffect, useState } from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useToast,
  VStack,
  Spinner,
  ScaleFade,
  Text,
  Container,
  Flex,
  Icon,
  useColorModeValue,
  Progress,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaCreditCard, FaEnvelope, FaRupeeSign, FaLock } from "react-icons/fa";
import PaymentCompletedModal from "./PaymentCompletedModal";

const MotionBox = motion(Box);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cartId, setCartId] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  const fetchUsername = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const user = await axios.get(
        "http://localhost:8080/auth/user/getInfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsername(user.data.username);
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to fetch user information",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const fetchAmount = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(
        `http://localhost:8080/cart/getCart/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartId(response.data.id);
      setEmail(response.data.customer.email);
      setAmount(response.data.totalCost);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to fetch cart information",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchUsername();
  }, []);

  useEffect(() => {
    if (username) {
      fetchAmount();
    }
  }, [username]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      console.log("Stripe or elements not loaded");
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { token } = await stripe.createToken(cardElement);

      const response = await axios.post("http://localhost:8080/stripe/charge", {
        stripeToken: token.id,
        username: username,
        amount: amount,
      });

      if (response.data.isSuccess) {
        toast({
          title: "Payment successful!",
          description: "Thank you for your purchase.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        await clearCart();
        setPaymentCompleted(true);
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Payment failed",
        description: error.message || "An error occurred during payment processing.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setProcessing(false);
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem("jwtToken");
    await axios.delete(`http://localhost:8080/cart/clear/${cartId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <Container maxW="xl" py={10}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        bg={useColorModeValue("white", "gray.800")}
        p={8}
        borderRadius="xl"
        boxShadow="2xl"
        textAlign="center"
      >
        <Flex justifyContent="center" alignItems="center" mb={6}>
          <Heading as="h1" color={useColorModeValue("purple.600", "purple.300")} fontSize="3xl">
            Secure Checkout
          </Heading>
        </Flex>
        <Divider mb={6} />
        {loading ? (
          <Flex justify="center" align="center" height="200px">
            <Spinner size="xl" color="purple.500" thickness="4px" />
          </Flex>
        ) : (
          <ScaleFade initialScale={0.9} in={!loading}>
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <FormControl id="email">
                  <FormLabel fontWeight="bold">Email</FormLabel>
                  <Flex align="center" bg={useColorModeValue("gray.100", "gray.700")} p={2} borderRadius="md">
                    <Icon as={FaEnvelope} color="purple.500" mr={2} />
                    <Input
                      type="email"
                      value={email}
                      required
                      readOnly
                      border="none"
                      _focus={{ boxShadow: "none" }}
                    />
                  </Flex>
                </FormControl>
                <FormControl id="amount">
                  <FormLabel fontWeight="bold">Amount</FormLabel>
                  <Flex align="center" bg={useColorModeValue("gray.100", "gray.700")} p={2} borderRadius="md">
                    <Icon as={FaRupeeSign} color="purple.500" mr={2} />
                    <Input
                      type="number"
                      value={amount}
                      required
                      readOnly
                      border="none"
                      _focus={{ boxShadow: "none" }}
                    />
                  </Flex>
                </FormControl>
                <FormControl id="card">
                  <FormLabel fontWeight="bold">Card Details</FormLabel>
                  <Box
                    border="2px"
                    borderColor="purple.300"
                    borderRadius="md"
                    p={4}
                    bg={useColorModeValue("gray.50", "gray.700")}
                  >
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: useColorModeValue("#424770", "#ffffff"),
                            "::placeholder": {
                              color: useColorModeValue("#aab7c4", "#9ca3af"),
                            },
                          },
                          invalid: {
                            color: "#9e2146",
                          },
                        },
                      }}
                    />
                  </Box>
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="purple"
                  size="lg"
                  width="full"
                  isLoading={processing}
                  loadingText="Processing..."
                  leftIcon={<FaCreditCard />}
                  mt={4}
                >
                  Pay ₹{amount}
                </Button>
              </VStack>
            </form>
          </ScaleFade>
        )}
        {processing && (
          <Box mt={6}>
            <Text mb={2} fontWeight="bold">Processing your payment...</Text>
            <Progress size="xs" isIndeterminate colorScheme="purple" />
          </Box>
        )}
        <Flex justifyContent="center" alignItems="center" mt={6}>
          <Icon as={FaLock} color="green.500" mr={2} />
          <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
            Secure payment powered by Stripe
          </Text>
        </Flex>
      </MotionBox>

      <PaymentCompletedModal isOpen={paymentCompleted} />
    </Container>
  );
};

export default CheckoutForm;