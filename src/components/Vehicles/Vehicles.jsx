import { useState } from "react"

export default function Vehicles() {

    const [activeSignIns, setActiveSignIns] = useState([]);

    const [history, setHistory] = useState([]);

    const [inputs, setInputs] = useState({
        vehicle: "",
        name: "",
        id: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs ((prev) => ({...prev, [name]: value}));
    }

    const handleSignIn = (e) => {
        e.preventDefault();

        if(!inputs.vehicle || !inputs.name || !inputs.id) {
            alert("Please fill out all the fields")
            return;
        }

        const time = new Date().toLocaleString();

        setActiveSignIns([...activeSignIns, {...inputs, signInTime: time}]);

        setInputs({vehicle: "", name: "", id: ""});

    }

    const handleSignOut = (index) => {
        const signOutTime = new Date().toLocaleString;

        const signedOutVehicle = {...activeSignIns[index], signOutTime};
        setHistory(...history, signedOutVehicle);

        setActiveSignIns(activeSignIns.filter((_, i) => i !== index));
    }


    return(
        <div className="vehicles-container">
            <h1>Vehicles</h1>
            <form onSubmit={handleSignIn}>
                <label>
                    Select a vehicle:
                    <select name = "vehicle" value={inputs.vehicle} onChange={handleChange}>
                        <option value="SEUS 01">SEUS 01</option>
                        <option value="SEUS 03">SEUS 03</option>
                        <option value="SEUS 10">SEUS 10</option>
                        <option value="SEUS 11">SEUS 11</option>
                        <option value="SEUS 12">SEUS 12</option>
                        <option value="SEUS 14">SEUS 14</option>
                        <option value="SEUS 26">SEUS 26</option>
                        <option value="SEUS 27">SEUS 27</option>
                        <option value="SEUS 28">SEUS 28</option>
                    </select>
                </label>

                <label>
                    Name:
                    <input 
                        type="text"
                        name="name"
                        value={inputs.name || ""}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Employee ID:
                    <input 
                        type="text"
                        name="id"
                        value={inputs.id || ""}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Sign In</button>
            </form>

            <h2>Active Sign-Ins</h2>
            <ul>
                {activeSignIns > 0 ? (
                    activeSignIns.map((entry, index) => (
                        <li key={index}>
                            <strong>{entry.vehicle}</strong> - {entry.name} (ID: {entry.id})
                            <br />
                            <small>Signed in at: {entry.signInTime}</small>
                            <button onClick={handleSignOut(index)}>Sign Out</button>
                        </li>
                    ))
                ): (
                    <p>No active sign-ins</p>
                )}
            </ul>

            <h2>Vehicle History</h2>
            <table>
                <thead>
                    <tr>
                        <th>Vehicle</th>
                        <th>Name</th>
                        <th>Employee ID</th>
                        <th>Sign In Time</th>
                        <th>Sign Out Time</th>
                    </tr>
                </thead>
                <tbody>
                    {history.length > 0 ? (
                        history.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.vehicle}</td>
                                <td>{entry.name}</td>
                                <td>{entry.id}</td>
                                <td>{entry.signInTime}</td>
                                <td>{entry.signOutTime}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5"> No history yet</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}