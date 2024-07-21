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
} from "@chakra-ui/react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [cartId, setCartId] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [username, setUsername] = useState("");
  const toast = useToast();

  useEffect(() => {
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
    fetchUsername();
  });
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const fetchAmount = async () => {
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
    };
    fetchAmount();
  });

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

  return (
    <Box maxW="400px" mx="auto" mt={10}>
      <Heading as="h1" mb={6}>
        Stripe Payment
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="email" mb={3}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            required
          />
        </FormControl>
        <FormControl id="amount" mb={3}>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            value={amount}
            required
          />
        </FormControl>
        <FormControl id="card" mb={6}>
          <FormLabel>Card Details</FormLabel>
          <CardElement />
        </FormControl>
        <Button type="submit" colorScheme="purple" isFullWidth>
          Pay
        </Button>
      </form>
    </Box>
  );
};

export default CheckoutForm;
