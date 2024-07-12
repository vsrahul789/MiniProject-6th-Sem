import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Heading,
  Text,
} from "@chakra-ui/react";

const BookingForm = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [slots, setSlots] = useState([]);
  const [slotId, setSlotId] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    axios
      .get("http://localhost:8080/restaurants/getRestaurant", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  // Global declaration
  const token = localStorage.getItem("jwtToken");

  const handleRestaurantChange = (e) => {
    const selectedRestaurantId = e.target.value;
    setRestaurantId(selectedRestaurantId);

    // Fetch available slots for the selected restaurant
    axios
      .get(`http://localhost:8080/api/bookingSlots/${selectedRestaurantId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setSlots(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/bookings/addBooking",
        {
          restaurantId,
          bookingDate,
          numberOfPeople,
          slotId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setSuccessMessage("Booking successful!");
    } catch (error) {
      setError("Booking failed. Please try again.");
    }
  };

  return (
    <Box p={5}>
      <Heading as="h1" mb={5}>
        Book a Table
      </Heading>
      {error && <Text color="red.500">{error}</Text>}
      {successMessage && <Text color="green.500">{successMessage}</Text>}
      <form onSubmit={handleSubmit}>
        <FormControl id="restaurant" mb={4} isRequired>
          <FormLabel>Restaurant</FormLabel>
          <Select
            placeholder="Select restaurant"
            value={restaurantId}
            onChange={handleRestaurantChange}
          >
            {restaurants.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.restaurantName}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl id="bookingDate" mb={4} isRequired>
          <FormLabel>Booking Date</FormLabel>
          <Input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
          />
        </FormControl>

        <FormControl id="numberOfPeople" mb={4} isRequired>
          <FormLabel>Number of People</FormLabel>
          <Input
            type="number"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
          />
        </FormControl>

        <FormControl id="slotId" mb={4} isRequired>
          <FormLabel>Slot</FormLabel>
          <Select
            placeholder="Select slot"
            value={slotId}
            onChange={(e) => setSlotId(e.target.value)}
          >
            {slots.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {slot.startTime} - {slot.endTime}
              </option>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" colorScheme="teal">
          Book Slot
        </Button>
      </form>
    </Box>
  );
};

export default BookingForm;