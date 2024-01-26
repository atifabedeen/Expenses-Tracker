import React, { useState, useEffect } from 'react';
import ExpenseEntryForm from '../components/ExpenseEntryForm';
import ExpenseList from '../components/ExpenseList';
import axios from "axios"
import { useNavigate} from "react-router-dom";
import { useAuthentication } from '../components/AuthenticationContext';
import Navbar from '../components/Navbar';




const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const nav = useNavigate();
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useAuthentication();

  const handleAddExpense = async(newExpense) => {
    const expenseWithId = { ...newExpense, user };
    //setExpenses([...expenses, expenseWithId]);
    await axios.post('http://localhost:5000/create', expenseWithId)
    .then(() => console.log('Expense Created'))
    .catch(err => {
      console.error(err);
    });
  };

  useEffect(() => {
    const getExpenses = async() => {
  
      try {
        const response = await axios.get("http://localhost:5000/all", { params: { userid: user, isAllowed: isAuthenticated } });
        setExpenses(response.data)
        // Assuming the response is an array of expenses
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    }

    getExpenses()

  }, [handleAddExpense])

  const handleExpenseClick = (selectedExpense) => {
    console.log('Selected Expense:', selectedExpense);
  };
  

  return (
    <div>
    <Navbar />
      <h1>Expense Tracker</h1>
      <ExpenseEntryForm onAddExpense={handleAddExpense} />
      <ExpenseList expenses={expenses} onExpenseClick={handleExpenseClick} />
      <button onClick={() => nav("/secret")}>Click here for full details on your expenses</button>
    </div>
  );
};



export default Home