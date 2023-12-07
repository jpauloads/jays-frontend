// import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext"; // Ajuste o caminho conforme necessário

export function Header() {
  const location = useLocation();

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <div className="bg-jays-orange p-5">
        <nav className="flex items-center justify-between">
          <h1 className="text-white">Jays</h1>
          <ul className="flex justify-center items-center text-white">
            <li className="pr-3">
              <Link
                to="/home"
                className={
                  location.pathname.startsWith("/home")
                    ? "link-button text-orange-300"
                    : "link-button"
                }
              >
                Início
              </Link>
            </li>
            <li className="pr-3 col">
              <Link
                to="/servicos"
                className={
                  location.pathname.startsWith("/servicos")
                    ? "link-button text-orange-300"
                    : "link-button"
                }
              >
                Serviços
              </Link>
            </li>
            <li className="pr-3">
              <Link
                to="#"
                className={
                  location.pathname.startsWith("#")
                    ? "link-button text-orange-300"
                    : "link-button"
                }
              >
                Sobre nós
              </Link>
            </li>
            <li className="pr-3">
              {user ? (
                <button className={
                  location.pathname.startsWith("/atualizardados")
                    ? "bg-jays-hover text-white font-bold py-2 px-4 rounded border border-white-500"
                    : "hover:bg-jays-hover transition-bg duration-300 text-white font-bold py-2 px-4 rounded border border-white-500"}>
                  <Link to="/atualizardados" className="font-semibold">
                    Perfil
                  </Link>
                </button>
              ) : null}
            </li>
            <li className="pr-3">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="hover:bg-jays-hover transition-bg duration-300 text-white font-bold py-2 px-4 rounded border border-white-500"
                >
                  Logout
                </button>
              ) : (
                <button className="hover:bg-jays-hover transition-bg duration-300 text-white font-bold py-2 px-4 rounded border border-white-500">
                  <Link to="/login" className="font-semibold">
                    Login
                  </Link>
                </button>
              )}
            </li>

            
          </ul>
        </nav>
      </div>
    </>
  );
}
