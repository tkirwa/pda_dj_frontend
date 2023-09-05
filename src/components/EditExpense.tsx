import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

interface Expense {
  id: number;
  name: string;
  category: string | null;
  amount: number;
  date: string;
}

interface EditExpenseProps {
  expense: Expense | null;
  open: boolean;
  onSave: () => void;
  onClose: () => void;
}

const EditExpense: React.FC<EditExpenseProps> = ({ expense, open, onSave, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Edit Expense</Modal.Header>
      <Modal.Content>
        {/* Your form or content goes here */}
      </Modal.Content>
      <Modal.Actions>
        <Button positive onClick={onSave}>
          Save
        </Button>
        <Button secondary onClick={onClose}>
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditExpense;
