import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  VStack,
  Container,
  InputGroup,
  InputRightElement,
  IconButton,
  Spinner,
  Heading,
  useColorModeValue,
  Text,
  Flex,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, EditIcon } from "@chakra-ui/icons";

const UserProfileForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const boxBgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.200");

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      toast.error("No JWT token found. Please log in.");
      return;
    }

    axios
      .get("http://localhost:8080/user/profile", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setUsername(response.data.username);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        toast.error("Error fetching user profile");
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      toast.error("No JWT token found. Please log in.");
      return;
    }

    const updateData = {};
    if (username) updateData.username = username;
    if (password) updateData.password = password;

    axios
      .put("http://localhost:8080/user/update/profile", updateData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        console.log("Profile updated successfully:", response.data.username);
        toast.success("Profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        toast.error("Error updating profile");
      });
  };

  if (loading) {
    return (
      <Flex minHeight="100vh" alignItems="center" justifyContent="center" bg={bgColor}>
        <Spinner size="xl" color="purple.500" thickness="4px" />
      </Flex>
    );
  }

  return (
    <Box bg={bgColor} minH="100vh" py={16}>
      <Container maxW="md">
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={8}
          bg={boxBgColor}
          boxShadow="lg"
          borderColor={borderColor}
        >
          <VStack spacing={8} align="stretch">
            <Heading as="h2" size="xl" textAlign="center" color="purple.500">
              Update Profile
            </Heading>
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <FormControl id="username" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    size="lg"
                    bg={useColorModeValue("gray.100", "gray.700")}
                    border="none"
                    _focus={{
                      bg: useColorModeValue("gray.200", "gray.600"),
                      boxShadow: "outline",
                    }}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size="lg">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      bg={useColorModeValue("gray.100", "gray.700")}
                      border="none"
                      _focus={{
                        bg: useColorModeValue("gray.200", "gray.600"),
                        boxShadow: "outline",
                      }}
                    />
                    <InputRightElement>
                      <IconButton
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="purple"
                  size="lg"
                  width="full"
                  leftIcon={<EditIcon />}
                  isLoading={loading}
                  loadingText="Updating..."
                >
                  Update Profile
                </Button>
              </VStack>
            </form>
          </VStack>
        </Box>
        <Text mt={4} textAlign="center" color={textColor}>
          Need to make changes? Update your profile information above.
        </Text>
      </Container>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Box>
  );
};

export default UserProfileForm;