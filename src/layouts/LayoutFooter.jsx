import React from "react"
import { Outlet } from "react-router-dom"
import FooterLogin from "../components/FooterLogin/FooterLogin"

const LayoutFooter = () => {
    return (
        <>
            <Outlet />
            <FooterLogin />
        </>
    )
}
export default LayoutFooter;