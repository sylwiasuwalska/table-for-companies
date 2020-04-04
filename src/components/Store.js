import React, {createContext, useEffect,  useState} from "react";
import axios from "axios";

const initialState = {
  data: {}
}
const Store = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [state, setState] = useState(initialState)

  // const totalIncome = Object.values(incomeData.incomes).reduce(
  //   (total, currentValue) => {
  //     currentValue = parseInt(currentValue.value);
  //     return total + currentValue;
  //   },
  //   0
  // );

  //data[i].totalIncome = "value3";
  //     data[i].avgIncome = "value3";
  //     data[i].lastMonthIncome = "value3";

  useEffect(() => {
  axios
      .get('https://recruitment.hal.skygate.io/companies')
      .then(response => {
        setLoading(false)
        setState(response.data)
        setError('')
      })
      .catch(error => {
        setLoading(false)
        setState('')
        setError('Something went wrong')
      })


  },[])
  return <Context.Provider value={state}>

    {children}</Context.Provider>;
};

export const Context = createContext();
export default Store;
