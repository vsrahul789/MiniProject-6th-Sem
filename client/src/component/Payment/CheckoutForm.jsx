import { useEffect, useState } from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Box, Button, FormControl, FormLabel, Input, Heading, useToast, VStack, Spinner, ScaleFade } from "@chakra-ui/react";
import { css, keyframes } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cartId, setCartId] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate(); // Add this line

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
      console.log(user.data);
      setUsername(user.data.username);
    } catch (error) {
      console.error(error);
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
      console.log(response.data);
      setCartId(response.data.id);
      setEmail(response.data.customer.email);
      setAmount(response.data.totalCost);
      setLoading(false);
    } catch (error) {
      console.error(error);
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

    if (!stripe || !elements) {
      console.log("Stripe or elements not loaded");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Create a token
      const { token } = await stripe.createToken(cardElement);

      // Send token to backend for charging
      const response = await axios.post("http://localhost:8080/stripe/charge", {
        stripeToken: token.id,
        username: username,
        amount: amount,
      });

      if (response.data.isSuccess) {
        toast({
          title: "Payment successful!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        clearCart();
        setTimeout(() => {
          navigate("/"); // Add this line to redirect to home after delay
        }, 5000); // 5 seconds delay
      } else {
        toast({
          title: `Payment failed: ${response.data.message}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "An error occurred during payment processing.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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

  const buttonAnimation = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  `;

  return (
    <Box maxW="400px" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="md" boxShadow="md">
      <Heading as="h1" mb={6} textAlign="center">
        Stripe Payment
      </Heading>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <ScaleFade initialScale={0.9} in={!loading}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  required
                  readOnly
                  _readOnly={{ bg: "gray.100" }}
                />
              </FormControl>
              <FormControl id="amount">
                <FormLabel>Amount</FormLabel>
                <Input
                  type="number"
                  value={amount}
                  required
                  readOnly
                  _readOnly={{ bg: "gray.100" }}
                />
              </FormControl>
              <FormControl id="card">
                <FormLabel>Card Details</FormLabel>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                    },
                  }}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="purple"
                isFullWidth
                css={css`
                  animation: ${buttonAnimation} 1s infinite;
                `}
              >
                Click to Pay
              </Button>
            </VStack>
          </form>
        </ScaleFade>
      )}
    </Box>
  );
};

export default CheckoutForm;
