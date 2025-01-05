import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Select,
  HStack,
  useToast
} from '@chakra-ui/react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const categories = [
  'Personal', 'Career', 'Health', 'Financial', 
  'Education', 'Relationships', 'Travel', 'Other'
];

const priorities = [
  { value: 'high', color: 'red' },
  { value: 'medium', color: 'yellow' },
  { value: 'low', color: 'green' }
];

const AddGoalForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await addDoc(collection(db, 'goals'), {
        title,
        description,
        category,
        priority,
        completed: false,
        createdAt: new Date().toISOString()
      });

      setTitle('');
      setDescription('');
      setCategory('');
      setPriority('');
      
      toast({
        title: 'Goal added successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding goal:', error);
      toast({
        title: 'Error adding goal',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box 
      bg="rgba(255, 255, 255, 0.9)"
      p={6}
      borderRadius="2xl"
      boxShadow="xl"
      mb={6}
      backdropFilter="blur(10px)"
      border="1px solid"
      borderColor="gray.100"
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={6}>
          <FormControl>
            <FormLabel fontWeight="bold">Goal Title</FormLabel>
            <Input
              placeholder="What do you want to achieve?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              size="lg"
              bg="white"
              _hover={{
                borderColor: 'brand.300',
              }}
            />
          </FormControl>
          
          <HStack width="100%" spacing={4}>
            <FormControl>
              <FormLabel fontWeight="bold">Category</FormLabel>
              <Select
                placeholder="Select category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                size="lg"
                bg="white"
                _hover={{
                  borderColor: 'brand.300',
                }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Select>
            </FormControl>
            
            <FormControl>
              <FormLabel fontWeight="bold">Priority</FormLabel>
              <Select
                placeholder="Select priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
                size="lg"
                bg="white"
                _hover={{
                  borderColor: 'brand.300',
                }}
              >
                {priorities.map(({ value, color }) => (
                  <option key={value} value={value}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </option>
                ))}
              </Select>
            </FormControl>
          </HStack>

          <FormControl>
            <FormLabel fontWeight="bold">Description</FormLabel>
            <Textarea
              placeholder="Add more details about your goal..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              minH="120px"
              size="lg"
              bg="white"
              _hover={{
                borderColor: 'brand.300',
              }}
            />
          </FormControl>

          <Button 
            type="submit" 
            colorScheme="brand"
            width="full"
            isLoading={isLoading}
            loadingText="Adding Goal"
            size="lg"
            fontSize="md"
            py={7}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            transition="all 0.2s"
          >
            Add Goal
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddGoalForm; 