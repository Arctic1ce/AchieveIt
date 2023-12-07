import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Switch,
  Chip,
} from '@nextui-org/react';

function Nav(props) {
  function handleSwitch() {
    props.setDarkMode(!props.isDark);
  }

  const INVALID_TOKEN = 'INVALID_TOKEN';

  return (
    <Navbar
      className="flex bg-primary-400 shadow"
      maxWidth={'full'}
      isBordered
      shouldHideOnScroll>
      <NavbarContent justify="start">
        <NavbarBrand className="flex items-center">
          <div className="flex-shrink-0">
            <img
              src="logo.jpg"
              className="h-auto max-h-10 w-auto max-w-full mr-2"
              alt=""
            />
          </div>
          <p className="font-semibold text-large">AchieveIt</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {props.token === INVALID_TOKEN && (
            <Button
              className="mx-2"
              as={Link}
              color="secondary"
              href="/login"
              variant="flat">
              <p className="font-normal">LOGIN</p>
            </Button>
          )}
          {props.token !== INVALID_TOKEN && (
            <Button className="mx-2" color="primary" onClick={props.logoutUser}>
              <p className="font-normal">LOGOUT</p>
            </Button>
          )}
          <Chip className="my-3 py-5 bg-primary-100">
            <Switch
              isSelected={props.isDark}
              onValueChange={handleSwitch}
              color="primary"
              size="sm">
              {props.isDark ? (
                <span class="material-symbols-outlined">light_mode</span>
              ) : (
                <span className="material-symbols-outlined">dark_mode</span>
              )}
            </Switch>
          </Chip>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Nav;
