import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Ajuste o caminho conforme necessário

export function Header() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <>
            <div className="p-5">
                <nav className="flex items-center justify-between">
                    <h1 className="text-white">Jays</h1>
                    <ul className="flex justify-center items-center text-white">
                        <li className="pr-3">
                            <button><Link to="/home">Início</Link></button>
                        </li>
                        <li className="pr-3">
                            <button><Link to="#">Sobre nós</Link></button>
                        </li>
                        <li className="pr-3">
                            {user ? (
                                <button 
                                    onClick={handleLogout}
                                    className="hover:bg-jays-hover transition-bg duration-300 text-white font-bold py-2 px-4 rounded border border-white-500">
                                    Logout
                                </button>
                            ) : (
                                <button className="hover:bg-jays-hover transition-bg duration-300 text-white font-bold py-2 px-4 rounded border border-white-500">
                                    <Link to="/login" className="font-semibold">Login</Link>
                                </button>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}
