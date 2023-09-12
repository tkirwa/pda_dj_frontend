import React, { useState} from "react";
import { Menu } from "semantic-ui-react";
import { Label, Icon } from "semantic-ui-react";
import ExpenseList from "./ExpenseList";
import IncomeList from "./IncomeList";
import Overview from "./Overview";
import DropdownTriggerMenu from "./DropdownMenu";

const Dashboard: React.FC = () => {
  const [showOverview, setShowOverview] = useState(false);

  const handleToggleOverview = () => {
    setShowOverview(!showOverview);
  };


  return (
    <>
      <Menu>
        <Menu.Item header>
          <Icon name='dashboard' />
          PBA: Dashboard
        </Menu.Item>
        <Menu.Menu>
          <Menu.Item>
            <Label
              style={{
                backgroundColor: "#1B67AA",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={handleToggleOverview}
            >
              {showOverview ? "Overview" : "Show Overview"}
            </Label>
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Item>
            {/* <Button onClick={handleLogout}>Logout</Button> */}
            <DropdownTriggerMenu/>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      {!showOverview && <Overview />}
      <ExpenseList />
      <IncomeList />
    </>
  );
};

export default Dashboard;
