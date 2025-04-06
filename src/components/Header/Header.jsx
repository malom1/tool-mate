import './Header.css'

export default function Header() {

    return(
        <>
            <div className="header-container">
                <div className="logo">
                    <img src="./assets/logo.png" alt="" />
                    <h1>Tool Mate</h1>
                </div>
                <div className="user-container">
                    <h4>John Doe</h4>
                    <p>Aircraft Maintenance Technician</p>
                </div>
            </div>
        </>
    )

}