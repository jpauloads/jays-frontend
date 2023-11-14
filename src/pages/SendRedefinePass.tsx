import { Header } from "../components/Header"
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../lib/axios";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import ErrorModal from "../components/ErrorModal";

const styleP = "text-xs font-semibold text-red-500";

const loginFormSchema = z.object({
    email: z.string().email("Email inválido")
});

type LoginFormInput = z.infer<typeof loginFormSchema>;

export function SendRedefinePass() {

    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isRedirectModalOpen, setRedirectModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInput>({
        resolver: zodResolver(loginFormSchema),
    });

    const { login } = useContext(AuthContext);

    const handleFormSubmit = async (data: LoginFormInput) => {
        try {
            const payload = { email: data.email };
            console.log("entro")
            const response = await api.post('/usuario/redefinirsenha', payload);
            if (response.status === 200) {
                login(response.data);
                window.alert("Email enviado com sucesso. Verifique seu e-mail para acessar o link de troca de senha.");
                navigate("/login");
            } else if (response.status != 200) {
                setErrorMessage("Ocorreu um problema ao enviar o código. Por favor, tente novamente mais tarde.");
            }
        } catch (error) {
            console.error("Erro na chamada da API", error);
            setErrorMessage(
                "Ocorreu um problema ao enviar o código. Por favor, tente novamente mais tarde."
            );
        }
    };

    const closeErrorModal = () => {
        setModalOpen(false);
        setErrorMessage(null);
    };

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
                                <form onSubmit={handleSubmit(handleFormSubmit)} className="container h-64 flex flex-col">
                                    <h2 className="item flex-grow text-3xl font-semibold font-['Open Sans']">Seu e-mail de acesso</h2>
                                    <input {...register("email")} className="item flex-grow border border-black text-center rounded-md items-center" type="email"></input>
                                    {errors.email?.message && (
                                        <p className={styleP}>{errors.email?.message}</p>
                                    )}
                                    <h3 className="item flex-grow text-2xl mt-4 font-semibold font-['Open Sans']">Será enviado um e-mail com as instruções para redefinir sua senha</h3>
                                    <button className="item flex-grow text-2xl rounded-[10px] bg-jays-orange text-white hover:cursor-pointer hover:bg-jays-hover transition-bg duration-300" type="submit">Enviar</button>
                                </form>
                                {errorMessage && (
                                    <ErrorModal message={errorMessage} onClose={closeErrorModal} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}