import { ImageCard } from "../components/ImageCard";
import jayslogo from '../assets/images/jayslogo.png';
import { Link } from "react-router-dom";


export function LoginPage() {
    return (
        <>
            <div className="w-screen h-screen flex flex-wrap items-center justify-center">
                <div className="flex">
                    <div className="bg-white rounded-bl-2xl rounded-tl-2xl items-center p-10 shadow-lg w-full max-lg:rounded-2xl">

                        <h2 className="text-3xl font-semibold text-start font-['Raleway']">Jay's</h2>
                        <h1 className="justify-center flex mt-16 mb-16 text-4xl font-semibold font-['Open Sans']">Bem Vindo de Volta</h1>

                        <div className='flex justify-center'>

                            <form className='flex flex-col gap-4 w-8/12' action="">

                                <div className='mb-4'>
                                    <label className='mb-2' htmlFor="">
                                        E-mail</label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline focus:shadow-outline"
                                        id="email"
                                        placeholder="Informe seu e-mail"
                                        type="email"
                                        name='email' />
                                </div>

                                <div className='mb-1'>
                                    <label className='mb-2' htmlFor="">
                                        Password</label>
                                    <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="password"
                                        placeholder="******************"
                                        type="password"
                                        name='password' />
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
                        </div>
                    </div>
                    <ImageCard imagem={jayslogo} />
                </div>
            </div>
        </>
    )
}