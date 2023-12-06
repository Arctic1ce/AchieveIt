import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ListTable from './ListTable';

// Mock the necessary props
const mockProps = {
  insertTask: jest.fn(),
  list: [
    {
      name: 'SampleList',
      items: [
        {
          name: 'Task1',
          description: 'Description1',
          due_date: '2023-01-01',
          priority: 'High',
          completed: false,
        },
      ],
    },
  ],
  setChecked: jest.fn(),
  deleteTask: jest.fn(),
  deleteList: jest.fn(),
};

test('renders ListTable component', () => {
  const { getByText } = render(<ListTable {...mockProps} />);
  
  // Check if a specific text is present in the rendered component
  expect(getByText('Task: Task1')).toBeInTheDocument();
  
});


test('handles checkbox click', () => {
  const { getByLabelText } = render(<ListTable {...mockProps} />);
  const checkbox = getByLabelText('Task: Task1');
  fireEvent.click(checkbox);
  expect(mockProps.setChecked).toHaveBeenCalledWith('SampleList', 'Task1', true);
});

test('handles delete button click', () => {
  const { getByText } = render(<ListTable {...mockProps} />);
  const deleteButton = getByText('Delete');
  fireEvent.click(deleteButton);
  expect(mockProps.deleteTask).toHaveBeenCalledWith('SampleList', 'Task1');
});


