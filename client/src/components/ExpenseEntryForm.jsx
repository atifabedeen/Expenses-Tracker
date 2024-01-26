import React, { useState } from 'react';

const ExpenseEntryForm = ({ onAddExpense }) => {
  const [expenseData, setExpenseData] = useState({
    amount: '',
    date: '',
    category: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({ ...expenseData, [name]: value });
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    onAddExpense(expenseData);
    setExpenseData({
      amount: '',
      date: '',
      category: '',
      description: '',
    });
  };

  return (
    <form>
      <label>
        Amount:
        <input type="text" name="amount" value={expenseData.amount} onChange={handleInputChange} />
      </label>

      <label>
        Date:
        <input type="date" name="date" value={expenseData.date} onChange={handleInputChange} />
      </label>

      <label>
        Category:
        <input type="text" name="category" value={expenseData.category} onChange={handleInputChange} />
      </label>

      <label>
        Description:
        <textarea name="description" value={expenseData.description} onChange={handleInputChange} />
      </label>

      <button type="submit" onClick={handleAddExpense}>
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseEntryForm;
