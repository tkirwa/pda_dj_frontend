import React, { useState, useEffect } from "react";
import { Button, Form, Icon, Label, Modal, Dropdown } from "semantic-ui-react";
import axios from "axios";
import { API_BASE_URL } from "./api-data-service";

interface Props {
  editExpenseModalOpen: boolean;
  closeEditExpenseModal: () => void;
  selectedExpense: Expense | null;
  updateExpense: (expense: Expense) => void;
  authToken: string; // Add authentication token prop
}

interface Expense {
  id: number;
  name: string;
  category: string | null;
  amount: number;
  date: string;
}

const apiBaseURL = API_BASE_URL;

const EditExpenseModal: React.FC<Props> = ({
  editExpenseModalOpen,
  closeEditExpenseModal,
  selectedExpense,
  updateExpense,
  authToken,
}) => {
  const initialEditedExpense: Expense = {
    id: -1, // You can use a default value here
    name: "",
    category: null,
    amount: 0,
    date: "",
  };

  const [editedExpense, setEditedExpense] = useState<Expense>(
    selectedExpense || initialEditedExpense
  );
  const [expenseCategories, setExpenseCategories] = useState<any[]>([]); // State for expense categories

  // Function to fetch expense categories
  const fetchExpenseCategories = async () => {
    try {
      const response = await axios.get(
        `${apiBaseURL}/api/v1/expense-categories/`,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );

      if (response.data) {
        setExpenseCategories(response.data);
      }
    } catch (error) {
      console.error("Fetch Expense Categories error:", error);
      // Handle the fetch error, if needed
    }
  };

  useEffect(() => {
    // Define the fetchExpenseCategories function
    const fetchExpenseCategories = async () => {
      try {
        const response = await axios.get(
          `${apiBaseURL}/api/v1/expense-categories/`,
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        );

        if (response.data) {
          setExpenseCategories(response.data);
        }
      } catch (error) {
        console.error("Fetch Expense Categories error:", error);
        // Handle the fetch error, if needed
      }
    };

    // Fetch expense categories when the modal opens
    if (editExpenseModalOpen) {
      fetchExpenseCategories();
    }
  }, [editExpenseModalOpen, authToken, fetchExpenseCategories]); // Include fetchExpenseCategories in the dependency array


  const handleNameChange = (name: string) => {
    if (selectedExpense) {
      setEditedExpense({ ...editedExpense, name });
    }
  };

  const handleCategoryChange = (category: string) => {
    if (selectedExpense) {
      setEditedExpense({ ...editedExpense, category });
    }
  };

  const handleAmountChange = (amount: number) => {
    if (selectedExpense) {
      setEditedExpense({ ...editedExpense, amount });
    }
  };

  const handleDateChange = (date: string) => {
    if (selectedExpense) {
      setEditedExpense({ ...editedExpense, date });
    }
  };

  const handleSave = async () => {
    if (selectedExpense) {
      try {
        // Update the expense using an API call
        const response = await axios.put(
          `${apiBaseURL}/api/v1/expenses/${selectedExpense.id}/`,
          editedExpense,
          {
            headers: {
              Authorization: `Token ${authToken}`, // Include the authentication token in the headers
            },
          }
        );

        if (response.data) {
          // Update the expense in the parent component
          updateExpense(response.data);

          // Close the modal
          closeEditExpenseModal();
        }
      } catch (error) {
        console.error("Edit Expense error:", error);
        // Handle the edit expense error, if needed
      }
    }
  };

  return (
    <Modal
      open={editExpenseModalOpen}
      onClose={closeEditExpenseModal}
      // size="tiny"
      // centered={false}
    >
      <Modal.Header>
        <Label color="blue">
          <Icon name="edit" /> Edit Expense
        </Label>
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>
              <Icon name="pencil" /> Name
            </label>
            <input
              type="text"
              value={editedExpense.name}
              onChange={(e) => handleNameChange(e.target.value)} // Add onChange handler
            />
          </Form.Field>
          <Form.Field>
            <label>
              <Icon name="tag" /> Category
            </label>
            <Dropdown
              selection
              options={expenseCategories.map((category) => ({
                key: category.id,
                text: category.name,
                value: category.name,
              }))}
              value={editedExpense.category || ""}
              onChange={(e, { value }) => handleCategoryChange(value as string)} // Add onChange handler
            />
          </Form.Field>
          <Form.Field>
            <label>
              <Icon name="dollar sign" /> Amount
            </label>
            <input
              type="number"
              value={editedExpense.amount}
              onChange={(e) => handleAmountChange(Number(e.target.value))} // Add onChange handler
            />
          </Form.Field>
          <Form.Field>
            <label>
              <Icon name="calendar" /> Date
            </label>
            <input
              type="date"
              value={editedExpense.date}
              onChange={(e) => handleDateChange(e.target.value)} // Add onChange handler
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={closeEditExpenseModal}>
          Cancel
        </Button>
        <Button color="blue" onClick={handleSave}>
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditExpenseModal;
