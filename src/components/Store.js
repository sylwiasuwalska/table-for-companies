import React, {createContext, useEffect, useState} from "react";
import axios from "axios";

const Store = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [dataPreparing, setDataPreparing] = useState(true);

    const [finalState, setFinalState] = useState({});


    useEffect(() => {
        axios
            .get("https://recruitment.hal.skygate.io/companies")
            .then((response) => {
                setLoading(false);
                setError("");
                return response.data;
            })
            .then((data) => {
                const dataArray = newIdArray(data);
                return [dataArray, data];
            })
            .then((data) => {
                incomeDataFetch(data[0], data[1]);
            })
            .catch(() => {
                setLoading(false);
                setFinalState("");
                setError(true);
            });
    }, []);

    const newIdArray = (array) => {
        return Object.values(array).map((element) => element.id);
    };

    const incomeDataFetch = (arrayID, dataState) => {
        const finalScores = dataState;
        const todayDate = new Date();
        const todayMonth = todayDate.getMonth() + 1;
        const todayYear = todayDate.getFullYear();
        const responses = [];

        for (let i = 0; i <= arrayID.length - 1; i++) {
            let counter = arrayID[i];

            responses[i] = axios
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

                    finalScores[i].totalIncome = parseFloat(totalIncome.toFixed(2));
                    finalScores[i].averageIncome = parseFloat(averageIncome.toFixed(2));
                    finalScores[i].lastMonthIncome = parseFloat(
                        lastMonthIncome.toFixed(2)
                    );
                })
                .catch(() => {
                    setError(true);
                });
        }

        Promise.all(responses).then(() => {
            setFinalState(finalScores);
            setDataPreparing(false);
        });
    };

    return (
        <errorContext.Provider value={error}>
            <dataPreparingContext.Provider value={dataPreparing}>
                <stateContext.Provider value={finalState}>
                    <loadingContext.Provider value={loading}>
                        {children}
                    </loadingContext.Provider>
                </stateContext.Provider>
            </dataPreparingContext.Provider>
        </errorContext.Provider>
    );
};

export const stateContext = createContext();
export const loadingContext = createContext();
export const errorContext = createContext();
export const dataPreparingContext = createContext();
export default Store;
