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

const Login = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: 'Login successful!',
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
        <Heading size="lg">Login</Heading>
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
              Login
            </Button>
          </VStack>
        </form>
        <Text>
          Don't have an account?{' '}
          <Button 
            variant="link" 
            onClick={onToggle} 
            colorScheme="brand"
            _hover={{
              textDecoration: 'underline',
            }}
          >
            Sign Up
          </Button>
        </Text>
      </VStack>
    </Box>
  );
};

export default Login; 