// import React from "react";
import jayslogo from "../assets/images/jayslogo.png";
import { z } from "zod";
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Ajuste o caminho conforme necessário
import { api } from '../lib/axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import searchbutton from "../assets/images/SearchButtonBar.png";

const loginFormSchema = z.object({
    pesquisaPorNome: z.string()
});

type LoginFormInput = z.infer<typeof loginFormSchema>;

export function Header() {
    // const {
    //     register,
    //     handleSubmit
    // } = useForm<LoginFormInput>({
    //     resolver: zodResolver(loginFormSchema),
    // });

    const handleFormSubmit = async (data: LoginFormInput) => {
        try {
            console.log(data.pesquisaPorNome)
            const response = await api.get(`/servico/buscaserviconome/${data.pesquisaPorNome}`);
            console.log(response.data)
        } catch (error) {
            console.error("Erro na chamada da API", error);
        }
    };

    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <>
            <div className="bg-jays-orange p-5">
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
