// import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import NewItem from './NewItem';
import { Button } from '@nextui-org/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
} from '@nextui-org/react';

function ListTable(props) {
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

  const findlist = (id) => {
    for (let list of props.list) {
      if (list._id === id) {
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
      if (task._id === id) {
        return task;
      }
    }
    return null;
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

  const handleSelect = (key) => {
    Array.from(selectedKeys).map((val) => previouskeys.add(val));
    setSelectedKeys(key);

    if (key === 'all') {
      //we've selected the all checkbox
      for (let list of props.list) {
        for (let task of list.items) {
          props.setChecked(list.name, task.name, true);
        }
      }
    } else if (previouskeys === 'all' && key === '') {
      //we've unselected the all checkboxs
      for (let list of props.list) {
        for (let task of list.items) {
          props.setChecked(list.name, task.name, false);
        }
      }
    } else if (previouskeys.size > key.size) {
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
    <div className="flex flex-col">
      <div className="flex flex-row items-center ">
        <p className="font-semibold text-xl ml-3">
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
        <Table
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={handleSelect}
          aria-label="collection table">
          <TableHeader>
            <TableColumn>
              <p className="font-bold text-medium">Task</p>
            </TableColumn>
            <TableColumn>
              <p className="font-bold text-medium">Description</p>
            </TableColumn>
            <TableColumn>
              <p className="font-bold text-medium">Due Date</p>
            </TableColumn>
            <TableColumn>
              <p className="font-bold text-medium">Priority</p>
            </TableColumn>
            <TableColumn>
              <p className="font-bold text-medium">List Name</p>
            </TableColumn>
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
                    <TableCell
                      style={{
                        maxWidth: '10rem',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                      className="max-w-sm overflow-hidden">
                      {val.name}
                    </TableCell>
                    <TableCell className="max-w-sm">
                      <div>
                        <p
                          // className="hover:text-primary"
                          style={{
                            maxWidth: '10rem',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                          }}>
                          {val.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell
                      style={{
                        maxWidth: '10rem',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                      className="max-w-sm overflow-hidden">
                      {val.due_date}
                    </TableCell>
                    <TableCell
                      style={{
                        maxWidth: '10rem',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                      className="max-w-sm overflow-hidden">
                      {priorityStyle(val.priority)}
                    </TableCell>
                    <TableCell
                      style={{
                        maxWidth: '8 rem',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}>
                      {list.name}
                    </TableCell>
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

          {/* Update the state outside the loop */}
        </Table>
      </div>
      <div className="flex-col">
        {props.list.length === 1 && (
          <Button
            className="mt-3"
            onClick={() => props.deleteList(props.list[0].name)}>
            Delete List
          </Button>
        )}
      </div>
    </div>
  );
}
export default ListTable;
