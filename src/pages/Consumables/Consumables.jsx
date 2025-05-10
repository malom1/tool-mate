import { useState } from "react"
import { dataInsert } from "../../utils/dataInsert";
import { generatePDF } from "../../utils/generatePDF";
import { formatDate } from "../../utils/timeDateFormatter";

export default function Consumables() {
    const [inputs, setInputs] = useState({

        name: "",
        id: "",
        airline: "",
        oil: "",
        quantity: "",

    });
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs((prev) => ({...prev, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const records = {
            airline: inputs.airline,
            oil: inputs.oil,
            quantity: inputs.quantity,
            employee_name: inputs.name,
            employee_id: inputs.id,
            sign_in_time: new Date().toLocaleDateString(),
        }

        const { success } = await dataInsert("consumables", records);
        if (success) {
            setInputs({
                name: "",
                id: "",
                airline: "",
                oil: "",
                quantity: "",
            });
        }
    }


    return (
        <div className="consumables-container">
            <h1>Oils & Hydraulics Management</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Airline
                    <select 
                        name = "airline" 
                        value={inputs.airline} 
                        onChange={handleChange}
                        required
                    >
                        <option value="Select Airline">Select Airline</option>
                        <option value="Asiana Airlines">Asiana Airlines</option>
                        <option value="Kuwait Airways">Kuwait Airways</option>
                        <option value="Air India">Air India</option>
                        <option value="Etihad Airways">Etihad Airways</option>
                        <option value="Hawaiian Airlines">Hawaiian Airlines</option>
                        <option value="Kenya Airways">Kenya Airways</option>
                        <option value="Uzbekistan Airways">Uzbekistan Airways</option>
                        <option value="Singapore Airlines">Singapore Airlines</option>
                        <option value="Philippines Airlines">Philippines Airlines</option>
                        <option value="Amazon Cargo">Amazon Cargo</option>
                        <option value="China Cargo">China Cargo</option>
                        <option value="DHL Cargo">DHL Cargo</option>
                    </select>
                </label>

                <label>
                    Oil
                    <select 
                        name = "oil" 
                        value={inputs.oil} 
                        onChange={handleChange}
                        required
                    >
                        <option value="Select Oil/Hydraulic">Select Oil/Hydraulic</option>
                        <option value="Eastman 2197">Eastman 2197</option>
                        <option value="Mobil Jet II">Mobil Jet II</option>
                        <option value="Mobil Jet 387">Mobil Jet 387</option>
                        <option value="HyJet V">Mobil HyJet V</option>
                        <option value="Skydrol V">Eastman Skydrol PE-5</option>
                    </select>
                </label>

                <label>
                    Quantity
                    <input 
                        type="number"
                        name="quantity"
                        value={inputs.quantity}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Employee Name:
                    <input 
                        type="text"
                        name="name"
                        value={inputs.name}
                        onChange={handleChange}
                        required
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
            <button
                onClick={() => 
                    generatePDF({
                        table: "consumables",
                        header: ["ISSUED TO", "QUANTITY", "AIRLINE", "OIL", "ISSUED BY", "ISSUE DATE", "USED OIL/HYD", "RECIEVED BY", "RETURN DATE"],
                        mapRow: (records) => [
                            records.employee_name,
                            records.quantity,
                            records.airline,
                            records.oil,
                            records.employee_name,
                            formatDate(records.sign_in_time),
                            records.quantity,
                            records.employee_name,
                            formatDate(records.sign_in_time),
                        ]
                    })
                }
            >Export PDF</button>
        </div>
    )
}