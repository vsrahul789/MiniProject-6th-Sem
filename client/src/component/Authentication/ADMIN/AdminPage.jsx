import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Grid,
  Heading,
  Button,
  Link,
  Container,
  useColorModeValue,
  Icon,
  Text,
  Flex,
} from '@chakra-ui/react';
import { AddIcon, ExternalLinkIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { FaUtensils, FaList, FaUser, FaCreditCard, FaClock, FaStore, FaHome } from 'react-icons/fa';

const AdminDashboard = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const boxBgColor = useColorModeValue('white', 'gray.700');
  const headingColor = useColorModeValue('gray.700', 'white');

  const DashboardButton = ({ to, icon, label, colorScheme }) => (
    <Button
      as={RouterLink}
      to={to}
      colorScheme={colorScheme}
      size="lg"
      height="100px"
      width="100%"
      variant="outline"
      borderWidth="2px"
      borderRadius="md"
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: 'lg',
      }}
    >
      <Flex direction="column" align="center" justify="center">
        <Icon as={icon} fontSize="2xl" mb={2} />
        <Text fontSize="sm" fontWeight="medium" textAlign="center">
          {label}
        </Text>
      </Flex>
    </Button>
  );

  return (
    <Box minHeight="100vh" bg={bgColor} py={10}>
      <Container maxW="container.xl">
        <Heading as="h1" size="2xl" textAlign="center" mb={10} color={headingColor}>
          Admin Dashboard
        </Heading>
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
          <DashboardButton to="/restaurants/add" icon={FaUtensils} label="Add Restaurant" colorScheme="blue" />
          <DashboardButton to="/restaurants/addMenuItem" icon={FaList} label="Add Menu Item" colorScheme="green" />
          <DashboardButton to="/update/user" icon={FaUser} label="Update User" colorScheme="red" />
          <DashboardButton to="/booking/slot" icon={FaClock} label="Add Slot" colorScheme="pink" />
          <DashboardButton to="/restaurants/getId" icon={FaStore} label="Update Restaurant" colorScheme="yellow" />
          <Button
            as={Link}
            href="https://dashboard.stripe.com"
            isExternal
            colorScheme="purple"
            size="lg"
            height="100px"
            width="100%"
            variant="outline"
            borderWidth="2px"
            borderRadius="md"
            transition="all 0.3s"
            _hover={{
              transform: 'translateY(-5px)',
              boxShadow: 'lg',
            }}
          >
            <Flex direction="column" align="center" justify="center">
              <Icon as={FaCreditCard} fontSize="2xl" mb={2} />
              <Text fontSize="sm" fontWeight="medium" textAlign="center">
                Stripe Dashboard
              </Text>
            </Flex>
          </Button>
        </Grid>
        <Flex justify="center" mt={10}>
          <Button
            as={RouterLink}
            to="/"
            colorScheme="gray"
            leftIcon={<FaHome />}
            size="lg"
          >
            Back to Home
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default AdminDashboard;