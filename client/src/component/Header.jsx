import { Button, HStack, Box, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Flex
      pos={"absolute"}
      top={0}
      left={0}
      right={0}
      zIndex={1}
      p={4}
      justify={"space-between"}
      align={"center"}
    >
      <Box />
      <Link to="/" style={{ textDecoration: "none" }}>
        <Heading
          as="h1"
          size="lg"
          textAlign="center"
          color="white"
          fontFamily="'Advent Pro', sans-serif"
        >
          DineEase
        </Heading>
      </Link>
      <Box />
    </Flex>
  );
};

export default Header;
