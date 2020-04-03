import React, { useContext } from "react";
import { Context } from "./Store";
import "../Table.css";

function Table() {
  const state = useContext(Context);

  const renderTableHeader = () => {
    let tableHeader = Object.keys(state.data[0]);
    return tableHeader.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderTableData = () => {

    return state.data.map((data, index) => {
      const { id, name, city } = data; //destructuring
      return (
        <tr key={`row ${id}`}>
          <td key={`${id}.${id}`}>
            {id}
          </td>
          <td key={`${id}.${name}`}>
            {name}
          </td>
          <td key={`${id}.${city}`}>
            {city}
          </td>
        </tr>
      );
    });
  };

    //preventing from render when data is not fetched yet
    if (!state.data[0]) {
        return <div />
    }

  return (
    <div className="tableContainer">
      <table id="company-data">
        <tbody>
          <tr>{renderTableHeader()}</tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
