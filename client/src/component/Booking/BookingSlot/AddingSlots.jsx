import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
} from "@chakra-ui/react";

const AddingSlots = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [maxTables, setMaxTables] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.post(
        "http://localhost:8080/api/bookingSlots/add",
        {
          startTime,
          endTime,
          maxTables,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);

      if (response.status === 201) {
        setMessage("Booking slot created successfully!");
      } else {
        setMessage("Failed to create booking slot.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred during booking slot creation.");
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt={10}>
      <Heading as="h1" mb={6}>
        Create Booking Slot
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="startTime" mb={3}>
          <FormLabel>Start Time</FormLabel>
          <Input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="endTime" mb={3}>
          <FormLabel>End Time</FormLabel>
          <Input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </FormControl>
        <FormControl id="maxTables" mb={3}>
          <FormLabel>Max Tables</FormLabel>
          <Input
            type="number"
            value={maxTables}
            onChange={(e) => setMaxTables(e.target.value)}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" width="full">
          Create Booking Slot
        </Button>
      </form>
      {message && (
        <Text
          mt={4}
          color={message.includes("successfully") ? "green.500" : "red.500"}
        >
          {message}
        </Text>
      )}
    </Box>
  );
};

export default AddingSlots;
