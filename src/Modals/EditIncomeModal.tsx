import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Dropdown } from "semantic-ui-react";
import axios from "axios";
import { API_BASE_URL } from "../components/api-data-service";

interface Income {
    id: number;
    name: string;
    category: string | undefined;
    amount: number;
    date: string;
  }

interface EditIncomeModalProps {
  incomeId: number;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedIncome: Income) => void;
}

const apiBaseURL = API_BASE_URL;

const EditIncomeModal: React.FC<EditIncomeModalProps> = ({
  incomeId,
  isOpen,
  onClose,
  onUpdate,
}) => {

  const [incomeCategories, setIncomeCategories] = useState<string[]>([]);

  const [formData, setFormData] = useState<Partial<Income>>({
    name: "",
    category: "",
    amount: 0,
    date: "",
  });

  useEffect(() => {
    if (isOpen) {
      // Fetch the income data for editing
      const authToken =
        localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

      axios
        .get<Income>(`${apiBaseURL}/api/v1/incomes/${incomeId}/`, {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        })
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching income data:", error);
        });
    }
  }, [isOpen, incomeId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateIncome = async () => {
    const authToken =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    try {
      const response = await axios.put<Income>(
        `${apiBaseURL}/api/v1/incomes/${incomeId}/`,
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
      console.error("Error updating income:", error);
    }
  };

    //Load Income categories
    useEffect(() => {
      const authToken =
        localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
      axios
        .get<string[]>(`${apiBaseURL}/api/v1/income-categories/`, {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        })
        .then((response) => {
          // Extract category names from the API response
          const categories = response.data.map(
            (categoryData: any) => categoryData.name
          );
          setIncomeCategories(categories);
        })
        .catch((error) => {
          console.error("Error fetching income categories:", error);
        });
    }, []);

  return (
    <Modal open={isOpen} onClose={onClose} closeIcon>
      <Modal.Header>Edit Income</Modal.Header>
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
              options={incomeCategories.map((categoryName) => ({
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
        <Button primary onClick={handleUpdateIncome}>
          Update
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditIncomeModal;
