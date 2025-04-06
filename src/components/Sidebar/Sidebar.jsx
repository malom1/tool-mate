import "./Sidebar.css"

export default function Sidebar() {
    return (
        <div className="sidebar">
            <a href="/tools" className="tools">Tools</a>
            <a href="/vehicles" className="vehicles">Vehicles</a>
            <a href="/consumables" className="consumables">Oils/Hydraulics</a>
        </div>
    )
}