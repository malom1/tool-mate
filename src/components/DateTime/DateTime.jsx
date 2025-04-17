import { useEffect, useState } from "react";
import styles from "./DateTime.module.css"

export default function DateTime() {

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() =>{
            setTime(new Date());
        }, 1000)

        return() => clearInterval(interval);
    }, [])

    const formattedTime = time.toLocaleTimeString();
    const formattedDate = time.toLocaleDateString();

    return(
        <div className={styles.datetime}>
            <h3>{formattedDate}</h3>
            <h3>{formattedTime}</h3>
        </div>
    )
}