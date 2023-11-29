import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
// import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import React, { useState } from 'react';
import ListTable from './ListTable';
import { Tabs, Tab } from '@nextui-org/react';
function TaskList(props) {
  const [listName, setListName] = useState('');

  function updateListName(text) {
    setListName(text);
  }

  return (
    <div>
      <Tabs aria-label="Dynamic tabs">
        <Tab key={'AllTasks'} title={'AllTasks'}>
          <ListTable
            list={props.lists}
            setChecked={props.setChecked}
            insertTask={props.insertTask}
            deleteTask={props.deleteTask}
          />
        </Tab>
        {props.lists.map((list) => (
          <Tab key={list.name} title={list.name}>
            <ListTable
              listName={`${list.name}`}
              list={[list]}
              setChecked={props.setChecked}
              insertTask={props.insertTask}
              deleteTask={props.deleteTask}
              deleteList={props.deleteList}
            />
          </Tab>
        ))}
      </Tabs>

      {/* <Tab.Container
        id="list-group-tabs-example"
        defaultActiveKey={'#AllTasks'}>
        <Row>
          <Col sm={2}>
            <ListGroup>
              <ListGroup.Item
                key={'AllTasks'}
                action
                href={'#AllTasks'}
                className="d-flex justify-content-between align-items-start">
                All Tasks
                <Badge bg="primary" pill>
                  {props.numItems}
                </Badge>
              </ListGroup.Item>
              {props.lists.map((item) => (
                <ListGroup.Item
                  key={item.name}
                  action
                  href={`#${item.name}`}
                  className="d-flex justify-content-between align-items-start">
                  {item.name}
                  <Badge bg="primary" pill>
                    {item.items.length}
                  </Badge>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              <Tab.Pane key={'AllTasks'} eventKey={'#AllTasks'}>
                <ListTable
                  list={props.lists}
                  setChecked={props.setChecked}
                  insertTask={props.insertTask}
                  deleteTask={props.deleteTask}
                />
              </Tab.Pane>
              {props.lists.map((task) => (
                <Tab.Pane key={`${task.name}`} eventKey={`#${task.name}`}>
                  <ListTable
                    listName={`${task.name}`}
                    list={[task]}
                    setChecked={props.setChecked}
                    insertTask={props.insertTask}
                    deleteTask={props.deleteTask}
                    deleteList={props.deleteList}
                  />
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <Col sm={2}>
        <Stack direction="horizontal" gap={2}>
          <Form.Control
            type="text"
            id="newList"
            aria-describedby="helpBlock"
            placeholder="List Name"
            onChange={(e) => updateListName(e.target.value)}
          />
          <Button variant="dark" onClick={() => props.addList(listName)}>
            Create
          </Button>
        </Stack>
      </Col> */}
    </div>
  );
}

export default TaskList;
