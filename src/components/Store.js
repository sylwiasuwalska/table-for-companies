import React, { createContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

const Store = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [firstState, setState] = useState({});
  const [finalState, setFinalState] = useState({});

  const [idArray, setIdArray] = useState([]);

  const [totalIncome, setTotalIncome] = useState([]);
  const [averageIncome, setAverageIncome] = useState([]);
  const [lastMonthIncome, setLastMonthIncome] = useState([]);

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
        setError(true);
      });
  }, []);

  const newIdArray = (array) => {
    return Object.values(array).map((element) => element.id);
  };

  const incomeDataFetch = () => {
    const totalIncomeArray = [];
    const averageIncomeArray = [];
    const lastMonthIncomeArray = [];
    if (!idArray[0]) { return ;}
    for (let i = 0; i <= idArray.length-1; i++) {
      let counter = idArray[i];
      console.log(i + "przed "+ counter)
      axios
        .get(`https://recruitment.hal.skygate.io/incomes/${counter}`)
        .then((response) => {
          if (!response.data) {
            return;
          }
            console.log(i + "po1 "+ counter)
          //setting total income
          let totalIncome = 0;
          totalIncome = Object.values(response.data.incomes).reduce(
            (total, currentValue) => {
              currentValue = parseFloat(currentValue.value);
              return total + currentValue;
            },
            0
          );

          //setting average income
          let averageIncome = 0;
          averageIncome = totalIncome / 12;

          //setting last month income
          let lastMonthIncome = 0;
          lastMonthIncome = Object.values(response.data.incomes).reduce(
            (total, currentValue) => {
              let date = new Date(currentValue.date);
              if (date.getMonth() + 1 === 12) {
                total += parseFloat(currentValue.value);
              }
              return total;
            },
            0
          );
            console.log(i + "po3 "+ counter)
          totalIncomeArray[i] = (parseFloat(totalIncome.toFixed(2)));
          averageIncomeArray[i] = (parseFloat(averageIncome.toFixed(2)));
          lastMonthIncomeArray[i] = (parseFloat(lastMonthIncome.toFixed(2)));
        })
        .catch((error) => {
          setError(true);
        });
    }

    setTotalIncome(totalIncomeArray);
    setAverageIncome(averageIncomeArray);
    setLastMonthIncome(lastMonthIncomeArray);
  };

  useMemo(() => {
    setIdArray(newIdArray(firstState));
  }, [firstState]);

  //based on array of ids, setting income information

    useEffect(() => {
        incomeDataFetch();
    }, [idArray])

  useEffect(() => {
    setTimeout(() => {
      const copiedState = firstState;

      for (let i = 0; i <= copiedState.length - 1; i++) {
        copiedState[i].totalIncome = totalIncome[i];
        copiedState[i].averageIncome = averageIncome[i];
        copiedState[i].lastMonthIncome = lastMonthIncome[i];
      }

      setFinalState(copiedState);
    }, 2500);
  }, [totalIncome, averageIncome, lastMonthIncome]);

  return (
    <errorContext.Provider value={error}>
      <stateContext.Provider value={finalState}>
        <loadingContext.Provider value={loading}>
          {children}
        </loadingContext.Provider>
      </stateContext.Provider>
    </errorContext.Provider>
  );
};

export const stateContext = createContext();
export const loadingContext = createContext();
export const errorContext = createContext();
export default Store;
