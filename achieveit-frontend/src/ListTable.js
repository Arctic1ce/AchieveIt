import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

function ListTable(props) {

    const listItemStyle = {
        textDecoration: 'line-through',
        marginBottom: '8px',
        color: '#ff0000',
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th></th>
                    <th>Task</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                    <th>Task Category</th>
                </tr>
            </thead>

            {props.list.map((item) => {

                return (
                    <tbody>
                        {item.items.map((val) => (
                            <tr>
                                <td>
                                    <Form>
                                        <Form.Check
                                            type={'checkbox'}
                                            id={`default-checkbox`}
                                            checked={val.completed}
                                            onChange={() => props.setChecked(item, val, !val.completed)}
                                        />
                                    </Form>
                                </td>
                                {!val.completed && <td>{val.task}</td>}
                                {!val.completed && <td>{val.description}</td>}
                                {!val.completed && <td>{val.due_date}</td>}
                                {!val.completed && <td>{val.priority}</td>}
                                {!val.completed && <td>{val.task_category}</td>}

                                {val.completed && <td style={listItemStyle}>{val.task}</td>}
                                {val.completed && <td style={listItemStyle}>{val.description}</td>}
                                {val.completed && <td style={listItemStyle}>{val.due_date}</td>}
                                {val.completed && <td style={listItemStyle}>{val.priority}</td>}
                                {val.completed && <td style={listItemStyle}>{val.task_category}</td>}
                            </tr>
                        ))}
                    </tbody>
                );
            })}

        </Table>
    );
}

export default ListTable