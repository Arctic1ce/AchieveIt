// import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import NewItem from './NewItem';
import { Button } from '@nextui-org/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@nextui-org/react';

function ListTable(props) {
  /*
  TO-DO: 
  selectedKeys should change the style of the row that it is on
  use column key and mapping to make more readable code
    style to look closer to Figma model
  */

  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  const previouskeys = new Set([]);

  const listItemStyle = {
    textDecoration: 'line-through',
    textDecorationThickness: '2px',
    marginBottom: '8px',
    color: '#ff0000',
  };

  useEffect(() => {
    // Use an effect to update the state once after the loop
    const completedKeys = new Set();

    props.list.forEach((list) => {
      list.items.forEach((val) => {
        if (val.completed) {
          completedKeys.add(`${list._id}-${val._id}`);
        }
      });
    });
    // Update the state with completed keys
    setSelectedKeys(completedKeys);
  }, [props.list]);

  const isRowSelected = (rowId) => {
    if (selectedKeys === 'all') {
      return true;
    } else {
      return selectedKeys.has(rowId);
    }
  };

  const findlist = (id) => {
    for (let list of props.list) {
      if (list._id == id) {
        return list;
      }
    }
    return null;
  };

  const findtask = (list, id) => {
    console.log('findtask');
    console.log(list);
    for (let task of list.items) {
      console.log(id);
      console.log(task._id);
      if (task._id == id) {
        return task;
      }
    }
    return null;
  };

  const handleSelect = (key) => {
    Array.from(selectedKeys).map((val) => previouskeys.add(val));
    setSelectedKeys(key);

    if (previouskeys.size > key.size) {
      //we've unselected a row - set that row's completed value to false
      previouskeys.forEach((element) => {
        if (!key.has(element)) {
          let arr = element.split('-', 2);
          let list = findlist(arr[0]);
          if (list !== null) {
            let task = findtask(list, arr[1]);
            if (task !== null) {
              props.setChecked(list.name, task.name, false);
            }
          }
        }
      });
    } else if (previouskeys.size < key.size) {
      //we've selected a row - set that row's completed value to true
      key.forEach((element) => {
        if (!previouskeys.has(element)) {
          let arr = element.split('-', 2);
          let list = findlist(arr[0]);
          if (list !== null) {
            let task = findtask(list, arr[1]);
            if (task !== null) {
              props.setChecked(list.name, task.name, true);
            }
          }
        }
      });
    } else {
      //something went wrong
      //we haven't changed anything --> handler shouldn't have been called
      //console.log('?');
    }
  };

  return (
    <div>
      <NewItem insertTask={props.insertTask} list={props.list} />
      <Table
        showSelectAllCheckbox={false}
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelect}
        aria-label="collection table">
        <TableHeader>
          <TableColumn>Task</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Due Date</TableColumn>
          <TableColumn>Priority</TableColumn>
          <TableColumn>List Name</TableColumn>
          <TableColumn></TableColumn>
        </TableHeader>
        <TableBody emptyContent={'No rows to display.'}>{[]}</TableBody>
        <TableBody>
          {props.list.map((list) =>
            list.items.map((val) => {
              return (
                <TableRow
                  style={val.completed ? listItemStyle : {}}
                  key={`${list._id}-${val._id}`}>
                  <TableCell>{val.name}</TableCell>
                  <TableCell>{val.description}</TableCell>
                  <TableCell>{val.due_date}</TableCell>
                  <TableCell>{val.priority}</TableCell>
                  <TableCell>{list.name}</TableCell>
                  <TableCell>
                    <Button
                      color="danger"
                      onClick={() => props.deleteTask(list.name, val.name)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            }),
          )}
        </TableBody>
      </Table>

      {props.list.length === 1 && (
        <Button
          className="mt-3"
          onClick={() => props.deleteList(props.list[0].name)}>
          Delete List
        </Button>
      )}
    </div>
  );
}
export default ListTable;
