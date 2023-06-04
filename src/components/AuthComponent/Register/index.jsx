import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import styles from "./styles.module.css"

export default function Register() {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [error, setError] = useState("")
    const navigate = useNavigate()
    
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleValidation = (e) => {
        if (data.password === data.confirmPassword) {
            setError("")
            handleSubmit(e)
        } else {
            setError("Hasła muszą być identyczne")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const registerURL = "http://localhost:8080/api/register"
            await axios.post(
                registerURL,
                JSON.stringify(data),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            )
            navigate("/login")
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Witaj ponownie</h1>
                    <Link to="/login">
                        <button type="button"
                            className={styles.white_btn}>
                            Zaloguj się
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container}>
                        <h1>Załóż konto</h1>
                        <input
                            type="text"
                            placeholder="Imię"
                            name="firstName"
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Nazwisko"
                            name="lastName"
                            onChange={handleChange}
                            value={data.lastName}
                            required
                            className={styles.input}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Hasło"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Powtórz hasło"
                            name="confirmPassword"
                            onChange={handleChange}
                            value={data.confirmPassword}
                            required
                            className={styles.input}
                        />
                        {error && <div
                            className={styles.error_msg}>{error}</div>}
                        <button type="button"
                            onClick={handleValidation}
                            className={styles.green_btn}>
                            Zarejestruj się
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}