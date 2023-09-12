import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Button, Pagination, Table, Modal, Form } from "semantic-ui-react";
import Loading from "./Loading";
import { API_BASE_URL } from "./api-data-service";

interface Expense {
  id: number;
  name: string;
  category: string | null;
  amount: number;
  date: string;
}

const apiBaseURL = API_BASE_URL;

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
      onPageChange={(e, { activePage }) =>
        handlePageChange(activePage as number)
      }
    />
  );

  // Open Edit Modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const openEditExpenseModal = (expense: Expense) => {
    setSelectedExpense(expense);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedExpense(null);
    setEditModalOpen(false);
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
                    onClick={() => openEditExpenseModal(expense)}>
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

      {/* Edit Expense Modal */}
      <Modal
  open={editModalOpen}
  onClose={closeEditModal}
  size="tiny"
  centered={false}
>
  <Modal.Header>Edit Expense</Modal.Header>
  <Modal.Content>
    <Form>
      {/* Input fields for editing expense details */}
      <Form.Field>
        <label>Name</label>
        <input
          type="text"
          value={selectedExpense ? selectedExpense.name : ''}
          // onChange={(e) => handleNameChange(e.target.value)}
        />
      </Form.Field>
      {/* Add similar fields for other expense details */}
    </Form>
  </Modal.Content>
  <Modal.Actions>
    <Button color="red" onClick={closeEditModal}>
      Cancel
    </Button>
    <Button color="blue"
    // onClick={handleSave}
    >
      Save
    </Button>
  </Modal.Actions>
</Modal>

      {paginationControls}
    </>
  );
};

export default ExpenseList;
