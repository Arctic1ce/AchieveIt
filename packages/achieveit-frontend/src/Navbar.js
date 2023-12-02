import * as React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react';
// import { Link } from 'react-router-dom';

function Nav() {
  return (
    <Navbar
      className="bg-primary-300"
      maxWidth={'full'}
      isBordered
      shouldHideOnScroll>
      <NavbarContent justify="start">
        <NavbarBrand>
          <p className="font-semibold text-large">AchieveIt</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="secondary" href="/login" variant="flat">
            <p className="font-normal">LOGIN</p>
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Nav;
