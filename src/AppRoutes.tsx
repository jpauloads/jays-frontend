import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { SendRedefinePass } from "./pages/SendRedefinePass";
import { NewPasswordPage } from "./pages/NewPasswordPage";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/redefinirsenha" element={<SendRedefinePass />} />
        <Route path="/novasenha" element={<NewPasswordPage />} />
      </Routes>
    </Router>
  );
};
