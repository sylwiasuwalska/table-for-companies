import React, { useContext, useEffect, useState } from "react";
import { stateContext, loadingContext } from "./Store";
import "../Table.css";
import axios from "axios";

function Table() {
  const state = useContext(stateContext);
  const loading = useContext(loadingContext);

  const renderTableHeader = () => {
    let tableHeader = Object.keys(state[0]);
    return tableHeader.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderTableData = () => {
    return state.map((data, index) => {
      const { id, name, city } = data; //destructuring
      return (
        <tr key={`row ${id}`}>
          <td key={`${id}.${id}`}>{id}</td>
          <td key={`${id}.${name}`}>{name}</td>
          <td key={`${id}.${city}`}>{city}</td>
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
          <tr>{renderTableHeader()}</tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
