import React, { useState } from 'react';
import ListTable from './ListTable';
import { Tooltip, Input, Chip, Badge, Button } from '@nextui-org/react';
import Sidebar, { SidebarItem } from './Sidebar';

function TaskList(props) {
  const [listName, setListName] = useState('');

  function updateListName(text) {
    setListName(text);
  }

  function handleTab(key) {
    props.setTab(key);
  }

  return (
    <div className="h-full flex">
      <Sidebar className="flex-2">
        <div
          style={{
            maxHeight: '72vh',
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
                <div
                  className="transition-transform transform hover:scale-110"
                  onClick={(e) => {
                    handleTab('All Tasks');
                  }}>
                  <Badge color="primary" content={props.numItems}>
                    <span className="material-symbols-outlined">task</span>
                  </Badge>
                </div>
              }
              text="All Tasks"
              elem={
                <Chip className="ml-2" size="sm" color="primary">
                  {props.numItems}
                </Chip>
              }
              active={props.getTab() === 'All Tasks' ? true : false}
            />
          </div>

          {props.lists.map((list) => {
            return (
              <div className="relative">
                <div
                  key={list.name}
                  onClick={(e) => {
                    handleTab(`${list.name}`);
                  }}>
                  <SidebarItem
                    icon={
                      <div
                        className="transition-transform transform hover:scale-110"
                        onClick={(e) => {
                          handleTab(`${list.name}`);
                        }}>
                        <Badge content={list.items.length} color="primary">
                          <span className="material-symbols-outlined">
                            task
                          </span>
                        </Badge>
                      </div>
                    }
                    text={list.name}
                    elem={
                      <Chip className="ml-2" size="sm" color="primary">
                        {list.items.length}
                      </Chip>
                    }
                    active={props.getTab() === `${list.name}` ? true : false}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <SidebarItem
            nohover
            elem={
              <div className="flex flex-row items-center overflow-hidden mb-2 border-t p-2 ">
                <Input
                  radius="full"
                  className="absolute-left"
                  size="sm"
                  type="text"
                  placeholder="List Name"
                  value={listName}
                  onChange={(e) => updateListName(e.target.value)}
                  isRequired
                />
                <Tooltip
                  isDismissable
                  closeDelay={0}
                  className="achieveit-light bg-primary-50"
                  placement="right"
                  content="Add to Task Lists">
                  <Button
                    className="min-w-4 w-10 h-10 ml-3 bg-primary-100 hover:bg-primary-200 hover:font-bold"
                    radius="full"
                    variant="dark"
                    onClick={() => {
                      listName !== '' &&
                        props.addList(listName) &&
                        updateListName('');
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
        {props.getTab() === 'All Tasks' && (
          <div>
            <ListTable
              list={props.lists}
              setChecked={props.setChecked}
              insertTask={props.insertTask}
              deleteTask={props.deleteTask}
              isDark={props.isDark}
            />
          </div>
        )}
        {props.lists.map((list) =>
          props.getTab() === list.name ? (
            <ListTable
              key={list.name}
              listName={list.name}
              list={[list]}
              setChecked={props.setChecked}
              insertTask={props.insertTask}
              deleteTask={props.deleteTask}
              deleteList={props.deleteList}
              setTab={props.setTab}
              isDark={props.isDark}
            />
          ) : null,
        )}
      </div>
    </div>
  );
}

export default TaskList;
