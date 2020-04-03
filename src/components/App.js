import React, {} from 'react';
import '../App.css';
import Store from "./Store";
import Table from "./Table";


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
