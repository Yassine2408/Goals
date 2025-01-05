import React from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  Flex,
  useToast
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiLogOut } from 'react-icons/fi';

const Header = ({ onLogout }) => {
  const toast = useToast();

  const handleLogout = async () => {
    try {
      await onLogout();
      toast({
        title: "Logged out successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error logging out",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box 
      textAlign="center" 
      mb={10} 
      color="white" 
      as={motion.div}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Flex justify="flex-end" mb={4}>
        <Button
          onClick={handleLogout}
          colorScheme="whiteAlpha"
          size="sm"
          _hover={{ bg: 'whiteAlpha.300' }}
          leftIcon={<FiLogOut />}
        >
          Logout
        </Button>
      </Flex>
      <Heading 
        fontSize={{ base: "4xl", md: "6xl" }}
        fontWeight="bold"
        mb={4}
        textShadow="2px 2px 4px rgba(0,0,0,0.2)"
      >
        2025 Goals
      </Heading>
      <Text 
        fontSize={{ base: "lg", md: "xl" }}
        opacity={0.9}
      >
        Transform your dreams into reality
      </Text>
    </Box>
  );
};

export default Header; 