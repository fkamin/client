import React from "react"
import styles from "./styles.module.css"

function Project({ title, state, description, openButtonFunction }) {
    return (
        <div className={styles.project_structure}>
            <div className={styles.project_content}>
                <h2>Twoje projekty</h2>
                <div className={styles.project_component}>
                    <div className={styles.project_background}>
                        <div className={styles.project_title}>
                            <div className={styles.title_word}>Nazwa projektu</div>
                            <div className={styles.title_value}>
                                <span onClick={() => { console.log("test") }}>
                                    {title}
                                </span>
                            </div>
                        </div>
                        <hr className={styles.project_hr} />
                        <div className={styles.project_state}>
                            <div className={styles.state_word}>Status</div>
                            <div className={styles.state_value}>
                                <span onClick={() => { console.log("test") }}>
                                    {state}
                                </span>
                            </div>
                        </div>
                        <hr className={styles.project_hr} />
                        <div className={styles.project_description}>
                            <div className={styles.description_word}>Opis</div>
                            <div className={styles.description_value}>
                                <span onClick={() => { console.log("test") }}>
                                    {description}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.button_center}>
                    <button type="button" className={styles.new_project_button} onClick={openButtonFunction}>Stwórz nowy projekt</button>
                </div>
            </div>
        </div>
    )
}

export default Project