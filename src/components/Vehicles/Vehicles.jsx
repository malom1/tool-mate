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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
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
            <form onSubmit={handleSubmit}>
                <label>
                    Select a vehicle:
                    <select value = {inputs.vehicle || ""} onChange={handleChange} name="vehicle">
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
                <button>Submit</button>
            </form>
        </div>
    )
}