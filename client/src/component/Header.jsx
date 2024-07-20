import { useState, useEffect } from 'react';
import { Box, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlHeader = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        // If we are scrolling down, hide the header
        setShowHeader(false);
      } else {
        // If we are scrolling up, show the header
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlHeader);

      return () => {
        window.removeEventListener('scroll', controlHeader);
      };
    }
  }, [lastScrollY]);

  return (
    <Flex
      pos={"fixed"}
      top={showHeader ? 0 : '-100px'}  // Adjust the height of the header as needed
      left={0}
      right={0}
      zIndex={1}
      p={4}
      justify={"space-between"}
      align={"center"}
      transition={"top 0.3s"}
    >
      <Box />
      <Link to="/" style={{ textDecoration: "none" }}>
        <Heading
          as="h1"
          size="lg"
          textAlign="center"
          color="goldenrod"
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
