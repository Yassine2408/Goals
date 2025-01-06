import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState({ title: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'goals'));
      const goalsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setGoals(goalsData);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && currentGoal.id) {
        await updateDoc(doc(db, 'goals', currentGoal.id), {
          title: currentGoal.title,
          description: currentGoal.description
        });
      } else {
        await addDoc(collection(db, 'goals'), {
          title: currentGoal.title,
          description: currentGoal.description,
          userId: auth.currentUser.uid
        });
      }
      setIsModalOpen(false);
      setCurrentGoal({ title: '', description: '' });
      setIsEditing(false);
      fetchGoals();
    } catch (error) {
      console.error("Error saving goal:", error);
    }
  };

  const handleEdit = (goal) => {
    setCurrentGoal(goal);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (goalId) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await deleteDoc(doc(db, 'goals', goalId));
        fetchGoals();
      } catch (error) {
        console.error("Error deleting goal:", error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Your Goals Dashboard</h1>
        
        <div className="goals-section">
          <h2>Your Goals</h2>
          <div className="goals-grid">
            {goals.map(goal => (
              <div key={goal.id} className="goal-card">
                <h3>{goal.title}</h3>
                <p>{goal.description}</p>
                <div className="goal-buttons">
                  <button className="edit-btn" onClick={() => handleEdit(goal)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(goal.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          <button className="add-goal-btn" onClick={() => {
            setIsEditing(false);
            setCurrentGoal({ title: '', description: '' });
            setIsModalOpen(true);
          }}>Add New Goal</button>
        </div>

        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isEditing ? 'Edit Goal' : 'Add New Goal'}</h2>
            <form onSubmit={handleAddGoal}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={currentGoal.title}
                  onChange={(e) => setCurrentGoal({...currentGoal, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={currentGoal.description}
                  onChange={(e) => setCurrentGoal({...currentGoal, description: e.target.value})}
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="save-btn">
                  {isEditing ? 'Save Changes' : 'Add Goal'}
                </button>
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home; 