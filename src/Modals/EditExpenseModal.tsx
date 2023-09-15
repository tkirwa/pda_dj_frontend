import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Dropdown } from "semantic-ui-react";
import axios from "axios";
import { API_BASE_URL } from "../components/api-data-service";

interface Expense {
  id: number;
  name: string;
  category: string | undefined;
  amount: number;
  date: string;
}

interface EditExpenseModalProps {
  expenseId: number;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedExpense: Expense) => void;
}

const apiBaseURL = API_BASE_URL;

const EditExpenseModal: React.FC<EditExpenseModalProps> = ({
  expenseId,
  isOpen,
  onClose,
  onUpdate,
}) => {
  const [expenseCategories, setExpenseCategories] = useState<string[]>([]);

  const [formData, setFormData] = useState<Partial<Expense>>({
    name: "",
    category: "",
    amount: 0,
    date: "",
  });

  useEffect(() => {
    if (isOpen) {
      // Fetch the expense data for editing
      const authToken =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");

      axios
        .get<Expense>(`${apiBaseURL}/api/v1/expenses/${expenseId}/`, {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        })
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching expense data:", error);
        });
    }
  }, [isOpen, expenseId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateExpense = async () => {
    const authToken =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    try {
      const response = await axios.put<Expense>(
        `${apiBaseURL}/api/v1/expenses/${expenseId}/`,
        formData,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );

      onUpdate(response.data);

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  //Load Expense categories
  useEffect(() => {
    const authToken =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    axios
      .get<string[]>(`${apiBaseURL}/api/v1/expense-categories/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((response) => {
        // Extract category names from the API response
        const categories = response.data.map(
          (categoryData: any) => categoryData.name
        );
        setExpenseCategories(categories);
      })
      .catch((error) => {
        console.error("Error fetching expense categories:", error);
      });
  }, []);

  return (
    <Modal open={isOpen} onClose={onClose} closeIcon>
      <Modal.Header>Edit Expense</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field className="field">
            <label>Category</label>
            <Dropdown
              selection
              name="category"
              options={expenseCategories.map((categoryName) => ({
                key: categoryName,
                text: categoryName,
                value: categoryName,
              }))}
              value={formData.category}
              onChange={(_, { value }) =>
                setFormData({ ...formData, category: value as string })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button primary onClick={handleUpdateExpense}>
          Update
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditExpenseModal;
