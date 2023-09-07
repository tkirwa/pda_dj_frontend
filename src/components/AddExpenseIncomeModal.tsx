import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Dropdown, Label } from 'semantic-ui-react';

interface AddExpenseModalProps {
  onClose: () => void;
}

const AddExpenseIncomeModal: React.FC<AddExpenseModalProps> = ({ onClose }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const API_BASE_URL = 'http://127.0.0.1:8000';

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v1/expense-categories/`)
      .then((response) => response.json())
      .then((data) => {
        const categoryOptions = data.map((category: { id: number; name: string }) => ({
          key: category.id,
          value: category.id,
          text: category.name,
        }));
        setCategories(categoryOptions);

        
      })
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/expenses/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          category: selectedCategory,
          amount: parseFloat(amount),
          date,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add expense');
      }

      setOpen(false);
      setName('');
      setSelectedCategory('');
      setAmount('');
      setDate('');

      // Call the onClose prop to close the modal in the parent component
      onClose();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button primary>Add Expense/Income</Button>}
    >
      <Modal.Header>Add Expense</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Label>Name</Label>
            <Input
              placeholder="Expense/Income Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Field>
          <Form.Field>
          <Label>Expense Category</Label>
            <Dropdown
              placeholder="Select Category"
              selection
              options={categories}
              value={selectedCategory} // The selected value is controlled by the state
              onChange={(_, { value }) => setSelectedCategory(value as string)} // Update the state when the selection changes
              required
            />
          </Form.Field>
          <Form.Field>
            <Label>Amount</Label>
            <Input
              placeholder="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </Form.Field>
          <Form.Field>
            <Label>Date</Label>
            <Input
              placeholder="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Save"
          labelPosition="right"
          icon="checkmark"
          onClick={handleSave}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default AddExpenseIncomeModal;
