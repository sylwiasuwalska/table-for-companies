import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const Store = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [state, setState] = useState({});
  const [idArray, setIdArray] = useState([]);
  const [totalIncome, setTotalIncome] = useState([]);
  const [averageIncome, setAverageIncome] = useState([]);


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
    const lastMonthIncomeArray =[];
    for (let i = 0; i < 3; i++) {
      let counter = idArray[i];
      axios
        .get(`https://recruitment.hal.skygate.io/incomes/${counter}`)
        .then((response) => {
          if (!response.data) {
            return;
          }
          console.log(response.data.incomes[0].date);
          const totalIncome = Object.values(response.data.incomes).reduce(
            (total, currentValue) => {
              currentValue = parseInt(currentValue.value);
              return total + currentValue;
            },
            0
          );
          const averageIncome = Math.round(totalIncome / 12);


          totalIncomeArray.push(totalIncome);
          setTotalIncome(totalIncomeArray);
          averageIncomeArray.push(averageIncome);
          setAverageIncome(averageIncomeArray);
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
