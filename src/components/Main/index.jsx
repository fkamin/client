import styles from "./styles.module.css"
import { useState } from 'react'
import axios from 'axios'
import jwtDecode from "jwt-decode"
import Modal from "react-modal"

Modal.setAppElement('#root');

const Main = () => {
    const [usersData, setUsersData] = useState(null)
    const [userData, setUserData] = useState(null)
    const baseUrl = 'http://localhost:8080/api'
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleDeleteConfirmation = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleGetUsers = async (e) => {
        setUserData(null)
        e.preventDefault()
        const token = "Bearer " + localStorage.getItem("token")

        if (token) {
            try {
                const config = {
                    url: '/admin/users',
                    method: 'get',
                    baseURL: baseUrl,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }

                const res = await axios(config)
                setUsersData(res.data)
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    localStorage.removeItem("token")
                    window.location.reload()
                }
            }
        }
    }

    const handleGetUserData = async (e) => {
        setUsersData(null)
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

    const handleDeleteUser = async (e) => {
        e.preventDefault()
        const token = "Bearer " + localStorage.getItem("token")
        const userId = jwtDecode(token).userId
        const urlWithUserId = "/users/" + userId

        if (token) {
            try {
                const config = {
                    url: urlWithUserId,
                    method: 'delete',
                    baseURL: baseUrl,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }

                await axios(config)
                localStorage.removeItem("token")
                window.location.reload()
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    localStorage.removeItem("token")
                    window.location.reload()
                }
            }
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>System zarządzania projektami</h1>
                <button className={styles.white_btn} onClick={handleGetUsers}>
                    Użytkownicy
                </button>
                <button className={styles.white_btn} onClick={handleGetUserData}>
                    Szczegóły konta
                </button>
                <button className={styles.white_btn} onClick={handleDeleteConfirmation}>
                    Usuń konto
                </button>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Wyloguj się
                </button>
            </nav>
            {userData && (
                <div>
                    <h1>Dane twojego konta</h1>
                    <p>Imię: {userData.firstName}, Nazwisko: {userData.lastName}, Email: {userData.email}</p>
                </div>
            )}

            {usersData && (
                <div>
                    <h1>Wszyscy użytkownicy</h1>
                    {usersData.length > 0 ? (
                        usersData.map((user) => (
                            <div key={user.email}>
                                <p>Imię: {user.firstName}, Nazwisko: {user.lastName}, Email: {user.email}</p>
                            </div>
                        ))
                    ) : (
                        <p>Brak danych użytkowników.</p>
                    )}
                </div>
            )}
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Potwierdzenie usunięcia konta">
                <h2>Potwierdzenie usunięcia konta</h2>
                <p>Czy na pewno chcesz usunąć konto? Ten proces jest nieodwracalny.</p>
                <button onClick={handleDeleteUser}>Potwierdź usunięcie</button>
                <button onClick={closeModal}>Anuluj</button>
            </Modal>
        </div>
    )
}

export default Main