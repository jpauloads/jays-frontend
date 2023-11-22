import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { SendRedefinePass } from "./pages/SendRedefinePass";
import { NewPasswordPage } from "./pages/NewPasswordPage";
import { UpdateProfilePage } from "./pages/UpdateProfilePage";
import { HomePage } from "./pages/HomePage";
import { ServiceDetailsPage } from "./pages/ServiceDetailsPage";
import { SearchServicesPage } from "./pages/SearchServicesPage";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/detalheservico" element={<ServiceDetailsPage />} /> */}
        <Route path="/servicos" element={<SearchServicesPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/redefinirsenha" element={<SendRedefinePass />} />
        <Route path="/novasenha" element={<NewPasswordPage />} />
        <Route path="/atualizardados" element={<UpdateProfilePage />} />
      </Routes>
    </Router>
  );
};
