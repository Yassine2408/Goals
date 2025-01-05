import React, { useEffect, useState } from 'react';
import { 
  Box, 
  VStack, 
  Text, 
  Checkbox, 
  HStack,
  IconButton,
  useToast,
  Badge,
  Grid
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { collection, query, onSnapshot, deleteDoc, doc, updateDoc, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';

const GoalsList = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    // Create a query against the goals collection, ordered by creation time
    const q = query(
      collection(db, 'goals'),
      orderBy('createdAt', 'desc')
    );

    // Set up real-time listener
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const goalsData = [];
        querySnapshot.forEach((doc) => {
          goalsData.push({ id: doc.id, ...doc.data() });
        });
        console.log('Goals fetched:', goalsData); // Debug log
        setGoals(goalsData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching goals:", error);
        toast({
          title: 'Error fetching goals',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      }
    );

    // Cleanup subscription
    return () => unsubscribe();
  }, [toast]);

  const toggleGoal = async (id, completed) => {
    try {
      await updateDoc(doc(db, 'goals', id), {
        completed: !completed
      });
      toast({
        title: `Goal ${completed ? 'uncompleted' : 'completed'}!`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating goal:', error);
      toast({
        title: 'Error updating goal',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const deleteGoal = async (id) => {
    try {
      await deleteDoc(doc(db, 'goals', id));
      toast({
        title: 'Goal deleted',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting goal:', error);
      toast({
        title: 'Error deleting goal',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'red',
      medium: 'yellow',
      low: 'green'
    };
    return colors[priority] || 'gray';
  };

  if (loading) return <LoadingSpinner />;
  if (goals.length === 0) return <EmptyState />;

  return (
    <Grid 
      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} 
      gap={4} 
      width="100%"
    >
      {goals.map((goal) => (
        <Box
          key={goal.id}
          p={4}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          width="100%"
          transition="all 0.2s"
          _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
        >
          <VStack align="stretch" spacing={3}>
            <HStack justify="space-between">
              <Checkbox
                isChecked={goal.completed}
                onChange={() => toggleGoal(goal.id, goal.completed)}
                colorScheme="purple"
              />
              <HStack>
                <Badge colorScheme={getPriorityColor(goal.priority)}>
                  {goal.priority}
                </Badge>
                <Badge colorScheme="purple">{goal.category}</Badge>
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={() => deleteGoal(goal.id)}
                  colorScheme="red"
                  variant="ghost"
                  size="sm"
                  aria-label="Delete goal"
                />
              </HStack>
            </HStack>

            <Box pl={6}>
              <Text
                fontSize="lg"
                fontWeight="semibold"
                textDecoration={goal.completed ? 'line-through' : 'none'}
                color={goal.completed ? 'gray.500' : 'black'}
              >
                {goal.title}
              </Text>
              {goal.description && (
                <Text color="gray.600" fontSize="md" mt={1}>
                  {goal.description}
                </Text>
              )}
            </Box>
          </VStack>
        </Box>
      ))}
    </Grid>
  );
};

export default GoalsList; 