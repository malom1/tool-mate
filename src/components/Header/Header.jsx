import { supabase } from '../../supabaseClient'

export default function Header() {

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error("Logout error: ", error.message)
    }

    return(
        <>
            <div className="header">
                <div className="logo">
                    <h1>Tool Mate</h1>
                </div>
                <div className="user-info">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </>
    )

}