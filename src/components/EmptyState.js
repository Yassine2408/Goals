import React from 'react';
import { Box, Text, Icon, VStack } from '@chakra-ui/react';
import { FaClipboardList } from 'react-icons/fa';

const EmptyState = () => {
  return (
    <Box 
      textAlign="center" 
      py={10} 
      px={6} 
      bg="white" 
      borderRadius="lg"
      boxShadow="md"
    >
      <VStack spacing={3}>
        <Icon as={FaClipboardList} w={10} h={10} color="purple.500" />
        <Text color="gray.600" fontSize="lg">
          No goals added yet. Start adding your 2025 goals!
        </Text>
      </VStack>
    </Box>
  );
};

export default EmptyState; 