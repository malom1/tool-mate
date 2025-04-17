// import { useState } from "react"

export default function Dashboard () {

    const dateTime = new Date().toLocaleString()

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <h5>{dateTime}</h5>
            <p>Good Morning! Please use the left sidebar to navigate, sign in or sign out</p>
        </div>

    )
}