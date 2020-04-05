const Main = ({ dataProps }) => {
    const [data, setData] = useState(dataProps);
    const [field, setField] = useState(null);
    const sortById = (field) => {
        let sortedData = data.slice().sort((a, b) => {
            if(a[field] < b[field]) { return -1; }
            if(a[field] > b[field]) { return 1; }
            return 0;
        });
        setData(sortedData);
    };
    return (
        <table>
            <thead>
            <tr>
                <th>iD <div className="arrows"><div onClick={() => sortById("id")} className="arrow-up"/></th>
                <th>First name <div className="arrows"><div onClick={() => sortById("firstName")} className="arrow-up"/></div></th>
            </tr>
            </thead>
            <tbody>
            {data.map((user) => {
                return <tr key={user.id}>
                    <td className="number">{user.id}</td>
                    <td className="firstname">{user.firstName}</td>
                </tr>
            })}
            </tbody>
        </table>
);
};