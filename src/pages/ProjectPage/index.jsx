import { useEffect, useState } from "react"
import { NavigationPage } from "../NavigationPage"
import axios from "axios"
import styles from "./styles.module.css"
import NewProject from "../../components/NewProject"

export function ProjectPage() {
    const [newProjectDialog, setNewProjectDialog] = useState(false)
    const baseUrl = 'http://localhost:8080/api/projects'
    const [userProjects, setUserProjects] = useState([])

    useEffect(() => {
        const event = { preventDefault: () => { } }
        handleGetUserProjects(event)
    }, [])

    const handleGetUserProjects = async (e) => {
        e.preventDefault()
        const token = "Bearer " + localStorage.getItem("token")
        
        if (token) {
            try {
                const config = {
                    url: baseUrl,
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }

                const res = await axios(config)
                setUserProjects(res.data)
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    localStorage.removeItem("token")
                    window.location.reload()
                }
            }
        }
    }    

    const openNewProjectDialog = () => { setNewProjectDialog(true) }

    return (
        <>
            <NavigationPage />
            <div>
                {userProjects.length === 0 && (
                    <div className={styles.content}>
                        <h2>Twoje projekty</h2>
                        <div className={styles.user_data}>
                            <div className={styles.no_project_notification}>
                                Nie masz żadnych projektów
                            </div>
                            <div className={styles.user_item}>
                                <button type="button" className={styles.create_project_button} onClick={openNewProjectDialog}>Stwórz nowy projekt</button>
                                <NewProject
                                    openDialog={newProjectDialog}
                                    closeDialog={() => setNewProjectDialog(false)}/>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}