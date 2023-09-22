import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

export const AppRoutes = () => {
    return (

        <Router>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/registerpage" element={<RegisterPage/>}/>
            </Routes>
        </Router>
    )
}