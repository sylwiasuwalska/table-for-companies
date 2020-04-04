import React, { useContext} from "react";
import { stateContext} from "./Store";
import "../Table.css";


function Table() {
  const state = useContext(stateContext);




  const renderTableData = () => {
    return state.map((data, index) => {
      const { id, name, city, totalIncome, averageIncome, lastMonthIncome } = data; //destructuring
      return (
        <tr key={`row ${id}`}>
          <td key={`${id}.${id}`}>{id}</td>
          <td key={`${id}.${name}`}>{name}</td>
          <td key={`${id}.${city}`}>{city}</td>
          <td key={`${id}.${totalIncome}`}>{totalIncome}</td>
          <td key={`${id}.${averageIncome}`}>{averageIncome}</td>
          <td key={`${id}.${lastMonthIncome}`}>{lastMonthIncome}</td>

        </tr>
      );
    });
  };

  //preventing from render when data is not fetched yet
  if (!state[0]) {
    return <div />;
  }

  return (
    <div className="tableContainer">
      <table id="company-data">
        <tbody>
          <tr>
              <th>ID</th>
              <th>Name</th>
              <th>City</th>
              <th>Total Income</th>
              <th>Average Income</th>
              <th>Last Month Income</th>
          </tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
