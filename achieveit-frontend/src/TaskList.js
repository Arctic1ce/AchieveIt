import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

function TaskList(props) {
    return (
        <Tab.Container id="list-group-tabs-example" defaultActiveKey={`#link1`}>
            <Row>
                <Col sm={2}>
                    <ListGroup>
                        {props.lists.map((item) => (
                            <ListGroup.Item key={item.name} action href={`#${item.name}`} className="d-flex justify-content-between align-items-start">
                                {item.name}
                                <Badge bg="primary" pill>
                                    {item.num_items}
                                </Badge>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col sm={8}>
                    <Tab.Content>
                        <Tab.Pane eventKey="#link1">Tab pane content 1</Tab.Pane>
                        <Tab.Pane eventKey="#link2">Tab pane content 2</Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
}

export default TaskList;