import { Box, Flex, Heading, Button, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const accentColor = "purple.500";
  const hoverBg = "purple.600";

  return (
    <Flex
      as="header"
      pos="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg={bgColor}
      color={textColor}
      boxShadow="0 2px 10px rgba(0,0,0,0.1)"
    >
      <Flex align="center" mr={5}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Heading
            as="h1"
            size="lg"
            letterSpacing="tight"
            fontFamily="'Advent Pro', sans-serif"
            fontWeight="bold"
          >
            <Box as="span" color={accentColor} fontStyle="italic">
              Dine
            </Box>
            Ease
          </Heading>
        </Link>
      </Flex>

      <Box>
        <Link to="/restaurants/list" style={{ textDecoration: "none", marginRight: "1rem" }}>
          <Button variant="ghost" _hover={{ bg: accentColor, color: "white" }}>
            Restaurants
          </Button>
        </Link>
        <Link to="/book" style={{ textDecoration: "none", marginRight: "1rem" }}>
          <Button variant="ghost" _hover={{ bg: accentColor, color: "white" }}>
            Book a Table
          </Button>
        </Link>
        <Link to="/login/user" style={{ textDecoration: "none" }}>
          <Button bg={accentColor} color="white" _hover={{ bg: hoverBg }}>
            Log In
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Header;