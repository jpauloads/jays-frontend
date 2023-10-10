// import React from "react";
import { ImageCard } from "../components/ImageCard";
import jayslogo from '../assets/images/jayslogo.png';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../lib/axios";
import { SHA256 } from 'crypto-js';
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import ErrorModal from "../components/ErrorModal";


const styleP = "text-xs font-semibold text-red-500"


const loginFormSchema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(1, 'Digite sua senha'),
});

type LoginFormInput = z.infer<typeof loginFormSchema>;

export function LoginPage() {

    const [isModalOpen, setModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<LoginFormInput>({
        resolver: zodResolver(loginFormSchema)
    });

    const { login } = useContext(AuthContext);
    // const history = useHistory();

    

    const handleFormSubmit = async (data: LoginFormInput) => {
        try {
            const encryptedPassword = SHA256(data.senha).toString();
            const payload = { email: data.email, senha: encryptedPassword };
            
            // Usando o método GET com corpo de requisição
            const response = await api.get('/usuario', { data: payload });
            
            if (response.status === 200) {
                login(response.data);
                alert("Login bem-sucedido!");
                // history.push('/dashboard');
            } else {
                alert("Falha ao realizar login");
                console.error("Erro ao fazer login");
            }
        } catch (error) {
            console.error("Erro na chamada da API", error);
            setErrorMessage("Ocorreu um problema ao tentar fazer login. Por favor, tente novamente mais tarde.");
        }
    };
    
    // const handleFormSubmit = async (data: LoginFormInput) => {
    //     try {
    //         const encryptedPassword = SHA256(data.senha).toString();
    //         const payload = { email: data.email, senha: encryptedPassword };

    //         const response = await api.post('/usuario', payload);
            
    //         if (response.status === 200) {
    //             login(response.data);
    //             alert("Login bem-sucedido!");
    //             // history.push('/dashboard');
    //         } else {
    //             alert("Falha ao realizar login");
    //             console.error("Erro ao fazer login");
    //         }
    //     } catch (error) {
    //         console.error("Erro na chamada da API", error);
    //         setErrorMessage("Ocorreu um problema ao tentar fazer login. Por favor, tente novamente mais tarde.");
    //     }
    // };

    const closeErrorModal = () => {
        setModalOpen(false);
        setErrorMessage(null);
    };

    

    return (
        <>
            <div className="w-screen h-screen flex flex-wrap items-center justify-center">
                <div className="flex">
                    <div className="bg-white rounded-bl-2xl rounded-tl-2xl items-center p-10 shadow-lg w-full max-lg:rounded-2xl">

                        <h2 className="text-3xl font-semibold text-start font-['Raleway']">Jay's</h2>
                        <h1 className="justify-center flex mt-16 mb-16 text-4xl font-semibold font-['Open Sans']">Bem Vindo de Volta</h1>

                        <div className='flex justify-center'>

                            <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col gap-4 w-8/12'>
                                <div className='mb-4'>
                                    <label className='mb-2' htmlFor="email">
                                        E-mail</label>
                                    <input 
                                        {...register("email")} 
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline focus:shadow-outline"
                                        id="email"
                                        placeholder="Informe seu e-mail"
                                        type="email"
                                    />
                                    {errors.email?.message && (
                                        <p className={styleP}>{errors.email?.message}</p>
                                    )}
                                </div>

                                <div className='mb-1'>
                                    <label className='mb-2' htmlFor="password">
                                        Password</label>
                                    <input 
                                        {...register("senha")}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="password"
                                        placeholder="Digite sua senha"
                                        type="password"
                                    />
                                    {errors.senha?.message && (
                                        <p className={styleP}>{errors.senha?.message}</p>
                                    )}
                                </div>

                                <Link to="/redefinirsenha" className='text-xs text-right text-orange-700'>Esqueceu a senha?</Link>

                                <div className='flex justify-center items-center flex-col'>
                                    <button
                                        type='submit'
                                        className='bg-jays-orange text-white mt-10 h-8 rounded w-10/12'>
                                        Login
                                    </button>

                                    <button
                                        // onClick={signInWithGoogle}
                                        className='bg-white mt-11 font-semibold h-8 border border-gray-500 rounded-md w-10/12'>
                                        Login com o Google
                                    </button>
                                    <div className='pt-8 text-xs text-right'>
                                        Não tem uma conta? <Link to="/cadastro" className="text-orange-700 font-semibold">Cadastre-se</Link>
                                    </div>

                                </div>
                            </form>
                            {errorMessage && <ErrorModal message={errorMessage} onClose={closeErrorModal} />}
                        </div>
                    </div>
                    <ImageCard imagem={jayslogo} />
                </div>
            </div>
        </>
    );
}
