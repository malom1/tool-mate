import { useEffect, useState } from "react";

export default function DateTime() {

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() =>{
            setTime(new Date());
        }, 1000)

        return() => clearInterval(interval);
    }, [])

    const formattedTime = time.toLocaleTimeString;
    const formattedDate = time.toLocaleDateString;

    return(
        <div>
            <h3>{formattedDate}</h3>
            <h3>{formattedTime}</h3>
        </div>
    )
}