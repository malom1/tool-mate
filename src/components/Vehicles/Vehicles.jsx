import { useState } from "react"

export default function Vehicles() {

    const [inputs, setInputs] = useState("");

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs (values => ({...values, [name]: value}));

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
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