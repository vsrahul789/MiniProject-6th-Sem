// src/components/Footer.jsx
import { Box, Flex, Link, Text, IconButton, VStack, HStack, Divider, Stack } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box bg="gray.900" color="gray.200" py={8} px={4}>
      <Flex direction={{ base: "column", md: "row" }} justify="space-between" maxW="1200px" mx="auto" mb={8}>
        <Box mb={{ base: 8, md: 0 }}>
          <Text fontSize="lg" fontWeight="bold" mb={4}>Our Services</Text>
          <VStack align="start">
            <Link as={RouterLink} to="/" color="purple.300">Home</Link>
            <Link as={RouterLink} to="/restaurants/list" color="purple.300">Our Restaurants</Link>
            <Link as={RouterLink} to="/restaurants/nearby" color="purple.300">Restaurants Nearby</Link>
            <Link as={RouterLink} to="/booking/restaurants/select" color="purple.300">Book a Table</Link>
            <Link as={RouterLink} to="/login/admin" color="purple.300">Admin Login</Link>
          </VStack>
        </Box>

        <Box mb={{ base: 8, md: 0 }}>
          <Text fontSize="lg" fontWeight="bold" mb={4}>Connect with us</Text>
          <HStack spacing={4}>
            <IconButton
              as="a"
              href="https://www.facebook.com"
              target="_blank"
              aria-label="Facebook"
              icon={<FaFacebook />}
              bg="gray.700"
              _hover={{ bg: "purple.500" }}
              color="white"
              size="lg"
              isRound
            />
            <IconButton
              as="a"
              href="https://www.instagram.com"
              target="_blank"
              aria-label="Instagram"
              icon={<FaInstagram />}
              bg="gray.700"
              _hover={{ bg: "purple.500" }}
              color="white"
              size="lg"
              isRound
            />
            <IconButton
              as="a"
              href="https://www.google.com"
              target="_blank"
              aria-label="Google"
              icon={<FaGoogle />}
              bg="gray.700"
              _hover={{ bg: "purple.500" }}
              color="white"
              size="lg"
              isRound
            />
            <IconButton
              as="a"
              href="https://www.x.com"
              target="_blank"
              aria-label="Twitter"
              icon={<FaXTwitter />}
              bg="gray.700"
              _hover={{ bg: "purple.500" }}
              color="white"
              size="lg"
              isRound
            />
          </HStack>
        </Box>

        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4}>Contact Us</Text>
          <VStack align="start">
            <Link as={RouterLink} to="/contact" color="purple.300">Contact Form</Link>
            <Link as={RouterLink} to="/support" color="purple.300">Support</Link>
          </VStack>
        </Box>
      </Flex>

      <Divider borderColor="gray.700" />

      <Stack direction={{ base: "column", md: "row" }} justify="space-between" mt={8} align="center">
        <Text>&copy; {new Date().getFullYear()} DineEase. All rights reserved.</Text>
        <HStack spacing={4}>
          <Link as={RouterLink} to="/privacy-policy" color="gray.400">Privacy Policy</Link>
          <Link as={RouterLink} to="/terms-of-service" color="gray.400">Terms of Service</Link>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
