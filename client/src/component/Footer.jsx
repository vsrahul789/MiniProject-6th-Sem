import { Box, Flex, Link, Text, IconButton, VStack, Divider, Container } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box bg="gray.900" color="gray.200" py={10}>
      <Container maxW="1200px">
        <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="start" wrap="wrap">
          <VStack align="start" mb={{ base: 8, md: 0 }} minW="200px">
            <Text fontSize="xl" fontWeight="bold" mb={4} color="white">Our Services</Text>
            <Link as={RouterLink} to="/" color="gray.400" _hover={{ color: "purple.300" }}>Home</Link>
            <Link as={RouterLink} to="/restaurants/list" color="gray.400" _hover={{ color: "purple.300" }}>Our Restaurants</Link>
            <Link as={RouterLink} to="/restaurants/nearby" color="gray.400" _hover={{ color: "purple.300" }}>Restaurants Nearby</Link>
            <Link as={RouterLink} to="/booking/restaurants/select" color="gray.400" _hover={{ color: "purple.300" }}>Book a Table</Link>
            <Link as={RouterLink} to="/login/admin" color="gray.400" _hover={{ color: "purple.300" }}>Admin Login</Link>
          </VStack>

          <VStack align="start" mb={{ base: 8, md: 0 }} minW="200px">
            <Text fontSize="xl" fontWeight="bold" mb={4} color="white">Connect with us</Text>
            <Flex>
              <IconButton
                as="a"
                href="https://www.facebook.com"
                target="_blank"
                aria-label="Facebook"
                icon={<FaFacebook />}
                mr={2}
                bg="whiteAlpha.200"
                color="white"
                _hover={{ bg: "purple.500" }}
              />
              <IconButton
                as="a"
                href="https://www.instagram.com"
                target="_blank"
                aria-label="Instagram"
                icon={<FaInstagram />}
                mr={2}
                bg="whiteAlpha.200"
                color="white"
                _hover={{ bg: "purple.500" }}
              />
              <IconButton
                as="a"
                href="https://www.google.com"
                target="_blank"
                aria-label="Google"
                icon={<FaGoogle />}
                mr={2}
                bg="whiteAlpha.200"
                color="white"
                _hover={{ bg: "purple.500" }}
              />
              <IconButton
                as="a"
                href="https://www.x.com"
                target="_blank"
                aria-label="Twitter"
                icon={<FaXTwitter />}
                bg="whiteAlpha.200"
                color="white"
                _hover={{ bg: "purple.500" }}
              />
            </Flex>
          </VStack>

          <VStack align="start" mb={{ base: 8, md: 0 }} minW="200px">
            <Text fontSize="xl" fontWeight="bold" mb={4} color="white">Contact Us</Text>
            <Link href="/contact" color="gray.400" _hover={{ color: "purple.300" }}>Contact Form</Link>
            <Link href="/support" color="gray.400" _hover={{ color: "purple.300" }}>Support</Link>
          </VStack>
        </Flex>

        <Divider my={8} borderColor="gray.700" />

        <Flex justify="space-between" align="center" wrap="wrap">
          <Text>&copy; {new Date().getFullYear()} DineEase. All rights reserved.</Text>
          <Flex mt={{ base: 4, md: 0 }}>
            <Link href="/privacy" mr={4} color="gray.400" _hover={{ color: "purple.300" }}>Privacy Policy</Link>
            <Link href="/terms" color="gray.400" _hover={{ color: "purple.300" }}>Terms of Service</Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;