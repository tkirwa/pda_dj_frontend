import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Pagination, Table } from 'semantic-ui-react';
import Loading from './Loading';

interface Income {
  id: number;
  name: string;
  category: string | null;
  amount: number;
  date: string;
}

const API_BASE_URL = 'http://127.0.0.1:8000';

const IncomeList: React.FC = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIncomes = incomes.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(incomes.length / itemsPerPage);

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
      .get<Income[]>(`${API_BASE_URL}/api/v1/incomes/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((response) => {
        setIncomes(response.data);
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
                Revenue :: Income Sources
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
            {currentIncomes.map((income) => (
              <Table.Row key={income.id}>
                <Table.Cell>{income.name}</Table.Cell>
                <Table.Cell>{income.category}</Table.Cell>
                <Table.Cell>{income.amount}</Table.Cell>
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

export default IncomeList;
