import React, {createContext, useEffect, useMemo, useState} from "react";
import axios from "axios";

const Store = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [firstState, setState] = useState({});
    const [finalState, setFinalState] = useState({});

    const [idArray, setIdArray] = useState([]);

    const [totalIncome, setTotalIncome] = useState([]);
    const [averageIncome, setAverageIncome] = useState([]);
    const [lastMonthIncome, setLastMonthIncome] = useState([]);

    const [dataPreparing, setDataPreparing] = useState(true);

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
        const todayDate = new Date();
        const todayMonth = todayDate.getMonth() + 1;
        const todayYear = todayDate.getFullYear();
        if (!idArray[0]) {
            return;
        }
        for (let i = 0; i <= idArray.length - 1; i++) {
            let counter = idArray[i];
            axios
                .get(`https://recruitment.hal.skygate.io/incomes/${counter}`)
                .then((response) => {
                    if (!response.data) {
                        return;
                    }
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
                            //setting dates to sum last month income
                            const date = new Date(currentValue.date);
                            const dateMonth = date.getMonth() + 1;
                            const dateYear = date.getFullYear();

                            if (todayMonth - dateMonth === 3 && todayYear === dateYear) {
                                total += parseFloat(currentValue.value);
                            }
                            return total;
                        },
                        0
                    );
                    totalIncomeArray[i] = parseFloat(totalIncome.toFixed(2));
                    averageIncomeArray[i] = parseFloat(averageIncome.toFixed(2));
                    lastMonthIncomeArray[i] = parseFloat(lastMonthIncome.toFixed(2));
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
    }, [idArray]);

    useEffect(() => {
        // setTimeout(() => {
        //
        // }, 4000);
        const copiedState = firstState;

        for (let i = 0; i <= copiedState.length - 1; i++) {
            copiedState[i].totalIncome = totalIncome[i];
            copiedState[i].averageIncome = averageIncome[i];
            copiedState[i].lastMonthIncome = lastMonthIncome[i];
        }

        setFinalState(copiedState);
            setDataPreparing(false);

    }, [totalIncome, averageIncome, lastMonthIncome]);

    return (
        <errorContext.Provider value={error}>
            <dataPrepareContext.Provider value={dataPreparing}>
                <stateContext.Provider value={finalState}>
                    <loadingContext.Provider value={loading}>
                        {children}
                    </loadingContext.Provider>
                </stateContext.Provider>
            </dataPrepareContext.Provider>
        </errorContext.Provider>
    );
};

export const stateContext = createContext();
export const loadingContext = createContext();
export const errorContext = createContext();
export const dataPrepareContext = createContext();
export default Store;
