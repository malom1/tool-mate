import { useState } from "react"

export default function Tools () {

    // const [activeSignIn, setActiveSignIn] = useState([])

    const [inputs, setInputs] = useState({
        name: "",
        id: "",
        tool: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs((prev) => ({...prev, [name]: value}));
    }



    return (
        <div>
            <h1>Tool Management</h1>
            <form>
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
        </div>
    )
}