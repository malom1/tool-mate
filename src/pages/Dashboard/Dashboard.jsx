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
                <h5>App Instructions</h5>
                <br />
                <p>1. Navigate through the sidebar to choose between the different options.</p>
                <p>2. Input all the required details.</p>
                <p>3. Tools and Vehicles must be signed back in at the bottom of the page after use.</p>
                <p>4. Oils/Hydraulics can only be signed out after use</p>
                <p>5. For anything not used, input "NA"</p>
                <p>6. Click sign in or submit to upload the information</p>
            </div>
        </div>

    )
}