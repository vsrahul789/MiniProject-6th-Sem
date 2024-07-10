import { useState } from "react";
import axios from "axios";
import {CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Box, Button, FormControl, FormLabel, Input, Heading, Text } from "@chakra-ui/react";
import PropTypes from 'prop-types';


const CheckoutForm = ({ username }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
        console.log('Stripe or elements not loaded')
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
        setMessage("Payment successful!");
      } else {
        setMessage(`Payment failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred during payment processing.");
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={10}>
      <Heading as="h1" mb={6}>Stripe Payment</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="email" mb={3}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="amount" mb={3}>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="card" mb={6}>
          <FormLabel>Card Details</FormLabel>
          <CardElement />
        </FormControl>
        <Button type="submit" colorScheme="teal" isFullWidth>
          Pay
        </Button>
      </form>
      {message && <Text mt={6} color={message.includes("successful") ? "green.500" : "red.500"}>{message}</Text>}
    </Box>
  );
};

// const StripePayment = ({ username }) => (
//   <Elements stripe={stripePromise}>
//     <CheckoutForm username={username} />
//   </Elements>
// );

CheckoutForm.propTypes = {
    username: PropTypes.string.isRequired,
  };

export default CheckoutForm;
