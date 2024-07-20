import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Text,
  Input,
} from '@chakra-ui/react';
import axios from 'axios';
import PropTypes from 'prop-types';

const PaymentForm = ({ username }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { token } = await stripe.createToken(cardElement);
      if (token) {
        const response = await axios.post('http://localhost:8080/stripe/charge', {
          cardNumber: token.card.last4,
          expiryMonth: token.card.exp_month,
          expiryYear: token.card.exp_year,
          cvc: '', // CVC is not returned by Stripe, use token only
          token: token.id,
          username,
        });

        if (response.data.isSuccess) {
          setSuccess(true);
        } else {
          setError(response.data.message);
        }
      } else {
        setError('Failed to create token');
      }
    } catch (error) {
      setError('An error occurred while processing your payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="amount">
            <FormLabel>Amount</FormLabel>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </FormControl>
          <FormControl id="card-element">
            <FormLabel>Card Details</FormLabel>
            <CardElement />
          </FormControl>
          {error && <Text color="red.500">{error}</Text>}
          {success && <Text color="green.500">Payment successful!</Text>}
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={loading}
            isDisabled={!stripe}
          >
            Pay
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

PaymentForm.propTypes = {
  username: PropTypes.string.isRequired,
};

export default PaymentForm;
