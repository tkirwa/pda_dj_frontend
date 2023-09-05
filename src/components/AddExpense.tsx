import React, { useState } from 'react';
import { Button, Header, Modal, Form, Input, Dropdown, Label } from 'semantic-ui-react';

function AddExpenseModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const categories = [
    { key: 'food', value: 'food', text: 'Food' },
    { key: 'housing', value: 'housing', text: 'Housing' },
    // Add more categories as needed
  ];

  const handleSave = () => {
    // Add your logic to save the expense data
    console.log('Name:', name);
    console.log('Category:', category);
    console.log('Amount:', amount);
    console.log('Date:', date);

    // Close the modal
    setOpen(false);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button primary>Add Expense/Income</Button>}
    >
      <Modal.Header>Add Expense/Income</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Label>Name</Label>
            <Input
              placeholder="Expense/Income Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <Header>Expense Category</Header>
            <Dropdown
              placeholder="Select Category"
              selection
              options={categories}
              value={category}
              onChange={(_, { value }) => setCategory(value as string)}
            />
          </Form.Field>
          <Form.Field>
            <Label>Amount</Label>
            <Input
              placeholder="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
        <Button color='black' onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Save"
          labelPosition='right'
          icon='checkmark'
          onClick={handleSave}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default AddExpenseModal;
