/*** 
adapted from: https://gist.github.com/nimone/9204ed6e9d725c0eef003011c9113698
*/

import { Button, Tooltip, Switch } from '@nextui-org/react';
import { useContext, createContext, useState } from 'react';

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  const small_width = `w-16`;
  const big_width = `w-64`;

  return (
    <aside className={`flex-shrink-0 ${expanded ? big_width : small_width}`}>
      <nav className="h-full flex flex-col border-r shadow-sm">
        <div
          className={`p-4 pb-2 flex justify-center items-center
              overflow-hidden transition-all ${
                expanded ? `${big_width} ml-3` : small_width
              }`}>
          <div
            className={`overflow-hidden transition-all font-semibold text-xl  ${
              expanded ? big_width : 'w-0 h-0'
            }`}>
            Task Lists
          </div>

          <Switch
            isSelected={expanded}
            onValueChange={() => setExpanded((curr) => !curr)}
            size="sm"></Switch>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 content-center">{children}</ul>
        </SidebarContext.Provider>

        {!expanded && (
          <div className="border-t shadow-sm flex p-3">
            <Tooltip placement="right" content="Add list">
              <Button
                className="min-w-8 p-auto m-auto bg-primary-100"
                size="sm"
                radius="full"
                variant="dark"
                onClick={() => setExpanded((curr) => !curr)}>
                +
              </Button>
            </Tooltip>
          </div>
        )}
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, elem, text, active, nohover, alert }) {
  const { expanded } = useContext(SidebarContext);
  const [isOpen, setIsOpen] = useState(false);

  const big_width = 'w-52';

  return (
    <li
      key={text}
      className={`
        relative flex content-center py-2 px-2 my-1 mx-2
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? 'bg-gradient-to-tr from-primary-200 to-primary-100 text-secondary'
            : nohover
              ? ''
              : 'hover:bg-primary-50 text-secondary'
        }
    `}>
      {!expanded && (
        <div>
          <Tooltip
            className="achieveit-light bg-primary-50"
            isOpen={isOpen}
            onOpenChange={(open) => {
              !expanded && setIsOpen(open);
            }}
            isDismissable
            closeDelay={0}
            content={text}
            offset={20}
            placement="right">
            <div>{icon}</div>
          </Tooltip>
        </div>
      )}
      <span
        style={{
          maxWidth: '10rem',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
        className={`overflow-hidden transition-all ${
          expanded ? `${big_width} ml-3` : 'w-0 h-0'
        }`}>
        {text}
      </span>

      {expanded && (
        <div className="overflow-hidden transition-all absolute right-2">
          {elem}
        </div>
      )}
    </li>
  );
}
