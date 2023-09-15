import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Button, Pagination, Table } from "semantic-ui-react";
import Loading from "./Loading";
import { API_BASE_URL } from "./api-data-service";
import EditExpenseModal from "../Modals/EditExpenseModal";

interface Expense {
  id: number;
  name: string;
  category: string | undefined;
  amount: number;
  date: string;
}

const apiBaseURL = API_BASE_URL;

const ExpenseList: React.FC = () => {
  // Inside the ExpenseList component
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

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
      onPageChange={(e, { activePage }) =>
        handlePageChange(activePage as number)
      }
    />
  );

  // Function to open the edit modal
  const openEditExpenseModal = (expense: Expense) => {
    setSelectedExpense(expense);
    setEditModalOpen(true);
  };

  // Function to close the edit modal
  const closeEditExpenseModal = () => {
    setSelectedExpense(null);
    setEditModalOpen(false);
  };

    // Function to update the expenses list when an expense is updated
    const updateExpensesList = (updatedExpense: any) => {
      // Find the index of the updated expense in the expenses list
      const expenseIndex = expenses.findIndex((expense) => expense.id === updatedExpense.id);
  
      if (expenseIndex !== -1) {
        // If the expense is found in the list, update it
        const updatedExpenses = [...expenses];
        updatedExpenses[expenseIndex] = updatedExpense;
        setExpenses(updatedExpenses);
      }
  
      // Close the Edit Expense Modal
      closeEditExpenseModal();
    };


  useEffect(() => {
    const authToken =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    axios
      .get<Expense[]>(`${apiBaseURL}/api/v1/expenses/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((response) => {
        setExpenses(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
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
              <Table.HeaderCell
                colSpan="4"
                style={{
                  backgroundColor: "#1B67AA",
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
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
                    style={{ color: "#FFC300" }}
                    onClick={() => openEditExpenseModal(expense)}
                  >
                    <Icon name="edit" />
                  </Button>
                  <Button
                    style={{
                      color: "#C70039",
                      cursor: "pointer",
                    }}
                  >
                    <Icon name="trash alternate outline" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
      {/* Edit Expense Modal) */}
      <EditExpenseModal
        expenseId={selectedExpense?.id || 0} // Pass the selected expense ID
        isOpen={editModalOpen}
        onClose={closeEditExpenseModal}
        onUpdate={updateExpensesList}
      />
      {paginationControls}
    </>
  );
};

export default ExpenseList;
