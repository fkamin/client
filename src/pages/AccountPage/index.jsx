import { useEffect, useState } from "react"
import { NavigationPage } from "../NavigationPage"
import axios from "axios"
import jwtDecode from "jwt-decode"
import styles from "./styles.module.css"
import ConfirmDeleteBox from "../../components/ConfirmDeleteBox"
import ConfirmPropertyChange from "../../components/ConfirmPropertyChange"
import ConfirmPasswordChange from "../../components/ConfirmPasswordChange"

export function AccountPage() {
    const baseUrl = 'http://localhost:8080/api'
    const [userData, setUserData] = useState(null)
    const [firstNameChangeDialog, setFirstNameChangeDialog] = useState(false)
    const [lastNameChangeDialog, setLastNameChangeDialog] = useState(false)
    const [emailChangeDialog, setEmailChangeDialog] = useState(false)
    const [passwordChangeDialog, setPasswordChangeDialog] = useState(false)
    const [deleteUserDialog, setDeleteUserDialog] = useState(false)

    useEffect(() => {
        const event = { preventDefault: () => { } }
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

    const handleChangeUserData = async (e) => {
        e.preventDefault()
        const token = "Bearer " + localStorage.getItem("token")
        const userId = jwtDecode(token).userId
        const urlWithUserId = "/users/" + userId

        if (token) {
            try {
                const config = {
                    url: urlWithUserId,
                    method: 'put',
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

    const openFirstNameChangeDialog = () => { setFirstNameChangeDialog(true) }
    const openLastNameChangeDialog = () => { setLastNameChangeDialog(true) }
    const openEmailChangeDialog = () => { setEmailChangeDialog(true) }
    const openPasswordChangeDialog = () => { setPasswordChangeDialog(true) }
    const openDeleteDialog = () => { setDeleteUserDialog(true) }

    return (
        <>
            <NavigationPage />
            <div>
                {userData && (
                    <div className={styles.content}>
                        <h2>Dane konta</h2>
                        <div className={styles.user_data}>
                            <div className={styles.user_item}>
                                <h4>IMIĘ</h4>
                                <h3>{userData.firstName}</h3>
                                <button type="button" className={styles.change_button} onClick={openFirstNameChangeDialog}>ZMIEŃ</button>
                                <ConfirmPropertyChange
                                    className={styles.delete_account_button}
                                    openDialog={firstNameChangeDialog}
                                    changeFunction={handleChangeUserData}
                                    closeDialog={() => setFirstNameChangeDialog(false)}
                                    propertyName={"imię:"}
                                    propertyLabel={"Podaj nowe imię"}
                                    propertyId={"firstName"}
                                    propertyType={"text"} />
                                <hr />
                            </div>
                            <div className={styles.user_item}>
                                <h4>NAZWISKO</h4>
                                <h3>{userData.lastName}</h3>
                                <button type="button" className={styles.change_button} onClick={openLastNameChangeDialog}>ZMIEŃ</button>
                                <ConfirmPropertyChange
                                    className={styles.delete_account_button}
                                    openDialog={lastNameChangeDialog}
                                    closeDialog={() => setLastNameChangeDialog(false)}
                                    changeFunction={handleChangeUserData}
                                    propertyName={"nazwisko:"}
                                    propertyLabel={"Podaj nowe nazwisko"}
                                    propertyId={"lastName"}
                                    propertyType={"text"} />
                                <hr />
                            </div>
                            <div className={styles.user_item}>
                                <h4>EMAIL</h4>
                                <h3>{userData.email}</h3>
                                <button type="button" className={styles.change_button} onClick={openEmailChangeDialog}>ZMIEŃ</button>
                                <ConfirmPropertyChange
                                    className={styles.delete_account_button}
                                    openDialog={emailChangeDialog}
                                    closeDialog={() => setEmailChangeDialog(false)}
                                    changeFunction={handleChangeUserData}
                                    propertyName={"email:"}
                                    propertyLabel={"Podaj nowy e-mail"}
                                    propertyId={"email"}
                                    propertyType={"email"} />
                                <hr />
                            </div>
                            <div className={styles.user_item}>
                                <h4>HASŁO</h4>
                                <button type="button" className={styles.change_button} onClick={openPasswordChangeDialog}>ZMIEŃ</button>
                                <ConfirmPasswordChange
                                    className={styles.delete_account_button}
                                    openDialog={passwordChangeDialog}
                                    deleteFunction={handleChangeUserData}
                                    closeDialog={() => setPasswordChangeDialog(false)} />
                                <hr />
                            </div>
                            <div className={styles.user_item}>
                                <button type="button" className={styles.delete_account_button} onClick={openDeleteDialog}>USUŃ KONTO</button>
                                <ConfirmDeleteBox
                                    className={styles.delete_account_button}
                                    openDialog={deleteUserDialog}
                                    deleteFunction={handleDeleteUser}
                                    closeDialog={() => setDeleteUserDialog(false)} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}