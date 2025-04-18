import { useState } from "react"
import { dataInsert } from "../../utils/dataInsert";

export default function Vehicles() {

    const [activeSignIns, setActiveSignIns] = useState([]);

    const [inputs, setInputs] = useState({
        vehicle: "",
        name: "",
        id: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs ((prev) => ({...prev, [name]: value}));
    }

    const handleSignIn = async (e) => {
        e.preventDefault();

        if(!inputs.vehicle || !inputs.name || !inputs.id) {
            alert("Please fill out all the fields")
            return;
        }

        const record = {
            vehicle: inputs.vehicle,
            employee_name: inputs.name,
            employee_id: inputs.id,
            sign_in_time: new Date().toLocaleString(),
        }

        const {success} = await dataInsert("vehicles", record);
        if (success) {
            setInputs({vehicle: "", name: "", id: ""});
        }

        setActiveSignIns([...activeSignIns, {...inputs, signInTime: new Date().toLocaleString()}]);

    };

    const handleSignOut = (index) => {
        // const signOutTime = new Date().toLocaleString();

        // const signedOutVehicle = {...activeSignIns[index], signOutTime};
        // setHistory([...history, signedOutVehicle]);

        setActiveSignIns(activeSignIns.filter((_, i) => i !== index));
    }


    return(
        <div className="main-container">
            <h1>Vehicles</h1>
            <form onSubmit={handleSignIn}>
                <label>
                    Vehicle
                    <select name = "vehicle" value={inputs.vehicle} onChange={handleChange}>
                    <option value="SELECT VEHICLE">SELECT VEHICLE</option>
                        <option value="SEUS 01">SEUS 01</option>
                        <option value="SEUS 03">SEUS 03</option>
                        <option value="SEUS 10">SEUS 10</option>
                        <option value="SEUS 11">SEUS 11</option>
                        <option value="SEUS 12">SEUS 12</option>
                        <option value="SEUS 14">SEUS 14</option>
                        <option value="SEUS 25">SEUS 25</option>
                        <option value="SEUS 26">SEUS 26</option>
                        <option value="SEUS 27">SEUS 27</option>
                        <option value="SEUS 28">SEUS 28</option>
                    </select>
                </label>

                <label>
                   Employee Name
                    <input 
                        type="text"
                        name="name"
                        value={inputs.name}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Employee ID
                    <input 
                        type="text"
                        name="id"
                        value={inputs.id}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Sign In</button>
            </form>

            <div className="active-container">
                <h2>Active Sign-Ins</h2>
                <ul>
                    {activeSignIns.length > 0 ? (
                        activeSignIns.map((entry, index) => (
                            <li key={index}>
                                <strong>{entry.vehicle}</strong> - {entry.name} (ID: {entry.id})
                                <br />
                                <small>Signed in at: {entry.signInTime}</small>
                                <button onClick={() => handleSignOut(index)}>Sign Out</button>
                            </li>
                        ))
                        
                    ) : (   
                        <p>No active sign-ins</p>
                    )}
                </ul>
            </div>
        </div>
    )
}