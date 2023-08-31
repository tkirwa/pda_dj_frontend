import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


class Dashboard extends Component {
//   state = {
//     activeItem: '',
//   };

//   handleItemClick = (event: React.MouseEvent<HTMLAnchorElement>, data: any) => {
//     const { name } = data;
//     this.setState({ activeItem: name });
//   };

  render() {
    // const { activeItem } = this.state;

    return (
      <Menu>
        <Menu.Item header>PBA: Dashboard</Menu.Item>
        {/* <Menu.Item
          name='aboutUs'
          active={activeItem === 'aboutUs'}
          onClick={this.handleItemClick}
        /> */}
        <Menu.Menu position='right'>
          <Menu.Item>
            <Link to="/logout">
              <Button>Logout</Button>
            </Link>
          </Menu.Item>
        </Menu.Menu>

      </Menu>
    );
  }
}

export default Dashboard;
