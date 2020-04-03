import React, {} from 'react';
import '../App.css';
import Table from "./Table";
import Store from "./Store";

function App() {


    return (
        <Store>
            <div className="App">
                <header className="App-header">
                    Table of companies data
                </header>
                <Table/>

            </div>
        </Store>
    );
}
export default App;
