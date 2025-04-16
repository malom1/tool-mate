import { useState } from "react";
import { supabase } from "../../supabaseClient";

export default function Auth() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLogin, setIsLogin] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (isLogin) {
            const { error } = await supabase.auth.signInWithPassword({ email, password})
            if (error) alert(error.message)
            else alert("Signed in!")
        } else { 
            const { error } = await supabase.auth.signUp({email, password})
            if (error)
                alert(error.message)
            else alert("Check your email to confirm your account!")
        }
    }

    return(
        <div>
            <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>
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
                <button type="submit">{isLogin ? "Sign In" : "Sign Up"}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Need an account? Sign Up" : "Already have an account? Sign In"}
            </button>
        </div>
    )
}