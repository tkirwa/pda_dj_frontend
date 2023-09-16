import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Button, Pagination, Table, Modal } from "semantic-ui-react";
import Loading from "./Loading";
import { API_BASE_URL } from "../helpers/api-data-service";
import EditIncomeModal from "../Modals/EditIncomeModal";

interface Income {
  id: number;
  name: string;
  category: string | null;
  amount: number;
  date: string;
}

const apiBaseURL = API_BASE_URL;

const IncomeList: React.FC = () => {
  // Inside the ExpenseList component
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);

  // Initialize delete Modal - open & close Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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
      onPageChange={(e, { activePage }) =>
        handlePageChange(activePage as number)
      }
    />
  );

  // Function to open the edit modal
  const openEditIncomeModal = (income: Income) => {
    setSelectedIncome(income);
    setEditModalOpen(true);
  };

  // Function to close the edit modal
  const closeEditIncomeModal = () => {
    setSelectedIncome(null);
    setEditModalOpen(false);
  };

  // Function to open the delete modal
  const openDeleteIncomeModal = (income: Income) => {
    setSelectedIncome(income);
    setDeleteModalOpen(true);
  };

  // Function to close the delete modal
  const closeDeleteIncomeModal = () => {
    setSelectedIncome(null);
    setDeleteModalOpen(false);
  };

  // Function to update the incomes list when an income is updated
  const updateIncomesList = (updatedIncome: any) => {
    // Find the index of the updated expense in the incomes list
    const incomeIndex = incomes.findIndex(
      (income) => income.id === updatedIncome.id
    );

    if (incomeIndex !== -1) {
      // If the income is found in the list, update it
      const updatedIncomes = [...incomes];
      updatedIncomes[incomeIndex] = updatedIncome;
      setIncomes(updatedIncomes);
    }

    // Close the Edit Income Modal
    closeEditIncomeModal();
  };

  useEffect(() => {
    const authToken =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    axios
      .get<Income[]>(`${apiBaseURL}/api/v1/incomes/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((response) => {
        setIncomes(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
        setIsLoading(false);
      });
  }, []);

  // Function to handle income deletion
  const handleDeleteIncome = () => {
    // Perform the delete action (e.g., send a request to the server)
    // You can use axios or another method to delete the income
    // After successful deletion, close the modal and update the incomes list
    const incomeId = selectedIncome?.id;
    if (incomeId) {
      const authToken =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");

      // Send a delete request with the Authorization header
      axios
        .delete(`${apiBaseURL}/api/v1/incomes/${incomeId}`, {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        })
        .then(() => {
          // Remove the deleted income from the list
          const updatedIncomes = incomes.filter(
            (income) => income.id !== incomeId
          );
          setIncomes(updatedIncomes);
          // Close the modal
          closeDeleteIncomeModal();
        })
        .catch((error) => {
          console.error("Error deleting income:", error);
          // Handle error if needed
        });
    }
  };

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
                    style={{ color: "#FFC300" }}
                    onClick={() => openEditIncomeModal(income)}
                  >
                    <Icon name="edit" />
                  </Button>
                  <Button
                    style={{
                      color: "#C70039",
                      cursor: "pointer",
                    }}
                    onClick={() => openDeleteIncomeModal(income)}
                  >
                    <Icon name="trash alternate outline" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
      {/* Edit Income Modal) */}
      <EditIncomeModal
        incomeId={selectedIncome?.id || 0} // Pass the selected income ID
        isOpen={editModalOpen}
        onClose={closeEditIncomeModal}
        onUpdate={updateIncomesList}
      />
      {/* Delete Expense Modal */}
      <Modal
        open={deleteModalOpen}
        onClose={closeDeleteIncomeModal}
        size="mini"
      >
        <Modal.Header>Delete Income</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this income?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={handleDeleteIncome}>
            Yes
          </Button>
          <Button onClick={closeDeleteIncomeModal}>No</Button>
        </Modal.Actions>
      </Modal>
      {paginationControls}
    </>
  );
};

export default IncomeList;
