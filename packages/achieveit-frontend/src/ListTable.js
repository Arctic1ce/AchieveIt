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

  const initialSelectedKeys = () => {
    const storedSelectedKeys = sessionStorage.getItem('selectedKeys');
    if (storedSelectedKeys) {
      return new Set(JSON.parse(storedSelectedKeys));
    }
    return new Set([]);
  };

  const [selectedKeys, setSelectedKeys] = useState(initialSelectedKeys);

  // Save selectedKeys to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem(
      'selectedKeys',
      JSON.stringify(Array.from(selectedKeys)),
    );

    console.log('Saved Selected Keys:', Array.from(selectedKeys));
  }, [selectedKeys]);

  const listItemStyle = {
    textDecoration: 'line-through',
    textDecorationThickness: '2px',
    marginBottom: '8px',
    color: '#ff0000',
  };

  const grabList = (list, val) => {
    for (let sub of list) {
      if (sub.name == val) {
        if (sub.items == undefined) {
          return 'undefined';
        } else {
          return sub.items;
        }
      }
    }
    return [];
  };

  const grabCompleted = (items, val) => {
    for (let sub of items) {
      if (sub.name == val) {
        if (sub.completed == undefined) {
          return 'undefined';
        } else {
          return sub.completed;
        }
      }
    }
    return [];
  };

  const isRowSelected = (rowId) => {
    if (selectedKeys === 'all') {
      return true;
    } else {
      return selectedKeys.has(rowId);
    }
  };

  const handleSelect = (key) => {
    setSelectedKeys(key);
    console.log(key);

    if (key === 'all') {
      Array.from(selectedKeys).map((key) => {
        let arr = key.split('-', 2);
        props.setChecked(arr[0], arr[1], true);
        console.log('check');
      });
    } else if (key.currentKey !== undefined) {
      let arr = key.currentKey.split('-', 2);
      if (isRowSelected(`${arr[0]}-${arr[1]}`)) {
        props.setChecked(arr[0], arr[1], false);
      } else {
        props.setChecked(arr[0], arr[1], true);
      }
    }
  };

  return (
    <div>
      <NewItem insertTask={props.insertTask} list={props.list} />
      <Table
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

        <TableBody key={'unique'}>
          {props.list.map((list) =>
            list.items.map((val) => {
              
              return (
                <TableRow
                  style={
                    isRowSelected(`${list.name}-${val.name}`)
                      ? listItemStyle
                      : null
                  }
                  key={`${list.name}-${val.name}`}>
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
        <Button onClick={() => props.deleteList(props.list[0].name)}>
          Delete List
        </Button>
      )}
    </div>
  );
}
//   return (
//     <div>
//       <NewItem insertTask={props.insertTask} list={props.list} />
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th></th>
//             <th>Task</th>
//             <th>Description</th>
//             <th>Due Date</th>
//             <th>Priority</th>
//             <th>List Name</th>
//           </tr>
//         </thead>

//         {props.list.map((item) => {
//           return (
//             <tbody key={`${item.name}`}>
//               {item.items.map((val) => (
//                 <tr key={`${item.name}`}>
//                   <td>
//                     <Form>
//                       <Form.Check
//                         type={'checkbox'}
//                         id={`default-checkbox`}
//                         checked={val.completed}
//                         onChange={() =>
//                           props.setChecked(item.name, val.name, !val.completed)
//                         }
//                       />
//                     </Form>
//                   </td>
//                   {!val.completed && <td>{val.name}</td>}
//                   {!val.completed && <td>{val.description}</td>}
//                   {!val.completed && <td>{val.due_date}</td>}
//                   {!val.completed && <td>{val.priority}</td>}
//                   {!val.completed && <td>{item.name}</td>}

//                   {val.completed && <td style={listItemStyle}>{val.name}</td>}
//                   {val.completed && (
//                     <td style={listItemStyle}>{val.description}</td>
//                   )}
//                   {val.completed && (
//                     <td style={listItemStyle}>{val.due_date}</td>
//                   )}
//                   {val.completed && (
//                     <td style={listItemStyle}>{val.priority}</td>
//                   )}
//                   {val.completed && <td style={listItemStyle}>{item.name}</td>}
//                   {/*    Button to delete item*/}
//                   <td>
//                     <Button
//                       variant="dark"
//                       onClick={() => props.deleteTask(item.name, val.name)}
//                       className="me-2">
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           );
//         })}
//       </Table>
//       {props.list.length === 1 && (
//         <Button
//           variant="dark"
//           onClick={() => props.deleteList(props.list[0].name)}
//           className="me-2">
//           Delete List
//         </Button>
//       )}
//     </div>
//   );
// }

export default ListTable;
