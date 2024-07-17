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
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const UserProfileForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div>Loading...</div>;

  return (
    <Container mt={16}>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6" mt="4">
        <VStack spacing="4">
          <form onSubmit={handleSubmit}>
            <VStack spacing="4">
              <h2>Update Profile</h2>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <IconButton
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button type="submit" colorScheme="purple" isDisabled={loading}>
                {loading ? <Spinner size="sm" /> : "Update Profile"}
              </Button>
            </VStack>
          </form>
          <ToastContainer />
        </VStack>
      </Box>
    </Container>
  );
};

export default UserProfileForm;
