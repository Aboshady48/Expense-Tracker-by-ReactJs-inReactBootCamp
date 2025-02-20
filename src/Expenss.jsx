import { useState } from "react";
import "./expenss.css";
function Expense() {
  const [expense, setExpense] = useState({
    description: "",
    amount: "",
  });

  const [expenseList, setExpensesList] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  // Fixed typo: changed 'nme' to 'name'
  function handleChange(e) {
    const { name, value } = e.target;
    setExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    const newExpense = {
      ...expense,
      id: Date.now(), // Add unique ID
      amount: Number(expense.amount), // Convert to number
    };

    setExpensesList((prev) => [...prev, newExpense]);
    setTotalExpense((prev) => prev + newExpense.amount);

    // Reset form with empty strings
    setExpense({
      description: "",
      amount: "",
    });
  }

  function handleDelete(id, amount) {
    setExpensesList((prev) => prev.filter((exp) => exp.id !== id));
    setTotalExpense((prev) => prev - amount);
  }
  

  return (
    <div className="container">
      <h1 className="header">Expense Tracker</h1>

      <form className="expense-form" onSubmit={handleOnSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={expense.description}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={expense.amount}
            onChange={handleChange}
          />
        </div>
        <button className="submit-btn" type="submit">
          Add Expense
        </button>
      </form>

      <ul className="expense-list">
        {expenseList.map((exp) => (
          <li className="expense-item" key={exp.id}>
            <div className="expense-details">
              <span>{exp.description}</span>
              <span>${exp.amount}</span>
            </div>
            <button
              className="delete-btn"
              onClick={() => handleDelete(exp.id, exp.amount)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h2 className="total-expense">Total Expense: ${totalExpense}</h2>
    </div>
  );
}

export default Expense;
