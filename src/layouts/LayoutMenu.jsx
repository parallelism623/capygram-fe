import React from "react"
import { Outlet } from "react-router-dom"
import Menu from "../components/Menu/Menu"

const LayoutMenu = () => {
    return (
        <div style={{ display: "flex", position: "relative" }}>
            <Menu />
            <Outlet />
        </div>

    )
}
export default LayoutMenu;