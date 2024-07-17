// src/components/Footer.jsx
import { Box, Flex, Link, Text, IconButton } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaGoogle} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box bg="gray.800" color="white" py={6}>
      <Flex justify="space-between" align="center" px={4} maxW="1200px" mx="auto">
        <Box>
          <Text fontSize="lg" fontWeight="bold">Our Features</Text>
          <Flex direction="column" mt={2}>
          <Link as={RouterLink} to="/" color="teal.300">
             Home
           </Link>
           <Link as={RouterLink} to="/restaurants/list" color="teal.300">
             Our Restaurants
           </Link>
           <Link as={RouterLink} to="/restaurants/nearby" color="teal.300">
             Restaurants Nearby
           </Link>
           <Link as={RouterLink} to="/booking/restaurants/select" color="teal.300">
             Book a Table
           </Link>
           <Link as={RouterLink} to="/login/admin" color="teal.300">
             Admin Login
           </Link>
          </Flex>
        </Box>
        <Box textAlign="center">
          <Text fontSize="lg" fontWeight="bold">Connect with us</Text>
          <Flex justify="center" mt={2}>
            <IconButton
              as="a"
              href="https://www.facebook.com"
              target="_blank"
              aria-label="Facebook"
              icon={<FaFacebook />}
              mx={1}
              bg="gray.600"
              _hover={{ bg: "gray.500" }}
            />
            <IconButton
              as="a"
              href="https://www.instagram.com"
              target="_blank"
              aria-label="Instagram"
              icon={<FaInstagram />}
              mx={1}
              bg="gray.600"
              _hover={{ bg: "gray.500" }}
            />
            <IconButton
              as="a"
              href="https://www.google.com"
              target="_blank"
              aria-label="Google"
              icon={<FaGoogle />}
              mx={1}
              bg="gray.600"
              _hover={{ bg: "gray.500" }}
            />
            <IconButton
              as="a"
              href="https://www.x.com"
              target="_blank"
              aria-label="Twitter"
              icon={<FaXTwitter />}
              mx={1}
              bg="gray.600"
              _hover={{ bg: "gray.500" }}
            />
          </Flex>
        </Box>
        <Box>
          <Text fontSize="lg" fontWeight="bold">Contact Us</Text>
          <Flex direction="column" mt={2}>
            <Link href="/contact" mt={1}>Contact Form</Link>
            <Link href="/support" mt={1}>Support</Link>
          </Flex>
        </Box>
      </Flex>
      <Box textAlign="center" mt={6}>
        <Text>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</Text>
      </Box>
    </Box>
  );
};

export default Footer;
