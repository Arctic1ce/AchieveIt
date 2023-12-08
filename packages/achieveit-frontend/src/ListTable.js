import React from 'react';
import NewItem from './NewItem';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Checkbox,
  Chip,
} from '@nextui-org/react';
// ... (imports)

function ListTable(props) {
  const listItemStyle = {
    textDecoration: 'line-through',
    textDecorationThickness: '2px',
    marginBottom: '8px',
    color: '#ff0000',
  };

  const priorityStyle = (priority) => {
    if (priority === 'High') {
      return <Chip className="bg-red-500/50">{priority}</Chip>;
    } else if (priority === 'Low') {
      return <Chip className="bg-amber-500/50">{priority}</Chip>;
    } else {
      return <Chip className="bg-orange-500/50">{priority}</Chip>;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center">
        <p className="font-semibold text-xl ml-3" data-testid="list-name">
          {props.listName ? props.listName : 'All Tasks'}
        </p>
        <div className="ml-auto">
          <NewItem
            insertTask={props.insertTask}
            list={props.list}
            isDark={props.isDark}
          />
        </div>
      </div>
      <div className="flex flex-row overflow-hidden">
        <Table aria-label="collection table" isStriped data-testid="collection-table">
          <TableHeader>
            <TableColumn></TableColumn>
            <TableColumn>Task</TableColumn>
            <TableColumn>Description</TableColumn>
            <TableColumn>Due Date</TableColumn>
            <TableColumn>Priority</TableColumn>
            <TableColumn>List Name</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody emptyContent={'No rows to display.'} data-testid="empty-table-body">
            {[]}
          </TableBody>
          <TableBody data-testid="populated-table-body">
            {props.list.map((list) =>
              list.items.map((val) => (
                <TableRow
                  style={val.completed ? listItemStyle : {}}
                  key={`${list._id}-${val._id}`}
                  data-testid={`table-row-${list.name}-${val.name}`}
                >
                  <TableCell>
                    <Checkbox
                      defaultSelected={val.completed}
                      onChange={() =>
                        props.setChecked(list.name, val.name, !val.completed)
                      }
                      label={`Task: ${val.name}`}
                      data-testid={`checkbox-${list.name}-${val.name}`}
                    />
                  </TableCell>
                  <TableCell>{val.name}</TableCell>
                  <TableCell>{val.description}</TableCell>
                  <TableCell>{val.due_date}</TableCell>
                  <TableCell>{priorityStyle(val.priority)}</TableCell>
                  <TableCell>{list.name}</TableCell>
                  <TableCell>
                    <Button
                      color="danger"
                      onClick={() => props.deleteTask(list.name, val.name)}
                      data-testid={`delete-button-${list.name}-${val.name}`}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex-col">
        {props.list.length === 1 && (
          <Button
            className="mt-3"
            onClick={() => props.deleteList(props.list[0].name)}
            data-testid="delete-list-button"
          >
            Delete List
          </Button>
        )}
      </div>
    </div>
  );
}

export default ListTable;
