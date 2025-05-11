import { useEffect, useState } from "react"
import { dataInsert } from "../../utils/dataInsert";
import { supabase } from "../../supabaseClient";
import { generatePDF } from "../../utils/generatePDF";
import { formatTime, formatDate } from "../../utils/timeDateFormatter"
import styles from "./Vehicles.module.css"

export default function Vehicles() {

    const [activeSignIns, setActiveSignIns] = useState([]);
    const [loading, setLoading] = useState(false);

    const [inputs, setInputs] = useState({
        vehicle: "",
        electronics: "",
        toolBox: "",
        transitBox: "",
        consumable: "",
        airline: "",
        itemChecked: "",
        name: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs ((prev) => ({...prev, [name]: value}));
    }

    const handleSignIn = async (e) => {
        e.preventDefault();

        const record = {
            vehicle: inputs.vehicle,
            airline: inputs.airline,
            electronics: inputs.electronics,
            tool_box: inputs.toolBox,
            transit_box: inputs.transitBox,
            consumable: inputs.consumable,
            item_checked: inputs.itemChecked,
            employee_name: inputs.name,
            sign_in_time: new Date().toISOString(),
        }

        const {success} = await dataInsert("vehicles", record);
        if (success) {
            setInputs({
                vehicle: "",
                electronics: "",
                toolBox: "",
                transitBox: "",
                consumable: "",
                airline: "",
                itemChecked: "",
                name: "",
            });
            setActiveSignIns((prev) => [...prev, {...record}]);
        } else {
            alert ("Error signing out")
        }

    };

    const handleSignOut = async (entry) => {

        const time = new Date().toISOString();

        const { data: record, error: fetchError } = await supabase
            .from("vehicles")
            .select("id")
            .eq("employee_name", entry.employee_name)
            .eq("vehicle", entry.vehicle)
            .is("sign_out_time", null)
            .order("sign_in_time", {ascending: false})
            .limit(1)
            .maybeSingle();
        
        if (fetchError || !record) {
            alert("Active record not found for this vehicle and employee.");
            console.log(fetchError.message)
            return;
        }

        const { error: updateError } = await supabase
            .from("vehicles")
            .update({sign_out_time: time})
            .eq("id", record.id)
        
        if (updateError) {
            alert("Error signing out");
            return;
        } else {
            alert("Success")
        }

        setActiveSignIns(prev => prev.filter(signIn =>
            !(signIn.id === entry.id && signIn.vehicle === entry.vehicle)
        ));
    }

        const fetchActiveData = async () => {

            setLoading(true);
    
            const { data, error} = await supabase
                .from("vehicles")
                .select("*")
                .is("sign_out_time", null);
    
            if (error) {
                alert("Error fetching active data: ")
                console.error(error.message);
                return;
            } else {
                setActiveSignIns(data);
            }

            setLoading(false);
        }
    
        useEffect(() => {
            fetchActiveData();
        }, []);


    return(
        <div className="main-container">
            <h1>Vehicle Management</h1>
            
            <form onSubmit={handleSignIn}>
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
                    Vehicle
                    <select 
                        name = "vehicle" 
                        value={inputs.vehicle} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">Select Vehicle</option>
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
                   Electronics
                    <select 
                        name="electronics"
                        value={inputs.electronics}
                        onChange={handleChange}
                    >
                        <option value="None">None</option>
                        <option value="Hawaiian iPad">Hawaiian iPad</option>
                    </select>
                </label>

                <label>
                   Tool Box
                    <select 
                        name="toolBox"
                        value={inputs.toolBox}
                        onChange={handleChange}
                    >
                        <option value="None">None</option>
                        <option value="TO 23">TO 23</option>
                        <option value="TO 24">TO 24</option>
                    </select>
                </label>

                <label>
                   Transit Box
                    <select 
                        name="transitBox"
                        value={inputs.transitBox}
                        onChange={handleChange}
                    >
                        <option value="None">None</option>
                        <option value="JFKLMI001">JFKLMI001</option>
                    </select>
                </label>

                <label>
                   Consumable
                    <select 
                        type="text"
                        name="consumable"
                        value={inputs.consumable}
                        onChange={handleChange}
                    >
                        <option value="None">None</option>
                        <option value="Speed Tape">Speed Tape</option>
                        <option value="Cargo Tape">Cargo Tape</option>
                        <option value="Other">Other</option>
                    </select>
                </label>

                <label>
                    Item Checked
                    <select 
                        name = "itemChecked" 
                        value={inputs.itemChecked} 
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </label>

                <label>
                   Employee Name
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

                <button type="submit-btn">Sign In</button>
            </form>

            <h2>Active Vehicle Sign-Ins</h2>
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <div className={styles.active}>
                <ul>
                    {activeSignIns.length > 0 ? (
                        activeSignIns.map((entry, index) => (
                            <li className={styles.list} key={index}>
                                <div className={styles.entry}>
                                    <span>
                                        <strong>{entry.vehicle}</strong> - {entry.employee_name}
                                    </span>
                                    <button className = {styles.signout} onClick={() => handleSignOut(entry)}>Sign Out</button>
                                </div>
                                <small>Signed in on: {formatDate(entry.sign_in_time)} - {formatTime(entry.sign_in_time)}</small>
                            </li>
                        ))
                        
                    ) : (   
                        <p>No active sign-ins</p>
                    )}
                </ul>
            </div>
            )}
            <button
                onClick={() =>
                    generatePDF({
                        table: "vehicles",
                        header: ["CERTIFIER/MECHANIC", "AIRLINE", "ELECTRONICS", "VEHICLE", "TOOL BOX", "TRANSIT BOX", "CONSUMABLE", "ITEM CHECKED", "DATE", "TIME", "ISSUED BY", "RETURN BY", "RETURN DATE", "RETURN TIME"],
                        mapRow: (records) => [
                            records.employee_name,
                            records.airline,
                            records.electronics,
                            records.vehicle,
                            records.tool_box,
                            records.transit_box,
                            records.consumable,
                            records.item_checked,
                            formatDate(records.sign_in_time),
                            formatTime(records.sign_in_time),
                            records.employee_name,
                            records.employee_name,
                            formatDate(records.sign_out_time),
                            formatTime(records.sign_out_time),
                        ]
                    })
                }
            >Export PDF</button>
        </div>
    )
}