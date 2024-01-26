import React from 'react';

const ExpenseList = ({ expenses, onExpenseClick}) => {
  //expenseSummary()
  return (
    <div>
      <h2>Recent Summary</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id} onClick={() => onExpenseClick(expense)}>
            {expense.amount} - {expense.date} - {expense.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
