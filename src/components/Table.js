import React, {useContext, useEffect, useMemo, useState} from "react";
import { stateContext } from "./Store";
import "../Table.css";
import loader from "../ring.svg";

function Table() {
    const state = useContext(stateContext);
    const [data, setData] = useState(state);



    // const sorted = useMemo(() => {
    //     if(!field) return data;
    //     return data.slice().sort((a, b) => a[field].localeCompare(b[field]));
    // }, [ data, field]);


    const sortByField = (field) => {

        let sortedData = data.slice().sort((a, b) => {

            if(a[field] < b[field]) { return -1; }
            if(a[field] > b[field]) { return 1; }
            return 0;
        });
        setData(sortedData);

    };

  const renderTableData = () => {

    return Object.values(data).map((data, index) => {
      const {
        id,
        name,
        city,
        totalIncome,
        averageIncome,
        lastMonthIncome,
      } = data;

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

  useEffect(()=>{
      if (state[0]) {
          setData(state) }
  },[state])

  //preventing from render when data is not fetched yet
  if (!state[0]) {
    return (
      <div>
        <img src={loader} alt="ball" height="100px" width="100px" />
        <p>Preparing your data. Please wait.</p>
      </div>
    );
  }

  return (
    <table className="tableContainer">
      <thead>
        <tr>
          <th>
            <button type="button" onClick={() => sortByField('id')}>
              ID
            </button>
          </th>
          <th><button type="button" onClick={() => sortByField('name')}>
              Name
          </button></th>
          <th><button type="button" onClick={() => sortByField('city')}>
              City
          </button></th>
          <th><button type="button" onClick={() => sortByField('totalIncome')}>
              Total Income
          </button></th>
          <th><button type="button" onClick={() => sortByField('averageIncome')}>
              Average Income
          </button></th>
          <th><button type="button" onClick={() => sortByField('lastMonthIncome')}>
              Last Month Income
          </button></th>
        </tr>
      </thead>
      <tbody>{renderTableData()}</tbody>
    </table>
  );
}

export default Table;
