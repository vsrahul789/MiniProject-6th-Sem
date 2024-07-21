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
  useToast,
  Heading,
  Container,
  InputGroup,
  InputLeftElement,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { FaDollarSign } from 'react-icons/fa';
import axios from 'axios';
import PropTypes from 'prop-types';

const PaymentForm = ({ username }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState('');
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

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
          cvc: '',
          token: token.id,
          username,
          amount: parseFloat(amount),
        });

        if (response.data.isSuccess) {
          setSuccess(true);
          toast({
            title: 'Payment Successful',
            description: 'Your payment was processed successfully.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
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
    <Container maxW="md" py={10}>
      <Box
        bg="white"
        p={8}
        borderRadius="xl"
        boxShadow="2xl"
        textAlign="center"
      >
        <Heading as="h2" size="xl" mb={8} color="blue.600">
          Complete Your Payment
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={6} align="stretch">
            <FormControl id="amount">
              <FormLabel fontSize="lg">Amount</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaDollarSign color="gray.300" />
                </InputLeftElement>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  required
                  variant="filled"
                  size="lg"
                />
              </InputGroup>
            </FormControl>
            <FormControl id="card-element">
              <FormLabel fontSize="lg">Card Details</FormLabel>
              <Box
                border="1px"
                borderColor="gray.300"
                borderRadius="md"
                p={4}
                bg="gray.50"
              >
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
              </Box>
            </FormControl>
            {error && (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                <AlertTitle mr={2}>Payment Failed!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert status="success" borderRadius="md">
                <AlertIcon />
                <AlertTitle mr={2}>Payment Successful!</AlertTitle>
                <AlertDescription>Your transaction has been completed.</AlertDescription>
              </Alert>
            )}
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={loading}
              isDisabled={!stripe || loading}
              size="lg"
              height="56px"
              fontSize="lg"
              loadingText="Processing..."
            >
              {loading ? <Spinner size="sm" color="white" mr={3} /> : null}
              Pay Now
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

PaymentForm.propTypes = {
  username: PropTypes.string.isRequired,
};

export default PaymentForm;