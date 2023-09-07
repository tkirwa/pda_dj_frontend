import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Pagination, Table } from 'semantic-ui-react';
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

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExpenses = expenses.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const paginationControls = (
    <Pagination
      activePage={currentPage}
      totalPages={totalPages}
      onPageChange={(e, { activePage }) => handlePageChange(activePage as number)}
    />
  );
  
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


  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Table inverted color="blue">
          <Table.Header>
            <Table.Row>
            <Table.HeaderCell colSpan="4" style={{ backgroundColor: '#1B67AA', color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                Expenditure :: Expense Sources
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
            {currentExpenses.map((expense) => (
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
      {paginationControls}
    </>
  );
};

export default ExpenseList;
