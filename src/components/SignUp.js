import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  Heading
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

const SignUp = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return toast({
        title: 'Error',
        description: 'Passwords do not match',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    setLoading(true);
    
    try {
      await signup(email, password);
      toast({
        title: 'Account created successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <Box 
      bg="rgba(255, 255, 255, 0.9)"
      p={8}
      borderRadius="2xl"
      boxShadow="xl"
      backdropFilter="blur(10px)"
      border="1px solid"
      borderColor="gray.100"
      width="100%"
      maxW="400px"
    >
      <VStack spacing={6}>
        <Heading size="lg">Sign Up</Heading>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                size="lg"
                bg="white"
                _hover={{
                  borderColor: 'brand.300',
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                size="lg"
                bg="white"
                _hover={{
                  borderColor: 'brand.300',
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
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
              isLoading={loading}
              size="lg"
              fontSize="md"
              py={7}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
            >
              Sign Up
            </Button>
          </VStack>
        </form>
        <Text>
          Already have an account?{' '}
          <Button 
            variant="link" 
            onClick={onToggle} 
            colorScheme="brand"
            _hover={{
              textDecoration: 'underline',
            }}
          >
            Login
          </Button>
        </Text>
      </VStack>
    </Box>
  );
};

export default SignUp; 