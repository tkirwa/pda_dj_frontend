import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react'


class Navbar extends Component {
  state = {
    activeItem: '',
  };

  handleItemClick = (event: React.MouseEvent<HTMLAnchorElement>, data: any) => {
    const { name } = data;
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        <Menu.Item header>PBA: Budgeting System</Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button primary>Sign up</Button>
          </Menu.Item>
          <Menu.Item>
            <Button>Log-in</Button>
          </Menu.Item>
        </Menu.Menu>

      </Menu>
    );
  }
}

export default Navbar;
