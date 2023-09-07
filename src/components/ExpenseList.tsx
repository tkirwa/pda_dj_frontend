import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'semantic-ui-react';
import AddExpenseModal from './AddExpenseModal';
import Loading from './Loading';

interface Expense {
  id: number;
  name: string;
  category: string | null;
  amount: number;
  date: string;
}

const API_BASE_URL = 'http://127.0.0.1:8000';

const ExpenseList: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

  const centerTextStyles = {
    textAlign: 'center',
  };

  useEffect(() => {
    const authToken =
      localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

    axios
      .get<Expense[]>(`${API_BASE_URL}/api/v1/expenses/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((response) => {
        setExpenses(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error);
        setIsLoading(false);
      });
  }, []);

  // Function to open the modal directly on button click
  const openAddExpenseModal = () => {
    setIsAddExpenseModalOpen(true);
  };

  // Function to close the modal
  const closeAddExpenseModal = () => {
    setIsAddExpenseModalOpen(false);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Table inverted color="blue">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="4" style={centerTextStyles}>
                {/* Open the AddExpenseModal directly on button click */}
                <Button
                  style={{ color: '#28CE45' }}
                  onClick={openAddExpenseModal}
                >
                  Add Expense
                </Button>
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
                  <Button
                    style={{ color: '#FFC300' }}
                  >
                    Edit
                  </Button>
                  <Button
                    style={{
                      color: '#C70039',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
      {/* Render the AddExpenseModal component */}
      {isAddExpenseModalOpen && (
        <AddExpenseModal onClose={closeAddExpenseModal} />
      )}
    </>
  );
};

export default ExpenseList;
