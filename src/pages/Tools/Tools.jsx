import { useEffect, useState } from "react"
import { dataInsert } from "../../utils/dataInsert";
import { supabase } from "../../supabaseClient";
import { generatePDF } from "../../utils/generatePDF";
import { formatTime, formatDate } from "../../utils/timeDateFormatter";
import styles from "./Tools.module.css"

export default function Tools () {

    const [activeSignIn, setActiveSignIn] = useState([])
    const [loading, setLoading] = useState(false);

    const [inputs, setInputs] = useState({
        name: "",
        tool: "",
        tic: "",
        airline: "",
        location: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs((prev) => ({...prev, [name]: value}));
    }
      

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!inputs.name || !inputs.tool){
            alert("Enter all fields")
            return;
        }

        const time = new Date().toISOString();

        const records = {
            employee_name: inputs.name,
            tool_name: inputs.tool,
            tic: inputs.tic,
            airline: inputs.airline,
            sign_in_time: time,
            location: inputs.location,
        }

        const { success } = await dataInsert("tools", records);
        if (success) {
            setInputs({
                name: "",
                tool: "",
                tic: "",
                airline: "",
                location: ""
            });
            setActiveSignIn((prev) => [...prev, {...records}]);
        }
    };

    const handleSignOut = async (entry) => {

        const time = new Date().toISOString();

        const { data: record, error: fetchError } = await supabase
            .from("tools")
            .select("id")
            .eq("employee_name", entry.employee_name)
            .eq("tool_name", entry.tool_name)
            .is("sign_out_time", null)
            .order("sign_in_time", {ascending: false})
            .limit(1)
            .maybeSingle();
        
        if (fetchError || !record) {
            alert("Active record not found for this tool and employee.");
            console.error(fetchError?.message)
            return;
        }

        const { error: updateError } = await supabase
            .from("tools")
            .update({sign_out_time: time})
            .eq("id", record.id)
        
        if (updateError) {
            alert("Error signing out");
            console.error(updateError.message);
            return;
        } else {
            alert ("Success");
        }

        setActiveSignIn((prev) =>
            prev.filter(
                (signIn) => !(signIn.id === entry.id && signIn.tool === entry.tool)
            )
        );
    };

    const fetchActiveData = async () => {
        setLoading(true);

        const { data, error} = await supabase
            .from("tools")
            .select("*")
            .is("sign_out_time", null);

        if (error) {
            alert("Error fetching active data: ")
            console.error(error.message);
            return
        } else {
            setActiveSignIn(data);
        }
    
        setLoading(false);
    }

    useEffect(() => {
        fetchActiveData();
    }, []);

    return (
        <div className="main-container">
            <h1>Tool Management</h1>
            <form onSubmit={handleSubmit}>

                <label>
                    TIC
                    <input 
                        type="text"
                        name="tic"
                        value={inputs.tic}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Tool Name
                    <input 
                        type="text"
                        name="tool"
                        value={inputs.tool}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Location
                    <select 
                        name = "location" 
                        value={inputs.location} 
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Location</option>
                        <option value="TO 21">TO 23</option>
                        <option value="TO 23">TO 24</option>
                        <option value="JFKLMI001">JFKLMI001</option>
                        <option value="Cabinet A">Cabinet A</option>
                        <option value="Cabinet B">Cabinet B</option>
                        <option value="Cabinet C (GSE)">Cabinet C (GSE)</option>
                        <option value="Other">Other</option>
                    </select>
                </label>

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
                        <option value="Nick R.">Nick R.</option>
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

                <button type="submit">Sign In</button>
            </form>

            <h2>Active Tool Sign-Ins</h2>
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <div className={styles.active}>
                    <ul>
                        {activeSignIn.length > 0 ? (
                            activeSignIn.map((entry, index) =>
                                <li className= {styles.list} key={index}>
                                    <div className={styles.entry}>
                                        <span>
                                            <strong>{entry.tool_name}</strong> - {entry.employee_name}
                                        </span>
                                        <button className = {styles.signout} onClick={() => handleSignOut(entry)}>Sign Out</button>
                                    </div>
                                    <small>Signed in on: {formatDate(entry.sign_in_time)} - {formatTime(entry.sign_in_time)}</small>
                                </li>
                            )
                        ) : (
                            <p>No active sign-ins</p>
                        )
                        }
                    </ul>
                </div>
            )}
            <button
                onClick={() =>
                    generatePDF({
                        table: "tools",
                        header: ["TIC", "TOOL NAME", "A/C WORK ORDER", "DATE ISSUED", "ISSUED TO", "DATE RETURNED", "RETURNING EMPLOYEE", "TIME IN", "TIME OUT"],
                        mapRow: (records) => [
                            records.tic,
                            records.tool_name,
                            records.airline,
                            formatDate(records.sign_in_time),
                            records.employee_name,
                            formatDate(records.sign_out_time),
                            records.employee_name,
                            formatTime(records.sign_in_time),
                            formatTime(records.sign_out_time),
                        ]
                    })
                }
            >Export PDF</button>
        </div>
    )
}