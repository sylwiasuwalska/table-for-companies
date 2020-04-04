import React, { useContext, useEffect, useState } from "react";
import { stateContext, loadingContext } from "./Store";
import axios from "axios";

function DataPrepare(props) {
  const state = useContext(stateContext);
  const loading = useContext(loadingContext);
  const [idArray, setIdArray] = useState([]);
  const [incomeState, setIncomeState] = useState([]);
  const [totalIncome, setTotalIncome] = useState([]);
  const [averageIncome, setAverageIncome] = useState([]);
  const [lastMonthIncome, setLastMonthIncome] = useState([]);

  //getting array of ids based on state

  const newIdArray = (array) => {
    let copiedState = array;
    return Object.values(copiedState).map((element) => element.id);
  };

  useEffect(() => {
    setIdArray(newIdArray(state));
  }, [state]);

  //based on array of ids, setting income information

  useEffect(() => {
    const totalIncomeArray = [];
    const averageIncomeArray = [];
    const lastMonthIncomeArray = [];
    const incomeStateArray = [];
    for (let i = 0; i <= idArray.length - 1; i++) {
      let counter = idArray[i];
      axios
        .get(`https://recruitment.hal.skygate.io/incomes/${counter}`)
        .then((response) => {
          if (!response.data) {
            console.log("here");
            return;
          }

          const incomeStateCurrent = response.data;
          incomeStateArray.push(incomeStateCurrent);
          console.log(incomeStateCurrent, counter);
          console.log(i, incomeStateArray.length);

          //setting total income
          const totalIncome = Object.values(response.data.incomes).reduce(
            (total, currentValue) => {
              currentValue = parseFloat(currentValue.value);
              return total + currentValue;
            },
            0
          );

          //setting average income
          const averageIncome = totalIncome / 12;

          //setting last month income
          const lastMonthIncome = Object.values(response.data.incomes).reduce(
            (total, currentValue) => {
              let date = new Date(currentValue.date);
              if (date.getMonth() + 1 === 12) {
                total += parseFloat(currentValue.value);
              }
              return total;
            },
            0
          );

          totalIncomeArray.push(totalIncome);
          averageIncomeArray.push(averageIncome);
          lastMonthIncomeArray.push(lastMonthIncome);
            console.log(i, totalIncomeArray.length);
        });
    }
    setIncomeState(incomeStateArray);
    setTotalIncome(totalIncomeArray);
    setAverageIncome(averageIncomeArray);
    setLastMonthIncome(lastMonthIncomeArray);
  }, [idArray]);

  return <div></div>;
}

export default DataPrepare;
