//imports
import { Header } from "../components/Header"

export function SendRedefinePass() {
    return (
        <div>
            <Header />
            <>
                <div className="w-screen flex flex-wrap items-center justify-center">
                    <div className="flex flex-col">
                        <h1 className="text-center text-white text-6xl mt-20 mb-20">Redefinir Senha</h1>
                        <div className="flex flex-col items-center justify-center text-center bg-white rounded-2xl items-center p-10 shadow-lg w-full max-lg:rounded-2xl">

                            <h1 className="flex items-center justify-center mt-16 mb-12 text-4xl font-semibold font-['Open Sans']">Preencha os dados abaixo para recuperar sua senha</h1>
                            <div className="flex justify-center items-center max-w-md">
                                <form className="container h-64 flex flex-col">
                                    <h2 className="item flex-grow text-3xl font-semibold font-['Open Sans']">Seu e-mail de acesso</h2>
                                    <input className="item flex-grow border border-black text-center rounded-md items-center" type="email"></input>
                                    <h3 className="item flex-grow text-2xl mt-4 font-semibold font-['Open Sans']">Será enviado um e-mail com as instruções para redefinir sua senha</h3>
                                    <input className="item flex-grow text-2xl rounded-[10px] bg-jays-orange text-white hover:cursor-pointer hover:bg-jays-hover transition-bg duration-300" type="submit" value="Enviar" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}