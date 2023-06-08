import React, { useState } from "react"
import styles from "./styles.module.css"
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import axios from "axios";

function Project({ projectTitle, projectState, projectDescription, id }) {
    const baseUrl = "http://localhost:8080/api/projects/"
    const [isOpenPropertyEdit, setIsOpenPropertyEdit] = useState(false)
    const [editPropertyName, setEditPropertyName] = useState("")
    const [originalProjectData, setOriginalProjectData] = useState({
        title: projectTitle,
        state: projectState,
        description: projectDescription
    })

    const [newProjectData, setNewProjectData] = useState({
        title: projectTitle,
        state: projectState,
        description: projectDescription
    })

    const handleOpenEditProperty = (propertyName) => {
        setIsOpenPropertyEdit(true)
        setEditPropertyName(propertyName)
    }

    const handleCloseEditProperty = () => {
        setIsOpenPropertyEdit(false)
        setNewProjectData(originalProjectData)
    }

    const handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name

        setNewProjectData((prevProjectData) => {
            const updatedProjectData = { ...prevProjectData }
            updatedProjectData[name] = value
            return updatedProjectData
        })    
    }

    const handleConfirmEditProperty = async (e) => {
        e.preventDefault()
        const token = "Bearer " + localStorage.getItem("token")
        const urlWithProjectId = baseUrl + id

        if (token) {
            try {
                const config = {
                    url: urlWithProjectId,
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    data: JSON.stringify(newProjectData)
                }

                await axios(config)
                setNewProjectData(newProjectData)
                setOriginalProjectData(newProjectData)
                setIsOpenPropertyEdit(false)
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    console.log(error)
                }
            }
        }
    }

    return (
        <>
            <div className={styles.project_title}>
                <div className={styles.title_word}>Nazwa projektu</div>
                <div className={styles.title_value}>
                    {isOpenPropertyEdit === true && editPropertyName === "title" ? (
                        <input
                            type="text"
                            name="title"
                            className={styles.edit_input}
                            autoFocus={true}
                            value={newProjectData.title}
                            onChange={handleChange}></input>
                    ) : (<span>{newProjectData.title}</span>)}
                </div>
                <div className={styles.icons}>
                    {isOpenPropertyEdit === true && editPropertyName === "title" ? (
                        <>
                        <CheckIcon
                            className={styles.confirm_button}
                            onClick={(e) => { handleConfirmEditProperty(e) }}/>
                        <CloseIcon
                            className={styles.cancel_button}
                            onClick={() => { handleCloseEditProperty() }}/>
                        </>
                    ) : (
                        <>
                            <EditIcon
                                className={styles.edit_button}
                                onClick={() => { handleOpenEditProperty("title") }} />
                        </>)}
                </div>
            </div>
            <hr className={styles.project_hr} />
            <div className={styles.project_state}>
                <div className={styles.state_word}>Status</div>
                <div className={styles.state_value}>
                    {isOpenPropertyEdit === true && editPropertyName === "state" ? (
                        <select 
                            name="state"
                            value={newProjectData.state}
                            onChange={handleChange}>
                            <option value="Nie rozpoczęty">Nie rozpoczęty</option>
                            <option value="W trakcie">W trakcie</option>
                            <option value="Zakończony">Zakończony</option>
                        </select>
                    ) : (<span>{newProjectData.state}</span>)}
                </div>
                <div className={styles.icons}>
                    {isOpenPropertyEdit === true && editPropertyName === "state" ? (
                        <>
                        <CheckIcon
                            className={styles.confirm_button}
                            onClick={(e) => { handleConfirmEditProperty(e) }}/>
                        <CloseIcon
                            className={styles.cancel_button}
                            onClick={() => { handleCloseEditProperty() }}/>
                        </>
                    ) : (
                        <>
                            <EditIcon
                                className={styles.edit_button}
                                onClick={() => { handleOpenEditProperty("state") }} />
                        </>)}
                </div>
            </div>
            <hr className={styles.project_hr} />
            <div className={styles.project_description}>
                <div className={styles.description_word}>Opis</div>
                <div className={styles.description_value}>
                    {isOpenPropertyEdit === true && editPropertyName === "description" ? (
                        <input
                            type="text"
                            name="description"
                            className={styles.edit_input}
                            autoFocus={true}
                            value={newProjectData.description}
                            onChange={handleChange}></input>
                    ) : (<span>{newProjectData.description}</span>)}
                </div>
                <div className={styles.icons}>
                    {isOpenPropertyEdit === true && editPropertyName === "description" ? (
                        <>
                        <CheckIcon
                            className={styles.confirm_button}
                            onClick={(e) => { handleConfirmEditProperty(e) }}/>
                        <CloseIcon
                            className={styles.cancel_button}
                            onClick={() => { handleCloseEditProperty() }}/>
                        </>
                    ) : (
                        <>
                            <EditIcon
                                className={styles.edit_button}
                                onClick={() => { handleOpenEditProperty("description") }} />
                        </>)}
                </div>
            </div>
        </>
    )
}

export default Project