import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const Store = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [state, setState] = useState({});




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
