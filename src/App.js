import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AccountPage } from "./pages/AccountPage";
import { ProjectPage } from "./pages/ProjectPage"
import { LogoutPage } from "./pages/LogoutPage";

function App() {
  const token = localStorage.getItem("token")

  return(
    <>
      <Routes>
        {token && <Route path="/" element={<HomePage />} />}
        {token && <Route path="/account" element={<AccountPage />} />}
        {token && <Route path="/projects" element={<ProjectPage />} />}
        {token && <Route path="/logout" element={<LogoutPage />} />}

        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/account" element={<Navigate replace to="/login" />} />
        <Route path="/projects" element={<Navigate replace to="/login" />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App;