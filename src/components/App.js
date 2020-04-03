import React, {createContext, useEffect, useState} from 'react';
import '../App.css';

function App() {

    const [state, setData] = useState({});
    const Context = createContext(state);

    async function fetchData() {
        const res = await fetch("https://recruitment.hal.skygate.io/companies");
        res
            .json()
            .then(res => setData(res))
            .catch();
    }

    useEffect(() => {
        fetchData();
        console.log(state)
    });


    return (
        <Context.Provider value={state}>
            <div className="App">
                <header className="App-header">
                    Table of companies data
                </header>

            </div>
        </Context.Provider>
    );
}

export default App;
