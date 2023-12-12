import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState, useContext } from "react";
import { AxiosError } from "axios";
import axios from "axios";
import { zipCodeMask } from "../utils/masks";
import { api } from "../lib/axios";
import ErrorModal from "./ErrorModal";
import SuccessModal from "./SuccessModal";
import { AuthContext } from '../contexts/AuthContext';

interface AddressEditComponentProps {
  addressId: string,
  onClick: (section: string) => void;
}

const createUserFormSchema = z
  .object({
    cep: z.string().min(9, "Por favor, informe um CEP válido"),
    logradouro: z.string().min(1, "Por favor, uma rua válida"),
    numero: z.number().min(1, "Escreva um número"),
    cidade: z.string().min(1, "Por favor, informe uma cidade válida"),
    bairro: z.string().min(1, "Campo inválido"),
    estado: z.string().min(1, "Campo inválido"),
  })
  .transform((field) => ({
    cep: field.cep,
    logradouro: field.logradouro,
    bairro: field.bairro,
    cidade: field.cidade,
    numero: field.numero,
    estado: field.estado,
  }));

const styleP = "text-xs font-semibold text-red-500";

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

type AddressProps = {
  logradouro: string;
  localidade: string;
  uf: string;
  bairro: string;
  estado: string;
};

export function AddressEditComponent({ addressId, onClick }: AddressEditComponentProps) {
  const { user } = useContext(AuthContext);
  const [selectedSection, setSelectedSection] =
    useState<string>("editarendereco");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
    criteriaMode: "all",
    mode: "all",
    defaultValues: {
      cep: "",
      logradouro: "",
      numero: 0,
      cidade: "",
      bairro: "",
      estado: "",
    },
  });

  const zipCode = watch("cep");

  const handleSetData = useCallback((data: AddressProps) => {
    setValue('cidade', data.localidade);
    setValue('logradouro', data.logradouro);
    setValue('bairro', data.bairro);
    setValue('estado', data.uf);
}, [])

const handleFormSubmit = async (data: CreateUserFormData) => {
  if (!user) {
    setErrorMessage('Usuário não está logado.');
    return;
  }

  const payload = {
    ...data,
    id: addressId
  };

  try {
      const response = await api.put('/usuario/updateEndereco', payload);
      
      if(response.status === 200 || response.status === 201){
          setSuccessMessage("Endereço salvo com sucesso!");
      }

  } catch (error) {
      console.error("Erro ao enviar dados para a API", error);
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 400) {
          setErrorMessage((axiosError.response.data as { error: string }).error);
      } else {
          setErrorMessage("Ocorreu um problema. Por favor, tente novamente mais tarde.");
      }
  }
}

const closeSuccessModal = () => {
  handleButtonClick('enderecos');
  setSuccessMessage(null);
};

const closeErrorModal = () => {
  setModalOpen(false);
  setErrorMessage(null);
};

const handleFetchAddress = useCallback(async (zipCode: string) => {
    const { data } = await axios.get(
        `https://viacep.com.br/ws/${zipCode}/json/`
    );
    handleSetData(data)
}, []);

useEffect(() => {
    setValue('cep', zipCodeMask(zipCode));

    if (zipCode.length != 9) return;

    handleFetchAddress(zipCode);
}, [handleFetchAddress, setValue, zipCode]);

  const handleButtonClick = (section: string) => {
    setSelectedSection(section);
    onClick(section);
  };

  const isSelected = (section: string) => selectedSection === section;

  return (
    <>
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex-col w-full">
      <div className="h-full w-full mb-6 mt-6">

      {/* Campo de CEP */}
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-1/4 px-3 mb-6 md:mb-0">
          <label className="block text-gray-500 text-base mb-0">CEP</label>
          <input
            {...register("cep")}
            maxLength={9}
            className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="Informe seu CEP"
          ></input>
          {errors.cep?.message && (
            <p className={styleP}>{errors.cep?.message}</p>
          )}
        </div>
      </div>

      {/* Campos de Endereço, Número, Cidade e Bairro */}
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-1/2 px-3 mb-6 md:mb-0">
          <label className="block text-gray-500 text-base mb-0">Endereço</label>
          <input
            {...register("logradouro")}
            className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="Rua"
          ></input>
          {errors.logradouro?.message && (
            <p className={styleP}>{errors.logradouro?.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-1/4 px-3">
          <label className="block text-gray-500 text-base mb-0">Número</label>
          <input
            {...register("numero", { valueAsNumber: true })}
            className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            type="number"
          ></input>
          {errors.numero?.message && (
            <p className={styleP}>{errors.numero?.message}</p>
          )}
        </div>
        <div className="w-1/4 px-3">
          <label className="block text-gray-500 text-base mb-0">Estado</label>
          <input
            {...register("estado")}
            className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            type="text"
          ></input>
          {errors.estado?.message && (
            <p className={styleP}>{errors.estado?.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-1/4 px-3 mb-6 md:mb-0">
          <label className="block text-gray-500 text-base mb-0">Cidade</label>
          <input
            {...register("cidade")}
            className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            type="text"
          ></input>
          {errors.cidade?.message && (
            <p className={styleP}>{errors.cidade?.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-5">
        <div className="w-1/4 px-3">
          <label className="block text-gray-500 text-base mb-0">Bairro</label>
          <input
            {...register("bairro")}
            className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            type="text"
          ></input>
          {errors.bairro?.message && (
            <p className={styleP}>{errors.bairro?.message}</p>
          )}
        </div>
      </div>

    </div>
      {/* Botão de cadastro e link para login */}
      <div className="justify-center px-3 flex flex-wrap -mx-3 mb-5 w-full">
        <button
          type="submit"
          className="bg-jays-orange text-white font-semibold h-8 rounded w-1/3"
        >
          Salvar endereço
        </button>
      </div>
    </form>
    {errorMessage && <ErrorModal message={errorMessage} onClose={closeErrorModal} />}
    {successMessage && <SuccessModal message={successMessage} onClose={closeSuccessModal} />}
    </>
  );
}
