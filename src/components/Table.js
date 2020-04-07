import React, {Fragment, useContext, useEffect, useState} from "react";
import {dataPreparingContext, errorContext, stateContext} from "./Store";
import Pagination from "./Pagination";
import "../Table.css";
import loader from "../ring.svg";
import Filtering from "./Filtering";

function Table() {
    const state = useContext(stateContext);
    const error = useContext(errorContext);
    const dataPreparing = useContext(dataPreparingContext);

    const [data, setData] = useState(state);

    const [sortDirection, setSortDirection] = useState("ascending");
    const [fieldToSort, setFieldToSort] = useState(null);

    const [filterWord, setFilterWord] = useState();

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(20);

    //sorting

    const sortByField = (field) => {
        setFieldToSort(field);
        let sortedData = data.slice().sort((a, b) => {
            if (a[field] < b[field]) {
                return sortDirection === "ascending" ? -1 : 1;
            }
            if (a[field] > b[field]) {
                return sortDirection === "ascending" ? 1 : -1;
            }
            return 0;
        });
        setData(sortedData);

        sortDirection === "ascending"
            ? setSortDirection("descending")
            : setSortDirection("ascending");
    };

    const getSortIndicator = (field) => {
        return field === fieldToSort ? sortDirection : undefined;
    };

    //filtering

    const filterList = (array) => {
        let filteredData = Object.values(array);
        filteredData = filteredData.filter((data) => {
            return (
                data.id.toString().search(filterWord.toLowerCase()) !== -1 ||
                data.name.toLowerCase().search(filterWord.toLowerCase()) !== -1 ||
                data.city.toLowerCase().search(filterWord.toLowerCase()) !== -1 ||
                data.totalIncome.toString().search(filterWord.toLowerCase()) !== -1 ||
                data.averageIncome.toString().search(filterWord.toLowerCase()) !== -1 ||
                data.lastMonthIncome.toString().search(filterWord.toLowerCase()) !== -1
            );
        });
        setData(filteredData);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderTableData = () => {
        //pagination
        const indexOfLastRow = currentPage * rowsPerPage;
        const indexOfFirstRow = indexOfLastRow - rowsPerPage;
        const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

        return Object.values(currentRows).map((data) => {
            const {
                id,
                name,
                city,
                totalIncome,
                averageIncome,
                lastMonthIncome,
            } = data;

            return (
                <tr key={`row ${id}`}>
                    <td key={`${id}.${id}`}>{id}</td>
                    <td key={`${id}.${name}`}>{name}</td>
                    <td key={`${id}.${city}`}>{city}</td>
                    <td key={`${id}.${totalIncome}`}>{totalIncome}</td>
                    <td key={`${id}.${averageIncome}`}>{averageIncome}</td>
                    <td key={`${id}.${lastMonthIncome}`}>{lastMonthIncome}</td>
                </tr>
            );
        });
    };

    useEffect(() => {
        filterList(state);
    }, [filterWord]);

    useEffect(() => {
        if (state[0]) {
            setData(state);
        }
    }, [state]);

    //preventing from render when server doesn't respond
    if (error) {
        return (
            <div>
                <p>Retrieving data was unsuccessful. Check internet connection.</p>
            </div>
        );
    }

    //preventing from render when data is not prepared yet
    if (dataPreparing) {
        return (
            <div>
                <img src={loader} alt="ball" height="100px" width="100px"/>
                <p>Preparing your data. Please wait.</p>
            </div>
        );
    }

    return (
        <Fragment>
            <div className="tableContainer">
                <div>
                    <Filtering
                        setFilterWord={setFilterWord}
                        setCurrentPage={setCurrentPage}
                    />
                    <Pagination
                        rowsPerPage={rowsPerPage}
                        totalRows={state.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>
                            <button
                                type="button"
                                onClick={() => sortByField("id")}
                                className={getSortIndicator("id")}
                            >
                                ID
                            </button>
                        </th>
                        <th>
                            <button
                                type="button"
                                onClick={() => sortByField("name")}
                                className={getSortIndicator("name")}
                            >
                                Name
                            </button>
                        </th>
                        <th>
                            <button
                                type="button"
                                onClick={() => sortByField("city")}
                                className={getSortIndicator("city")}
                            >
                                City
                            </button>
                        </th>
                        <th>
                            <button
                                type="button"
                                onClick={() => sortByField("totalIncome")}
                                className={getSortIndicator("totalIncome")}
                            >
                                Total Income
                            </button>
                        </th>
                        <th>
                            <button
                                type="button"
                                onClick={() => sortByField("averageIncome")}
                                className={getSortIndicator("averageIncome")}
                            >
                                Average Income
                            </button>
                        </th>
                        <th>
                            <button
                                type="button"
                                onClick={() => sortByField("lastMonthIncome")}
                                className={getSortIndicator("lastMonthIncome")}
                            >
                                Last Month Income
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>{renderTableData()}</tbody>
                </table>
            </div>
        </Fragment>
    );
}

export default Table;
