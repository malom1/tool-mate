import { useState } from "react";
import { supabase } from "../../supabaseClient";
import styles from "./Auth.module.css"

export default function Auth() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLogin, setIsLogin] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (isLogin) {
            const { error } = await supabase.auth.signInWithPassword({ email, password})
            setIsLogin(true);
            if (error) alert(error.message)
        }
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.logo}>Tool Mate</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className={styles.btn} type="submit">Sign In</button>
            </form>
        </div>
    )
}