import { useState } from "react"
import { dataInsert } from "../../utils/dataInsert";

export default function Tools () {

    const [activeSignIn, setActiveSignIn] = useState([])

    const [inputs, setInputs] = useState({
        name: "",
        id: "",
        tool: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs((prev) => ({...prev, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const time = new Date().toLocaleString();

        if(!inputs.name || !inputs.id || !inputs.tool){
            alert("Enter all fields")
            return;
        }

        const records = {
            employee_name: inputs.name,
            employee_id: inputs.id,
            tool_name: inputs.tool,
            sign_in_time: time
        }

        const { success } = await dataInsert("tools", records);
        if (success) {
            setInputs({name:"", id:"", tool: ""});
            setActiveSignIn([...activeSignIn, {...inputs, time}]);   
        } 
    }

    return (
        <div>
            <h1>Tool Management</h1>
            <form onSubmit={handleSubmit}>
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

                <label>
                    Tool Name:
                    <input 
                        type="text"
                        name="tool"
                        value={inputs.tool}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">submit</button>
            </form>
            <h2>Active Tool Sign Ins</h2>
            <ul>
                {activeSignIn.length > 0 ? (
                    activeSignIn.map((entry, index) =>
                        <li key={index}>
                            <strong>{entry.tool}</strong> - {entry.name} ({entry.id})
                            <br />
                            <small>Signed in at: {entry.time}</small>
                            <button>Sign Out</button>
                        </li>
                    )
                ) : (
                    <p>No active sign ins</p>
                )
                }
            </ul>
        </div>
    )
}