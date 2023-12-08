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


test('renders ListTable component with specific list name', () => {
  const { getByTestId, getByText } = render(<ListTable {...mockProps} listName="SampleList" />);
  
  // Check if the specified list name is rendered
  expect(getByTestId('list-name')).toHaveTextContent('SampleList');
  expect(getByText('Task1')).toBeInTheDocument();
});

test('handles checkbox click and calls setChecked', () => {
  const { getByTestId } = render(<ListTable {...mockProps} />);
  const checkbox = getByTestId('checkbox-SampleList-Task1');
  fireEvent.click(checkbox);
  expect(mockProps.setChecked).toHaveBeenCalledWith('SampleList', 'Task1', true);
});


test('handles delete button click and calls deleteTask', () => {
  const { getByText } = render(<ListTable {...mockProps} />);
  const deleteButton = getByText('Delete');
  fireEvent.click(deleteButton);
  expect(mockProps.deleteTask).toHaveBeenCalledWith('SampleList', 'Task1');
});

test('renders ListTable component with multiple lists', () => {
  const multipleListProps = {
    ...mockProps,
    list: [
      // Add another list to the existing mockProps.list
      {
        name: 'AnotherList',
        items: [
          {
            name: 'Task2',
            description: 'Description2',
            due_date: '2023-01-02',
            priority: 'Low',
            completed: false,
          },
        ],
      },
      // Existing list from mockProps
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
  };

  const { getByText } = render(<ListTable {...multipleListProps} />);
  
  // Check if both list names are rendered
  expect(getByText('SampleList')).toBeInTheDocument();
  expect(getByText('AnotherList')).toBeInTheDocument();
});

// Add more test cases as needed...
