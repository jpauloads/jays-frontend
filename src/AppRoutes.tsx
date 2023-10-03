import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { SendRedefinePass } from "./pages/SendRedefinePass";

export const AppRoutes = () => {
    return (

        <Router>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/cadastro" element={<RegisterPage/>}/>
                <Route path="/redefinirsenha" element={<SendRedefinePass/>}/>
            </Routes>
        </Router>
    )
}