import React, { useState, useEffect } from "react";
// import React, { useState } from "react";
import axios from "axios";
import { Button, Dropdown, Form } from "semantic-ui-react";
import { API_BASE_URL, formatCurrentDatetime } from "./api-data-service";

const apiBaseURL = API_BASE_URL;

interface Expense {
  name: string;
  category: string;
  amount: number;
  date: string;
}

const AddExpenseForm: React.FC = () => {

  const [formData, setFormData] = useState<Expense>({
    name: "",
    category: "",
    amount: 0,
    date: formatCurrentDatetime(),
    // date: new Date().toISOString(),
  });
  const [expenseCategories, setExpenseCategories] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input fields (e.g., check if amount is a valid number)
    const parsedAmount = parseFloat(formData.amount.toString());
    if (
      !formData.name ||
      !formData.category ||
      isNaN(parsedAmount) ||
      !formData.date
    ) {
      // Handle validation error, e.g., show an error message
      return;
    }

    const authToken =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    try {
      const response = await axios.post<Expense>(
        `${apiBaseURL}/api/v1/expenses/`,
        formData,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );

      setSuccessMessage("Expense added successfully");

      // Handle the response, e.g., show a success message or redirect to another page
      console.log("Expense added successfully:", response.data);

      // Clear the form
      setFormData({
        name: "",
        category: "",
        amount: 0,
        date: "",
      });
    } catch (error) {
      // Handle any errors here, e.g., show an error message
      console.error("Error adding expense:", error);
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
    <div className="ui segment">
      <h2>PBA :: Add Expense</h2>
      {successMessage ? (
        <p style={{ color: "green" }}>{successMessage}</p>
      ) : (
        <p style={{ color: "red" }}>{successMessage}</p>
      )}
      <Form className="ui form">
        <Form.Field className="field">
          <label>Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
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
        <Form.Field className="field">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </Form.Field>
        <Button
          className="ui primary button"
          color="blue"
          onClick={handleAddExpense}
        >
          Add Expense
        </Button>
      </Form>
    </div>
  );
};

export default AddExpenseForm;
