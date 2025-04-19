import DateTime from "../../components/DateTime/DateTime"
import styles from "./Dashboard.module.css"
import Memo from "../../components/Memo/Memo"

export default function Dashboard () {

    return (
        <div className={styles.container}>
            <div className={styles.dashboard}>
                <h1>Dashboard</h1>
                <DateTime className={styles.dateTime}/>
                <h3 className={styles.welcome}>Welcome to the Tool Mate Dashboard!</h3>
                <p>Select the options on the left sidebar to start logging.</p>
            </div>
            <Memo className={styles.memo}/>
        </div>

    )
}