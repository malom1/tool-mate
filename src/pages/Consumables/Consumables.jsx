import { useState } from "react"

export default function Consumables() {
    const [inputs, setInputs] = useState({

        name: "",
        id: "",
        airline: "",
        oil: "",

    });
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs((prev) => ({...prev, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const time = new Date().toLocaleString();
        console.log(inputs, time);
    }


    return (
        <div className="consumables-container">
            <h1>Oil/Hydraulics Management</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Select an airline:
                    <select name = "airline" value={inputs.airline} onChange={handleChange}>
                        <option value="Air India">Air India</option>
                        <option value="Etihad Airways">Etihad Airways</option>
                        <option value="Hawaiian Airlines">Hawaiian Airlines</option>
                        <option value="Kenya Airways">Kenya Airways</option>
                        <option value="Uzbekistan Airways">Uzbekistan Airways</option>
                        <option value="Singapore Airlines">Singapore Airlines</option>
                        <option value="Philippines Airlines">Philippines Airlines</option>
                    </select>
                </label>

                <label>
                    Select the oil:
                    <select name = "oil" value={inputs.oil} onChange={handleChange}>
                        <option value="Eastman 2197">Eastman 2197</option>
                        <option value="Mobil Jet II">Mobil Jet II</option>
                        <option value="Mobil Jet 387">Mobil Jet 387</option>
                    </select>
                </label>

                <label>
                    Name:
                    <input 
                        type="text"
                        name="name"
                        value={inputs.name}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Employee ID:
                    <input 
                        type="text"
                        name="id"
                        value={inputs.id}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}