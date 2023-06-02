import styles from "./styles.module.css"
import { Link } from "react-router-dom"

export function NavigationPage() {
    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>System zarządzania projektami</h1>
                <Link to="/projects">
                    <button className={styles.white_btn}>Projekty</button>
                </Link>
                <Link to="/account">
                    <button className={styles.white_btn}>Konto</button>
                </Link>
                <Link to="/logout">
                    <button type="button" className={styles.white_btn}>Wyloguj się</button>
                </Link>
            </nav>
        </div>
    )
}