import { useEffect, useState } from "react"
import { NavigationPage } from "../NavigationPage"
import axios from "axios"
import jwtDecode from "jwt-decode"
import styles from "./styles.module.css"

export function AccountPage() {
    const [userData, setUserData] = useState(null)
    const baseUrl = 'http://localhost:8080/api'

    useEffect(() => {
        const event = { preventDefault: () => {}}
        handleGetUserData(event)
    }, [])

    const handleGetUserData = async (e) => {
        e.preventDefault()
        const token = "Bearer " + localStorage.getItem("token")
        const userId = jwtDecode(token).userId
        const urlWithUserId = "/users/" + userId

        if (token) {
            try {
                const config = {
                    url: urlWithUserId,
                    method: 'get',
                    baseURL: baseUrl,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }

                const res = await axios(config)
                setUserData(res.data)
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    localStorage.removeItem("token")
                    window.location.reload()
                }
            }
        }
    }

    return(
        <>
            <NavigationPage/>
            <div className={styles.main_data}>
                {userData && (
                    <div>
                        <h1>Dane twojego konta</h1>
                        <p>Imię: {userData.firstName}, Nazwisko: {userData.lastName}, Email: {userData.email}</p>
                    </div>
                )}
            </div>
        </>
    )
}