import { useEffect, useState } from "react"
import { dataInsert } from "../../utils/dataInsert";
import { supabase } from "../../supabaseClient";
import styles from "./Vehicles.module.css"

export default function Vehicles() {

    const [activeSignIns, setActiveSignIns] = useState([]);
    const [loading, setLoading] = useState(false);

    const [inputs, setInputs] = useState({
        vehicle: "",
        name: "",
        id: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs ((prev) => ({...prev, [name]: value}));
    }

    const handleSignIn = async (e) => {
        e.preventDefault();

        if(!inputs.vehicle || !inputs.name || !inputs.id) {
            alert("Please fill out all the fields")
            return;
        }

        const record = {
            vehicle: inputs.vehicle,
            employee_name: inputs.name,
            employee_id: inputs.id,
            sign_in_time: new Date().toLocaleString(),
        }

        const {success} = await dataInsert("vehicles", record);
        if (success) {
            setInputs({vehicle: "", name: "", id: ""});
            setActiveSignIns((prev) => [...prev, {...record}]);
        }

    };

    const handleSignOut = async (entry) => {

        const time = new Date().toLocaleString();

        const { data: record, error: fetchError } = await supabase
            .from("vehicles")
            .select("id")
            .eq("employee_id", entry.employee_id)
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
        }

        setActiveSignIns(prev => prev.filter(signIn =>
            !(signIn.id === entry.id && signIn.vehicle ===entry.vehicle)
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
                    Vehicle
                    <select name = "vehicle" value={inputs.vehicle} onChange={handleChange}>
                        <option value="Select Vehicle">Select Vehicle</option>
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
                   Employee Name
                    <input 
                        type="text"
                        name="name"
                        value={inputs.name}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Employee ID
                    <input 
                        type="text"
                        name="id"
                        value={inputs.id}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit-btn">Sign In</button>
            </form>

            <h2>Active Vehicle Sign-Ins</h2>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className={styles.active}>
                <ul>
                    {activeSignIns.length > 0 ? (
                        activeSignIns.map((entry, index) => (
                            <li className={styles.list} key={index}>
                                <strong>{entry.vehicle}</strong> - {entry.employee_name} (ID: {entry.employee_id})
                                <br />
                                <small>Signed in at: {entry.sign_in_time}</small>
                                <button className={styles.signout}onClick={() => handleSignOut(entry)}>Sign Out</button>
                            </li>
                        ))
                        
                    ) : (   
                        <p>No active sign-ins</p>
                    )}
                </ul>
            </div>
            )}
        </div>
    )
}