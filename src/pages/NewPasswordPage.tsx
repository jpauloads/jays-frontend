// import React from "react";
import jayslogo from "../assets/images/jayslogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../lib/axios";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import ErrorModal from "../components/ErrorModal";
import SuccessModal from "../components/SuccessModal";

const styleP = "text-xs font-semibold text-red-500";

const loginFormSchema = z.object({
  codigo: z.number(),
  senha: z.string().min(8, "A senha deve conter ao menos 8 caracteres"),
  confirmaSenha: z.string().min(8, "A senha deve conter ao menos 8 caracteres")
});

type LoginFormInput = z.infer<typeof loginFormSchema>;

export function NewPasswordPage() {

  const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isRedirectModalOpen, setRedirectModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { user } = useContext(AuthContext);
  const [selectedSection, setSelectedSection] = useState<string>("editarendereco");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInput>({
        resolver: zodResolver(loginFormSchema),
    });

  const { login } = useContext(AuthContext);

  const handleFormSubmit = async (data: LoginFormInput) => {
    console.log('Form submitted:', data);
    if (data.senha !== data.confirmaSenha) {
      setErrorMessage("As senhas não coincidem");
      return;
    }
    try {
      const payload = { cod_verificacao: data.codigo, senha: data.senha };

      const response = await api.post('/usuario/novasenha', payload);
      if (response.status === 200) {
        login(response.data);
        setSuccessMessage("Senha redefinida com sucesso");
      } else if (response.status != 200) {
        setErrorMessage("Código inválido");
      }
    } catch (error) {
      console.error("Erro na chamada da API", error);
      setErrorMessage(
        "Ocorreu um problema ao tentar alterar sua senha. Por favor, tente novamente mais tarde."
      );
    }
  };

  const closeSuccessModal = () => {
    navigate("/");
    setSuccessMessage(null);
  };

  const closeErrorModal = () => {
    setModalOpen(false);
    setErrorMessage(null);
  };

  return (
    <>
      <div className="bg-jays-orange w-screen flex flex-wrap items-center justify-center">
        <div className="flex flex-col">
          <h1 className="text-center text-white text-5xl mt-20 mb-20">
            Criar Nova Senha
          </h1>
          <div className="flex flex-col items-center justify-center text-center bg-white rounded-2xl items-center p-10 shadow-lg w-full max-lg:rounded-2xl">
            <h2 className="flex items-center justify-center mt-16 mb-12 text-3xl font-semibold font-['Open Sans']">
              Preencha os dados abaixo para recuperar sua senha
            </h2>
            <div className="flex justify-center items-center max-w-md">
              <form onSubmit={handleSubmit(handleFormSubmit)} className="container flex flex-col gap-4 p-4">
                <div className="mb-1">
                  <label className="mb-2 block">
                    Código de verificação
                  </label>
                  <input
                    {...register("codigo", {valueAsNumber: true})}
                    className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                  />
                  {errors.codigo?.message && (
                    <p className={styleP}>{errors.codigo?.message}</p>
                  )}
                </div>
                <div className="mb-1">
                  <label className="mb-2 block">
                    Password
                  </label>
                  <input
                    {...register("senha")}
                    className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="******************"
                    type="password"
                    
                  />
                  {errors.senha?.message && (
                    <p className={styleP}>{errors.senha?.message}</p>
                  )}
                </div>
                <div className="mb-1">
                  <label className="mb-2 block">
                    Confirmar nova senha
                  </label>
                  <input
                    {...register("confirmaSenha")}
                    className="shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="******************"
                    type="password"
                    
                  />
                  {errors.confirmaSenha?.message && (
                    <p className={styleP}>{errors.confirmaSenha?.message}</p>
                  )}
                </div>
                <button
                  className="w-full bg-jays-orange text-white py-2 px-4 rounded hover:bg-jays-hover transition-bg duration-300"
                  type="submit"
                >
                  Salvar nova senha
                </button>
              </form>
              {successMessage && (
                                    <SuccessModal message={successMessage} onClose={closeSuccessModal} />
                                )}
              {errorMessage && (
                <ErrorModal message={errorMessage} onClose={closeErrorModal} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
