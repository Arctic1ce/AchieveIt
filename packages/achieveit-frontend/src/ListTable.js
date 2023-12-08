import React, { useState } from 'react';
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tooltip,
} from '@nextui-org/react';
// ... (imports)

function ListTable(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [desc, setDesc] = useState('test');

  const listItemStyle = {
    textDecoration: 'line-through',
    textDecorationThickness: '2px',
    marginBottom: '8px',
    color: '#835BFA',
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

  function showDesc(val) {
    setDesc(val);
    onOpen();
  }

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
        <Table aria-label="collection table">
          <TableHeader>
            <TableColumn></TableColumn>
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
          <TableBody
            emptyContent={'No rows to display.'}
            data-testid="empty-table-body">
            {[]}
          </TableBody>
          <TableBody data-testid="populated-table-body">
            {props.list.map((list) =>
              list.items.map((val) => {
                return (
                  <TableRow
                    className={`
                      ${
                        val.completed
                          ? 'bg-primary-100'
                          : 'hover:bg-primary-50 text-secondary'
                      } 
                      `}
                    style={val.completed ? listItemStyle : {}}
                    key={`${list._id}-${val._id}`}>
                    <TableCell>
                      <Checkbox
                        defaultSelected={val.completed}
                        onChange={() =>
                          props.setChecked(list.name, val.name, !val.completed)
                        }
                      />
                    </TableCell>
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
                    <TableCell className="max-w-md">
                      <div className="flex flex-row items-center">
                        {val.description !== '' ? (
                          <Tooltip
                            isDismissable
                            closeDelay={0}
                            className={`achieveit-light bg-primary-100`}
                            content="Show Full Description"
                            placement="right">
                            <span
                              className="hover:text-blue-800"
                              style={{
                                maxWidth: '8rem',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                              }}
                              onClick={() => showDesc(val.description)}>
                              {val.description}
                            </span>
                          </Tooltip>
                        ) : null}
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
        </Table>
      </div>
      <div className="flex-col">
        {props.list.length === 1 && (
          <Button
            className="mt-3"
            onClick={() => props.deleteList(props.list[0].name)}
            data-testid="delete-list-button">
            Delete List
          </Button>
        )}
      </div>
      <Modal
        className={`${
          props.isDark ? 'achieveit-dark' : 'achieveit-light'
        } bg-primary-50`}
        style={{ 'overflow-wrap': 'break-word' }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span className="py-2 border-b-2 border-secondary text-secondary">
                  Description
                </span>
              </ModalHeader>
              <ModalBody>
                <span className="text-secondary">{desc}</span>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ListTable;
