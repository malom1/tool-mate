import DateTime from "../../components/DateTime/DateTime"
import styles from "./Dashboard.module.css"

export default function Dashboard () {

    return (
        <div className="main-container">
            <h1>Dashboard</h1>
            <DateTime className={styles.dateTime}/>
            <h3 className={styles.welcome}>Welcome to the Tool Mate Dashboard!</h3>
            <p>Select the options on the left sidebar to start logging.</p>
        </div>

    )
}