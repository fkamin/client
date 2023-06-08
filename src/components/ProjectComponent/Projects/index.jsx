import React, { useState, useEffect } from "react"
import styles from "./styles.module.css"
import axios from "axios"
import Project from "../Project"
import NewProjectDialog from "../NewProjectDialog"
import DeleteProjectDialog from "../DeleteProjectDialog"
import DeleteProjectsDialog from "../DeleteProjectsDialog"

export function Projects() {
    const baseUrl = 'http://localhost:8080/api/projects'
    const [userProjects, setUserProjects] = useState([])
    const [newProjectDialog, setNewProjectDialog] = useState(false)
    const [deleteProjectDialog, setDeleteProjectDialog] = useState(false)
    const [deleteProjectsDialog, setDeleteProjectsDialog] = useState(false)
    const [selectedProjectId, setSelectedProjectId] = useState("")
    const [selectedProjectName, setSelectedProjectName] = useState("")

    const openNewProjectDialog = () => { setNewProjectDialog(true) }
    const openDeleteProjectDialog = (projectId, projectName) => {
        setDeleteProjectDialog(true)
        setSelectedProjectId(projectId)
        setSelectedProjectName(projectName)
    }
    const openDeleteProjectsDialog = () => { setDeleteProjectsDialog(true) }

    useEffect(() => {
        const event = { preventDefault: () => { } }
        handleGetUserProjects(event)
    }, [userProjects])

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

    const handleDeleteProject = async (e) => {
        e.preventDefault()
        const token = "Bearer " + localStorage.getItem("token")
        const urlWithProjectId = baseUrl + "/" + selectedProjectId

        if (token) {
            try {
                const config = {
                    url: urlWithProjectId,
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }

                await axios(config)
                setDeleteProjectDialog(false)
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    localStorage.removeItem("token")
                    window.location.reload()
                }
            }
        }
    }

    const handleDeleteProjects = async (e) => {
        e.preventDefault()
        const token = "Bearer " + localStorage.getItem("token")

        if (token) {
            try {
                const config = {
                    url: baseUrl,
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }

                await axios(config)
                setDeleteProjectsDialog(false)
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
                <div className={styles.project_structure}>
                    <div className={styles.project_content}>
                        <div className={styles.your_projects_text}>
                            Twoje projekty
                        </div>
                        <button
                            type="button"
                            className={styles.new_project_button}
                            onClick={openNewProjectDialog}>Stwórz nowy projekt</button>
                        <button
                            type="button"
                            className={styles.delete_projects_button}
                            onClick={openDeleteProjectsDialog}>Usuń wszystkie projekty</button>
                        <div className={styles.projects}>
                            {userProjects.map((project) =>
                                <React.Fragment key={project.id}>
                                    <button
                                        type="button"
                                        className={styles.delete_project_button}
                                        onClick={() => { openDeleteProjectDialog(project.id, project.title) }}>Usuń projekt</button>
                                    <div
                                        key={project.id}
                                        className={styles.single_project}>
                                        <Project
                                            key={project.id}
                                            id={project.id}
                                            projectTitle={project.title}
                                            projectState={project.state}
                                            projectDescription={project.description}
                                            openButtonFunction={openNewProjectDialog} />
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                        <button type="button" className={styles.new_project_button} onClick={openNewProjectDialog}>Stwórz nowy projekt</button>
                    </div>
                </div>
            )}
            {userProjects.length === 0 && (
                <div className={styles.project_structure}>
                    <div className={styles.project_content}>
                        <div className={styles.your_projects_text}>
                            Twoje projekty
                        </div>
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
                </div>
            )}
            {deleteProjectDialog && (<DeleteProjectDialog
                openDialog={deleteProjectDialog}
                closeDialog={() => setDeleteProjectDialog(false)}
                deleteFunction={handleDeleteProject}
                projectName={selectedProjectName} />)}
            {deleteProjectsDialog && (<DeleteProjectsDialog
                openDialog={deleteProjectsDialog}
                closeDialog={() => setDeleteProjectsDialog(false)}
                deleteFunction={handleDeleteProjects} />)}
            {newProjectDialog && (<NewProjectDialog
                openDialog={newProjectDialog}
                closeDialog={() => setNewProjectDialog(false)} />)}
        </>
    )
}