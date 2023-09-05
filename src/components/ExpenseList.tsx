import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Modal } from 'semantic-ui-react';
import EditExpense from './EditExpense'; // Your modal component


interface Expense {
    id: number; // You can replace the type with the actual type of the id field
    name: string;
    category: string | null; // Define it as an array of strings or null
    amount: number;
    date: string; // You can use a more specific type like Date if needed
    // user: User | null;
  }

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const openEditModal = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedExpense(null);
  };

  const handleSaveExpense = () => {
    // Handle saving the expense here
    // You can make an API call or update the data locally
    // After saving, close the modal
    closeEditModal();
  };

  const centerTextStyles = {
    textAlign: 'center', // Center the text horizontally
  };


  useEffect(() => {
    // Make an API request to fetch expenses
    const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

    axios
      .get<Expense[]>('http://127.0.0.1:8000/api/v1/expenses/', {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error);
      });
  }, []);

  return (
    <>
        <Table inverted color="blue">
        <Table.Header>
            <Table.Row>
            <Table.HeaderCell colSpan="4" style={centerTextStyles}>
                <Button>Add expense</Button>
            </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Edit/Delete</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {expenses.map((expense) => (
                <Table.Row key={expense.id}>
                <Table.Cell>{expense.name}</Table.Cell>
                <Table.Cell>{expense.category}</Table.Cell>
                <Table.Cell>{expense.amount}</Table.Cell>
                <Table.Cell>
                    <Button onClick={() => openEditModal(expense)}>Edit</Button>
                    <Button>Delete</Button>
                </Table.Cell>
                </Table.Row>
            ))}
            </Table.Body>
        </Table>
      {/* Edit Expense Modal */}
      <Modal open={isEditModalOpen} onClose={closeEditModal}>
        <EditExpense
          expense={selectedExpense}
          open={isEditModalOpen} // Pass the open state as a prop
          onSave={handleSaveExpense}
          onClose={closeEditModal}
        />
      </Modal>
    </>
  );
};

export default ExpenseList;
