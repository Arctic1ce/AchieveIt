import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Switch,
} from '@nextui-org/react';
// import { Link } from 'react-router-dom';

function Nav(props) {
  function handleSwitch() {
    props.setDarkMode(!props.isDark);
  }

  return (
    <Navbar
      className="flex bg-primary-300"
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
          <Button
            className="mx-2"
            as={Link}
            color="secondary"
            href="/login"
            variant="flat">
            <p className="font-normal">LOGIN</p>
          </Button>
          <Switch
            isSelected={props.isDark}
            onValueChange={handleSwitch}
            size="sm"></Switch>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Nav;
