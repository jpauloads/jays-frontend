import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthContext";
import jaysimg from "../assets/images/jayslogo.png";
import ErrorModal from "./ErrorModal";
import SuccessModal from "./SuccessModal";
import { cpfMask, phoneMask } from "../utils/masks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { api } from "../lib/axios";

const updateUserFormData = z
  .object({
    nome: z.string().min(1, "Nome é necessário"),
    documento: z.string().length(14, "CPF inválido"),
    telefone: z.string().min(1, "Digite um telefone válido"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
    dt_nasc: z.string().min(1, "Data inválida"),
  })
  .transform((field) => ({
    nome: field.nome,
    email: field.email,
    senha: field.senha,
    telefone: field.telefone,
    documento: field.documento,
    dt_nasc: field.dt_nasc,
  }));

type UserProfileFormData = z.infer<typeof updateUserFormData>;

export function UserProfileComponent() {
  const { user } = useContext(AuthContext);
  const [infoPerfil, setInfoPerfil] = useState([]);
  // const handleSetData = useCallback((data: AddressProps) => {
  //   setValue("nome", data.localidade);
  //   setValue("email", data.logradouro);
  //   setValue("dt_nasc", data.bairro);
  //   setValue("cpf", data.uf);
  // }, []);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const {
    handleSubmit,
    register,
    setValue,
    // setError,
    formState: { errors },
  } = useForm<UserProfileFormData>({
    resolver: zodResolver(updateUserFormData),
    criteriaMode: "all",
    mode: "all",
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log(user?.UserID)
      console.log(user?.accessToken)
      try {
        const response = await api.get(`usuario/perfil/${user?.UserID}`, {
          headers: {
            Authorization: `JWT ${user?.accessToken}`,
          },
        });
        console.log(response.data);
        // Faça algo com os dados da API aqui
      } catch (error) {
        console.error('Erro ao chamar a API', error);
        // Lide com o erro conforme necessário
      }
    };

    fetchData(); // Chame a função para buscar os dados da API ao carregar a página
  }, []);

  const handleFormSubmit = async (data: UserProfileFormData) => {
    
    const { ...payload } = data;
    console.log(payload);

    try {
      const response = await api.put("/usuario/updateCadastro", payload);
      console.log(response.data);

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Cadastro atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao enviar dados para a API", error);
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 400) {
        setErrorMessage((axiosError.response.data as { error: string }).error);
      } else {
        setErrorMessage(
          "Ocorreu um problema. Por favor, tente novamente mais tarde."
        );
      }
    }
  };

  const closeSuccessModal = () => {
    // navigate("/");
    setSuccessMessage(null);
  };

  const closeErrorModal = () => {
    setModalOpen(false);
    setErrorMessage(null);
  };

  const styleFieldForm = "justify-center flex flex-wrap -mx-3 mb-4";
  const styleP = "text-xs font-semibold text-red-500";

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="w-full justify-center">
        <div className="pb-10 lg:border-b-0 lg:border-r">
          <div className="flex flex-col items-center">
            <img
              src={jaysimg}
              alt="Profile Picture"
              className=" rounded-full h-48 w-40"
            />
            <button className="mt-2 px-3 py-1 bg-gray-200 text-sm text-gray-700 font-semibold rounded">
              Editar
            </button>
          </div>
        </div>

        <div className="h-full w-full my-6 lg:mt-0">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className={styleFieldForm}>
                <div className="w-2/3 px-3">
                  <label className="block text-gray-500 text-base mb-0">
                    Nome Completo
                  </label>
                  <input
                    {...register("nome")}

                    className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                  ></input>
                  {errors.nome?.message && (
                    <p className={styleP}>{errors.nome?.message}</p>
                  )}
                </div>
              </div>

              <div className={styleFieldForm}>
                <div className="w-2/3 px-3">
                  <label className="block text-gray-500 text-base mb-0">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                    type="email"
                  ></input>
                  {errors.email?.message && (
                    <p className={styleP}>{errors.email?.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className={styleFieldForm}>
                <div className="w-2/3 px-3">
                  <label className="block text-gray-500 text-base mb-0">
                    Data de Nascimento
                  </label>
                  <input
                    {...register("dt_nasc")}
                    className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white "
                    id="grid-nascimento"
                    type="date"
                  ></input>
                  {errors.dt_nasc?.message && (
                    <p className={styleP}>{errors.dt_nasc?.message}</p>
                  )}
                </div>
              </div>

              <div className={styleFieldForm}>
                <div className="w-2/3 px-3">
                  <label className="block text-gray-500 text-base mb-0">
                    CPF
                  </label>
                  <input
                    {...register("documento")}
                    className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white "
                    id="grid-cpf"
                    type="text"
                    onChange={(e) => {
                      e.target.value = cpfMask(e.target.value);
                      setValue("documento", e.target.value);
                    }}
                  ></input>
                  {errors.documento?.message && (
                    <p className={styleP}>{errors.documento?.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className={styleFieldForm}>
                <div className="w-2/3 px-3">
                  <label className="block text-gray-500 text-base mb-0">
                    Telefone
                  </label>
                  <input
                    {...register("telefone")}
                    className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white "
                    id="grid-telefone"
                    type="text"
                    onChange={(e) => {
                      e.target.value = phoneMask(e.target.value);
                      setValue("telefone", e.target.value);
                    }}
                  ></input>
                  {errors.telefone?.message && (
                    <p className={styleP}>{errors.telefone?.message}</p>
                  )}
                </div>
              </div>

              <div className={styleFieldForm}>
                <div className="w-2/3 px-3">
                  <label className="block text-gray-500 text-base mb-0">
                    Senha
                  </label>
                  <input
                    {...register("senha")}
                    className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white "
                    id="grid-password"
                    type="password"
                    placeholder="*********"
                  ></input>
                  {errors.senha?.message && (
                    <p className={styleP}>{errors.senha?.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="justify-center flex my-6">
              <button
                type="submit"
                className="hover:bg-jays-hover transition-bg duration-300 bg-jays-orange text-white font-semibold h-8 rounded w-1/4"
              >
                Salvar dados
              </button>
            </div>
          </form>
          {errorMessage && <ErrorModal message={errorMessage} onClose={closeErrorModal} />}
    {successMessage && <SuccessModal message={successMessage} onClose={closeSuccessModal} />}
        </div>
      </div>
    </div>
  );
}
