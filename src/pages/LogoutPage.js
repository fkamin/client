import { useEffect } from "react";

export function LogoutPage() {
    useEffect(() => {
        localStorage.removeItem("token")
        window.location = "/login"
    }, [])
}