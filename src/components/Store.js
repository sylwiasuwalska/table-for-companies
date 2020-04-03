import React, { createContext, useEffect, useState } from "react";

const Store = ({ children }) => {
  const [state, setData] = useState({ data: [0] });
  const [income, setIncome] = useState({});
  const [incomesTotal, setTotalIncome] = useState({ id: 0 });
  const [isFetching, setFetchingState] = useState(true);

  async function fetchData() {
    setFetchingState(true);
    const res = await fetch("https://recruitment.hal.skygate.io/companies");
    res
      .json()
      .then((res) => {
        setData({ ...state, data: res });
        setFetchingState(false);
      })
      .catch();
  }

  async function fetchIncomeData(id) {
    const res = await fetch(
      `https://recruitment.hal.skygate.io/incomes/${id} `
    );
    res
      .json()
      .then((res) => setIncome(res))
      .catch();
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isFetching) {
      for (let i = 0; i < 2; i++) {
        fetchIncomeData(state.data[i].id);
      }
    }
  }, [isFetching]);
  //
  // useEffect(() => {
  //   if (!isFetching) {
  //     console.log(income.id)
  //     const totalIncome = Object.values(income.incomes).reduce(
  //       (total, currentValue) => {
  //         currentValue = parseInt(currentValue.value);
  //
  //         return total + currentValue;
  //       },
  //       0
  //     )
  //     console.log(income.id);
  //     setTotalIncome(incomesTotal => ({...incomesTotal, id: totalIncome  }))
  //
  //     console.log(incomesTotal);
  //     const averageIncome = totalIncome/12;
  //   }
  // }, [income]);

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export const Context = createContext();
export default Store;
