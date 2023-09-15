import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Label, Icon } from "semantic-ui-react";
import ExpenseList from "./ExpenseList";
import IncomeList from "./IncomeList";
import Overview from "./Overview";
import DropdownTriggerMenu from "./DropdownMenu";
import SettingsComponent from "./Settings";
import ManagePane from "./ManagePane";

const Dashboard: React.FC = () => {
  const [showOverview, setShowOverview] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showManage, setShowManage] = useState(false);

  const handleToggleOverview = () => {
    setShowOverview(!showOverview);
    setShowSettings(false);
    setShowManage(false);
  };

  const handleToggleSettings = () => {
    setShowSettings(!showSettings);
    setShowOverview(false);
    setShowManage(false);
  };

  const handleToggleManage = () => {
    setShowManage(!showManage);
    setShowSettings(false);
    setShowOverview(false);
  };

  return (
    <>
      <Menu>
        <Menu.Item header>
          <Icon name="dashboard" />
          PBA :: Dashboard
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
              {showOverview ? "Analytics Overview" : "Analytics Overview"}
            </Label>
          </Menu.Item>
          <Menu.Item>
            <Label
              style={{
                backgroundColor: "#1B67AA",
                fontWeight: "bold",
                cursor: "pointer",
                color: "#ffffff",
              }}
              onClick={handleToggleManage}
            >
              {showManage ? (
                <>
                  Cash Flow
                </>
              ) : (
                <>
                  Cash Flow
                </>
              )}
            </Label>
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Item>
            <Label
              style={{
                backgroundColor: "#1B67AA",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={handleToggleSettings}
            >
              {showSettings ? "Settings" : "Settings"}
            </Label>
          </Menu.Item>
          <Menu.Item>
            {/* <Button onClick={handleLogout}>Logout</Button> */}
            <DropdownTriggerMenu />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      {showOverview && <Overview />}
      {showSettings && <SettingsComponent />}
      {showManage && <ManagePane />}
      <ExpenseList />
      <IncomeList />
    </>
  );
};

export default Dashboard;
