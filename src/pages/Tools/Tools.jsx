import { useEffect, useState } from "react"
import { dataInsert } from "../../utils/dataInsert";
import { supabase } from "../../supabaseClient";
import styles from "./Tools.module.css"
import { generatePDF } from "../../utils/generatePDF";

export default function Tools () {

    const [activeSignIn, setActiveSignIn] = useState([])
    const [loading, setLoading] = useState(false);

    const [inputs, setInputs] = useState({
        name: "",
        id: "",
        tool: "",
        tic: "",
        airline: "",
        location: ""
    })

    const formatTime = (time) => {
        if (!time) return "";
        const date = new Date(time);
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
      };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs((prev) => ({...prev, [name]: value}));
    }
      

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!inputs.name || !inputs.id || !inputs.tool){
            alert("Enter all fields")
            return;
        }

        const time = new Date().toLocaleString();

        const records = {
            employee_name: inputs.name,
            employee_id: inputs.id,
            tool_name: inputs.tool,
            tic: inputs.tic,
            airline: inputs.airline,
            sign_in_time: time,
            location: inputs.location,
        }

        const { success } = await dataInsert("tools", records);
        if (success) {
            setInputs({name:"", id:"", tool: "", location: "", tic: "", airline: ""});
            setActiveSignIn((prev) => [...prev, {...records}]);   
        }
    };

    const handleSignOut = async (entry) => {

        const time = new Date().toLocaleString();

        const { data: record, error: fetchError } = await supabase
            .from("tools")
            .select("id")
            .eq("employee_id", entry.employee_id)
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
                    />
                </label>

                <label>
                    Tool Name
                    <input 
                        type="text"
                        name="tool"
                        value={inputs.tool}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Location
                    <select name = "location" value={inputs.location} onChange={handleChange}>
                        <option value="Select Location">Select Location</option>
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
                    <select name = "airline" value={inputs.airline} onChange={handleChange}>
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
                    Employee Name:
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

            <h2>Active Tool Sign-Ins</h2>
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <div className={styles.active}>
                    <ul>
                        {activeSignIn.length > 0 ? (
                            activeSignIn.map((entry, index) =>
                                <li className= {styles.list} key={index}>
                                    <strong>{entry.tool_name}</strong> - {entry.employee_name} ({entry.employee_id})
                                    <br />
                                    <small>Signed in at: {entry.sign_in_time}</small>
                                    <button className = {styles.signout} onClick={() => handleSignOut(entry)}>Sign Out</button>
                                </li>
                            )
                        ) : (
                            <p>No active sign ins</p>
                        )
                        }
                    </ul>
                </div>
            )}
            <button
                onClick={() =>
                    generatePDF({
                        table: "tools",
                        title: "SIA ENGINEERING (USA) | TOOL LOG ISSUE / RETURN REGISTER | FORM NO. SIAE-C04",
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