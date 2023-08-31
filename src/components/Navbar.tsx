import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


class Navbar extends Component {
  state = {
    activeItem: '',
  };

  handleItemClick = (event: React.MouseEvent<HTMLAnchorElement>, data: any) => {
    const { name } = data;
    this.setState({ activeItem: name });
  };

  render() {
    // const { activeItem } = this.state;

    return (
      <Menu>
          <Menu.Item header>
            <Link to="/">
              PBA: Budgeting System
            </Link>
          </Menu.Item>
        {/* <Menu.Item header>PBA: Budgeting System</Menu.Item> */}
        {/* <Menu.Item
          name='aboutUs'
          active={activeItem === 'aboutUs'}
          onClick={this.handleItemClick}
        /> */}
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
  }
}

export default Navbar;
