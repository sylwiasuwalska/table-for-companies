import React, {createContext, useEffect, useState} from "react";



const Store = ({children}) => {

    const [state, setData] = useState({data: [0]});

    async function fetchData() {
        const res = await fetch("https://recruitment.hal.skygate.io/companies");
        res
            .json()
            .then(res => setData({ ...state, data: res}))
            .catch();
    }



    useEffect(() => {
        fetchData();
    },[]);


    return (
        <Context.Provider value={state}>{children}</Context.Provider>
    );
};

export const Context = createContext();
export default Store;
