import { useState } from "react"
import { dataInsert } from "../../utils/dataInsert";
import { generatePDF } from "../../utils/generatePDF";
import { formatDate } from "../../utils/timeDateFormatter";

export default function Consumables() {
    const [inputs, setInputs] = useState({

        name: "",
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
            sign_in_time: new Date().toLocaleDateString(),
        }

        const { success } = await dataInsert("consumables", records);
        if (success) {
            setInputs({
                name: "",
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
                        <option value="">Select Airline</option>
                        <option value="Air India">Air India</option>
                        <option value="Amazon Cargo">Amazon Cargo</option>
                        <option value="Asiana Airlines">Asiana Airlines</option>
                        <option value="China Cargo">China Cargo</option>
                        <option value="China Southern Airlines">China Southern Airlines</option>
                        <option value="China Southern Cargo">China Southern Cargo</option>
                        <option value="DHL Cargo">DHL Cargo</option>
                        <option value="Etihad Airways">Etihad Airways</option>
                        <option value="Hawaiian Airlines">Hawaiian Airlines</option>
                        <option value="Kenya Airways">Kenya Airways</option>
                        <option value="Kuwait Airways">Kuwait Airways</option>
                        <option value="Philippine Airlines">Philippine Airlines</option>
                        <option value="Singapore Airlines">Singapore Airlines</option>
                        <option value="Uzbekistan Airways">Uzbekistan Airways</option>
                        <option value="Xiamen Air">Xiamen Air</option>
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
                        <option value="">Select Oil/Hydraulic</option>
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
                    <select
                        name="name"
                        value={inputs.name}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Employee</option>
                        <option value="Akim B.">Akim B.</option>
                        <option value="Alpesh P.">Alpesh P.</option>
                        <option value="Alvi B.">Alvi B.</option>
                        <option value="Anas K.">Anas K.</option>
                        <option value="Brandon P.">Brandon P.</option>
                        <option value="Chris C.">Chris C.</option>
                        <option value="Dinis M.">Dinis M.</option>
                        <option value="Dylan H.">Dylan H.</option>
                        <option value="Eduardo A.">Eduardo A.</option>
                        <option value="Humberto L.">Humberto L.</option>
                        <option value="Igor P.">Igor P.</option>
                        <option value="James J.">James J.</option>
                        <option value="James R.">James R.</option>
                        <option value="Jason R.">Jason R.</option>
                        <option value="Jonathan M.">Jonathan M.</option>
                        <option value="Justin G.">Justin G.</option>
                        <option value="Kaven O.">Kaven O.</option>
                        <option value="Linus L.">Linus L.</option>
                        <option value="Michael A.">Michael A.</option>
                        <option value="Miguel Z.">Miguel Z.</option>
                        <option value="Mohamed K.">Mohamed K.</option>
                        <option value="Mohammad A.">Mohammad A.</option>
                        <option value="Nick E.">Nick E.</option>
                        <option value="Onir D.">Onir D.</option>
                        <option value="Ray A.">Ray A.</option>
                        <option value="Richard R.">Richard R.</option>
                        <option value="Ruben G.">Ruben G.</option>
                        <option value="Riyan K.">Riyan K.</option>
                        <option value="Satish V.">Satish V.</option>
                        <option value="Shams H.">Shams H.</option>
                        <option value="Stephen C.">Stephen C.</option>
                        <option value="Steven J.">Steven J.</option>
                        <option value="Tansim F.">Tansim F.</option>
                        <option value="Ubair A.">Ubair A.</option>
                        <option value="Umesh R.">Umesh R.</option>
                        <option value="Waheed M.">Waheed M.</option>
                        <option value="Waseem K.">Waseem K.</option>
                        <option value="Zahid H.">Zahid H.</option>
                    </select>
                </label>

                {/* <label>
                    Employee ID:
                    <input 
                        type="text"
                        name="id"
                        value={inputs.id}
                        onChange={handleChange}
                    />
                </label> */}
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