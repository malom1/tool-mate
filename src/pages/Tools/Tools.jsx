import { useState } from "react"
import { dataInsert } from "../../utils/dataInsert";
import { supabase } from "../../supabaseClient";

export default function Tools () {

    const [activeSignIn, setActiveSignIn] = useState([])

    const [inputs, setInputs] = useState({
        name: "",
        id: "",
        tool: "",
        location: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs((prev) => ({...prev, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!inputs.name || !inputs.id || !inputs.tool || !inputs.location){
            alert("Enter all fields")
            return;
        }

        var time = new Date().toLocaleString();

        const records = {
            employee_name: inputs.name,
            employee_id: inputs.id,
            tool_name: inputs.tool,
            sign_in_time: time,
            location: inputs.location,
        }

        const { success } = await dataInsert("tools", records);
        if (success) {
            setInputs({name:"", id:"", tool: "", location: ""});
            setActiveSignIn([...activeSignIn, {...inputs, time}]);   
        }
    }

    const handleSignOut = async (entry) => {

        const time = new Date().toLocaleString();

        const { data: record, error: fetchError } = await supabase
            .from("tools")
            .select("id")
            .eq("employee_id", entry.id)
            .eq("tool_name", entry.tool)
            .is("sign_out_time", null)
            .order("sign_in_time", {ascending: false})
            .limit(1)
            .single();
        
        if (fetchError || !record) {
            alert("Active record not found for this tool and employee.");
            console.log(fetchError.message)
            return;
        }

        const { error: updateError } = await supabase
            .from("tools")
            .update({sign_out_time: time})
            .eq("id", record.id)
        
        if (updateError) {
            alert("Error signing out");
            return;
        }

        setActiveSignIn(prev => prev.filter(signIn =>
            !(signIn.id === entry.id && signIn.tool ===entry.tool)
        ));
    }

    return (
        <div className="main-container">
            <h1>Tool Management</h1>
            <form onSubmit={handleSubmit}>

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
                        <option value="Storage Cabinet">Storage Cabinet</option>
                        <option value="TO 23">TO 23</option>
                        <option value="TO 24">TO 24</option>
                        <option value="TO 25">TO 25</option>
                        <option value="Other">Other</option>
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

                <button type="submit-btn">Submit</button>
            </form>
            <div className="active-container">
                <h2>Active Tool Sign Ins</h2>
                <ul>
                    {activeSignIn.length > 0 ? (
                        activeSignIn.map((entry, index) =>
                            <li key={index}>
                                <strong>{entry.tool}</strong> - {entry.name} ({entry.id})
                                <br />
                                <small>Signed in at: {entry.time}</small>
                                <button onClick={() => handleSignOut(entry)}>Sign Out</button>
                            </li>
                        )
                    ) : (
                        <p>No active sign ins</p>
                    )
                    }
                </ul>
            </div>
        </div>
    )
}