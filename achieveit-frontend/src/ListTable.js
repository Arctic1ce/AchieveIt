import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import NewItem from './NewItem';

function ListTable(props) {

    const listItemStyle = {
        textDecoration: 'line-through',
        marginBottom: '8px',
        color: '#ff0000',
    };

    return (
        <div>
            <NewItem insertTask={props.insertTask} list={props.list}/>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>Task</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th>List Name</th>
                    </tr>
                </thead>

                {props.list.map((item) => {

                    return (
                        <tbody key={`${item.name}`}>
                            {item.items.map((val) => (
                                <tr key={`${item.name}`}>
                                    <td>
                                        <Form>
                                            <Form.Check
                                                type={'checkbox'}
                                                id={`default-checkbox`}
                                                checked={val.completed}
                                                onChange={() => props.setChecked(item.name,val.name, !val.completed)}
                                            />
                                        </Form>
                                    </td>
                                    {!val.completed && <td>{val.name}</td>}
                                    {!val.completed && <td>{val.description}</td>}
                                    {!val.completed && <td>{val.due_date}</td>}
                                    {!val.completed && <td>{val.priority}</td>}
                                    {!val.completed && <td>{item.name}</td>}

                                    {val.completed && <td style={listItemStyle}>{val.task}</td>}
                                    {val.completed && <td style={listItemStyle}>{val.description}</td>}
                                    {val.completed && <td style={listItemStyle}>{val.due_date}</td>}
                                    {val.completed && <td style={listItemStyle}>{val.priority}</td>}
                                    {val.completed && <td style={listItemStyle}>{val.task_category}</td>}
                                    {/*    Button to delete item*/}
                                    <td>
                                        <btn
                                            variant="danger"
                                            onClick={() => props.deleteTask(item.name, val.name)}
                                        >
                                            Delete
                                        </btn>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    );
                })}
            </Table>
        </div>
    );
}

export default ListTable