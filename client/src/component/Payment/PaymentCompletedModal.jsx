import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  Progress,
  VStack,
  Box,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const MotionBox = motion(Box);

const PaymentCompletedModal = ({ isOpen }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const accentColor = useColorModeValue("purple.500", "purple.300");

  return (
    <Modal isOpen={isOpen} onClose={() => {}} isCentered closeOnOverlayClick={false} size="md">
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent
        bg={bgColor}
        borderRadius="xl"
        boxShadow="xl"
        overflow="hidden"
      >
        <ModalBody p={0}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VStack spacing={6} py={10} px={6}>
              <Icon
                as={FaCheckCircle}
                w={20}
                h={20}
                color={accentColor}
                mb={2}
              />
              <Text
                fontSize="3xl"
                fontWeight="bold"
                color={textColor}
                textAlign="center"
              >
                Payment Completed
              </Text>
              <Text fontSize="lg" color={textColor} textAlign="center">
                Thank you for your purchase!
              </Text>
              <Box w="full" bg="gray.100" borderRadius="full" p={1}>
                <Text fontSize="bold" color="gray.600" mb={2} textAlign="center">
                  Redirecting to home page...
                </Text>
              </Box>
            </VStack>
          </MotionBox>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PaymentCompletedModal;