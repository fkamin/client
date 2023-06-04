import React, { useState, useEffect } from "react"
import styles from "./styles.module.css"
import axios from "axios"
import Project from "../Project"
import NewProjectDialog from "../NewProjectDialog"

export function Projects() {
    const baseUrl = 'http://localhost:8080/api/projects'
    const [userProjects, setUserProjects] = useState([])
    const [newProjectDialog, setNewProjectDialog] = useState(false)

    const openNewProjectDialog = () => { setNewProjectDialog(true) }

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

    return (
        <>
            {userProjects.length > 0 && (
                <>
                    {userProjects.map((project) =>
                        <Project
                            key={project.id}
                            title={project.title}
                            state={project.state}
                            description={project.description}
                            openButtonFunction={openNewProjectDialog} />
                    )}
                    <NewProjectDialog
                        openDialog={newProjectDialog}
                        closeDialog={() => setNewProjectDialog(false)} />
                </>
            )}
            {userProjects.length === 0 && (
                <div className={styles.project_structure}>
                    <h2>Twoje projekty</h2>
                    <div className={styles.project_content}>
                        <div className={styles.no_project_notification}>
                            Nie masz żadnych projektów
                        </div>
                        <div className={styles.button_center}>
                            <button type="button" className={styles.new_project_button} onClick={openNewProjectDialog}>Stwórz nowy projekt</button>
                            <NewProjectDialog
                                openDialog={newProjectDialog}
                                closeDialog={() => setNewProjectDialog(false)} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}