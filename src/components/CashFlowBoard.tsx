import React from "react";

import ExpenseList from "./ExpenseList";
import IncomeList from "./IncomeList";


const CashFlowBoard: React.FC = () => {

  return (
    <>
      <ExpenseList />
      <IncomeList />
    </>
  );
};

export default CashFlowBoard;
