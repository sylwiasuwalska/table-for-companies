import React, {createContext, useEffect, useState} from "react";
import axios from "axios";

const Store = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [firstState, setState] = useState({});
    const [finalState, setFinalState] = useState({})
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
                setError("Something went wrong");
            });
    }, []);

    const newIdArray = (array) => {
        let copiedState = array;
        return Object.values(copiedState).map((element) => element.id);
    };

    useEffect(() => {
        setIdArray(newIdArray(firstState));
    }, [firstState]);

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
                });
        }
        //setIncomeState(incomeStateArray);
        setTotalIncome(totalIncomeArray);
        setAverageIncome(averageIncomeArray);
        setLastMonthIncome(lastMonthIncomeArray);


    }, [idArray]);

    useEffect(() => {
        setTimeout(() => {
            const copiedState = firstState;
            for (let i = 0; i <= copiedState.length - 1; i++) {

                copiedState[i].totalIncome = totalIncome[i];
                copiedState[i].avgIncome = averageIncome[i];
                copiedState[i].lastMonthIncome = lastMonthIncome[i];
            }
            setFinalState(copiedState);
        }, 3000)


    }, [lastMonthIncome])

    return (
        <stateContext.Provider value={finalState}>
            <loadingContext.Provider value={loading}>
                {children}
            </loadingContext.Provider>
        </stateContext.Provider>
    );
};

export const stateContext = createContext();
export const loadingContext = createContext();
export default Store;
