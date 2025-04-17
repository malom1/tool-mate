import DateTime from "../../components/DateTime/DateTime"

export default function Dashboard () {

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <DateTime />
            <h3>Welcome to the Tool Mate Dashboard!</h3>
            <p>Select the options on the left sidebar to start logging.</p>
        </div>

    )
}