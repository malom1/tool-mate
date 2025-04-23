import { Link } from "react-router-dom"

export default function Sidebar() {
    return (
        <div className="sidebar">
            <Link to ="/">Dashboard</Link>
            <Link to="/tools">Tools</Link>
            <Link to="/vehicles">Vehicles</Link>
            <Link to="/consumables">Oils/Hydraulics</Link>
        </div>
    )
}