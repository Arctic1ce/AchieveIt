// import Table from 'react-bootstrap/Table';
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
        <Table aria-label="collection table" isStriped>
          <TableHeader>
            <TableColumn></TableColumn>
            <TableColumn>
              {' '}
              <p className="font-bold text-medium">Task</p>
            </TableColumn>
            <TableColumn>
              {' '}
              <p className="font-bold text-medium">Description</p>
            </TableColumn>
            <TableColumn>
              {' '}
              <p className="font-bold text-medium">Due Date</p>
            </TableColumn>
            <TableColumn>
              {' '}
              <p className="font-bold text-medium">Priority</p>
            </TableColumn>
            <TableColumn>
              {' '}
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
