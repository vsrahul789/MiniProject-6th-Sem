import {
  Button,
  useColorMode,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ColorModeSwitcher from "../ColorModeSwitcher";


const Header = () => {
  const { toggleColorMode } = useColorMode();
  // const modeText = useColorModeValue("Dark Mode", "Light Mode");

  return (
    <HStack
      pos={"fixed"}
      top={"4"}
      right={"4"}
      zIndex={"overlay"}
      spacing={4}
    >
      <Button colorScheme={"purple"}>
        <Link to="/login/user">Log In</Link>
      </Button>
      <Button onClick={toggleColorMode} colorScheme={"purple"}>
        <ColorModeSwitcher />
      </Button>
    </HStack>
  );
};

export default Header;
