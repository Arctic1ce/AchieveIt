import React, { useState } from 'react';
import ListTable from './ListTable';
import { Tooltip, Input, Chip, Badge, Button } from '@nextui-org/react';
import Sidebar, { SidebarItem } from './Sidebar';
import Form from 'react-bootstrap/Form';

function TaskList(props) {
  const [listName, setListName] = useState('');
  const [selectedTab, setSelectedTab] = useState('All Tasks');

  function updateListName(text) {
    setListName(text);
  }

  function handleTab(key) {
    console.log(key);
    setSelectedTab(key);
  }

  return (
    <div className="h-full flex">
      <Sidebar className="flex-2">
        <div
          style={{
            maxHeight: '73vh',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: 'transparent transparent',
          }}>
          <div
            key="All Tasks"
            onClick={(e) => {
              handleTab('All Tasks');
            }}>
            <SidebarItem
              icon={
                <div>
                  <Badge color="primary" content={props.numItems}>
                    T
                  </Badge>
                </div>
              }
              text="All Tasks"
              elem={
                <Chip className="ml-2" size="sm" color="primary">
                  {props.numItems}
                </Chip>
              }
              active={selectedTab === 'All Tasks' ? true : false}
            />
          </div>

          {props.lists.map((list) => {
            return (
              <div
                key={list.name}
                onClick={(e) => {
                  handleTab(`${list.name}`);
                }}>
                <SidebarItem
                  icon={
                    <div>
                      <Badge content={list.items.length} color="primary">
                        T
                      </Badge>
                    </div>
                  }
                  text={list.name}
                  elem={
                    <Chip className="ml-2" size="sm" color="primary">
                      {list.items.length}
                    </Chip>
                  }
                  active={selectedTab === `${list.name}` ? true : false}
                />
              </div>
            );
          })}
        </div>

        <div>
          <SidebarItem
            nohover
            elem={
              <div className="flex flex-row items-center overflow-hidden mb-2 border-t pt-2 ">
                <Input
                  autoFocus
                  radius="full"
                  variant="underlined"
                  className="absolute-left hover:bg-primary-50 selection:bg-primary-100"
                  size="sm"
                  type="text"
                  placeholder="List Name"
                  value={listName}
                  onChange={(e) => updateListName(e.target.value)}
                  // isInvalid={!!errors.task}
                  // errorMessage={errors.task}
                  isRequired
                />
                <Tooltip placement="right" content="Add this list">
                  <Button
                    className="min-w-4 w-10 h-10 ml-3 bg-primary-50"
                    radius="full"
                    variant="dark"
                    onClick={() => {
                      listName !== '' && props.addList(listName);
                    }}>
                    +
                  </Button>
                </Tooltip>
              </div>
            }
          />
        </div>
      </Sidebar>
      <div className="flex-1 w-full p-4">
        {selectedTab === 'All Tasks' && (
          <ListTable
            list={props.lists}
            setChecked={props.setChecked}
            insertTask={props.insertTask}
            deleteTask={props.deleteTask}
          />
        )}
        {props.lists.map((list) =>
          selectedTab === list.name ? (
            <ListTable
              key={list.name}
              listName={list.name}
              list={[list]}
              setChecked={props.setChecked}
              insertTask={props.insertTask}
              deleteTask={props.deleteTask}
              deleteList={props.deleteList}
            />
          ) : null,
        )}
      </div>

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
