import { Link } from "react-router-dom"
import "./Sidebar.css"

export default function Sidebar() {
    return (
        <div className="sidebar">
            <Link to ="/">Dashboard</Link>
            <Link to="/tools">Tools</Link>
            <Link to="/vehicles">Vehicles</Link>
            <Link to="/consumables">Oils</Link>
        </div>
    )
}