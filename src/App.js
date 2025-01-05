import React, { useState } from 'react';
import { ChakraProvider, Box, Container, useColorModeValue } from '@chakra-ui/react';
import Header from './components/Header';
import GoalsList from './components/GoalsList';
import AddGoalForm from './components/AddGoalForm';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import theme from './theme';

function MainContent() {
  const { currentUser, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!currentUser) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minH="80vh"
      >
        {showLogin ? (
          <Login onToggle={() => setShowLogin(false)} />
        ) : (
          <SignUp onToggle={() => setShowLogin(true)} />
        )}
      </Box>
    );
  }

  return (
    <>
      <Header onLogout={handleLogout} />
      <Box 
        backdropFilter="blur(10px)"
        borderRadius="2xl"
        bg="rgba(255, 255, 255, 0.1)"
        p={6}
        boxShadow="xl"
      >
        <AddGoalForm />
        <GoalsList />
      </Box>
    </>
  );
}

function App() {
  const bgGradient = useColorModeValue(
    'linear(to-br, purple.600, pink.500, orange.400)',
    'linear(to-br, purple.900, pink.800, orange.700)'
  );

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Box 
          bgGradient={bgGradient}
          minH="100vh"
          py={8}
          px={4}
          backgroundAttachment="fixed"
        >
          <Container 
            maxW="container.lg"
            position="relative"
            zIndex={1}
          >
            <MainContent />
          </Container>
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgImage="url('data:image/svg+xml,...')"
            opacity={0.1}
            zIndex={0}
          />
        </Box>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App; 