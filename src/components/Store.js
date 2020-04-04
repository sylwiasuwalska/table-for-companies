import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const Store = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [state, setState] = useState({});
  const [idArray, setIdArray] = useState([]);
  const [totalIncome, setTotalIncome] = useState([]);
  const [averageIncome, setAverageIncome] = useState([]);
  const [lastMonthIncome, setLastMonthIncome] = useState([]);

  //data[i].totalIncome = "value3";
  //     data[i].avgIncome = "value3";
  //     data[i].lastMonthIncome = "value3";

  useEffect(() => {
    axios
      .get("https://recruitment.hal.skygate.io/companies")
      .then((response) => {
        setLoading(false);
        setState(response.data);
        setError("");
      })
      .catch((error) => {
        setLoading(false);
        setState("");
        setError("Something went wrong");
      });
  }, []);

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
    for (let i = 0; i <= state.length - 1; i++) {

      let counter = idArray[i];
      console.log(idArray.length)
      axios
        .get(`https://recruitment.hal.skygate.io/incomes/${counter}`)
        .then((response) => {
          if (!response.data) {
            return;
          }
            setTimeout(function () {}, 500);

          //setting total income
          const totalIncome = Object.values(response.data.incomes).reduce(
            (total, currentValue) => {
              currentValue = parseFloat(currentValue.value);
              return total + currentValue;
            },
            0
          );

          //setting average income
          const averageIncome = (totalIncome / 12);

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
          setTotalIncome(totalIncomeArray);
          averageIncomeArray.push(averageIncome);
          setAverageIncome(averageIncomeArray);
          lastMonthIncomeArray.push(lastMonthIncome);
          setLastMonthIncome(lastMonthIncomeArray);
        });
    }
  }, [idArray]);

  return (
    <stateContext.Provider value={state}>
      <loadingContext.Provider value={loading}>
        {children}
      </loadingContext.Provider>
    </stateContext.Provider>
  );
};

export const stateContext = createContext();
export const loadingContext = createContext();
export default Store;
