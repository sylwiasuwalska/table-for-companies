import React, {} from 'react';
import '../App.css';
import Store from "./Store";
import Table from "./Table";


function App() {
    return (
        <Store>
            <div className="App">
                <header className="appHeader">
                    <h1>Companies data</h1>
                </header>
                <Table/>
            </div>
        </Store>
    );
}
export default App;
