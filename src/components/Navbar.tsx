import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


const Navbar: React.FC = () => {

  return (
    <Menu>
      <Menu.Item header>
        <Link to="/">PBA: Budgeting System</Link>
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item>
          <Link to="/signup">
            <Button primary>Sign up</Button>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/login">
            <Button>Log-in</Button>
          </Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
