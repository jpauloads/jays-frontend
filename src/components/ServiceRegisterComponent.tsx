import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { cnpjMask, meiMask, zipCodeMask } from "../utils/masks";
import { api } from "../lib/axios";
import ErrorModal from "../components/ErrorModal";
import SuccessModal from "../components/SuccessModal";
import { AxiosError } from "axios";
import { AuthContext } from "../contexts/AuthContext";
import Select from "react-select";
import { LoadingModal } from "./LoadingModal";

const serviceRegisterSchema = z
  .object({
    nome_empresa: z.string().min(1, "Nome da empresa é necessário"),
    preco: z.number().min(0, "Preço deve ser um valor positivo"),
    descricao: z.string(),
    horarioInicial: z.string(),
    horarioFinal: z.string(),
    forma_pagamento: z.array(z.number()).optional(),
    tipoServico: z.string().optional(),
    domicilio: z.boolean(),
    cep: z.string().min(9, "CEP inválido"),
    logradouro: z.string().min(1, "Logradouro é necessário"),
    numero: z.number().min(1, "Número é necessário"),
    bairro: z.string().min(1, "Bairro é necessário"),
    cidade: z.string().min(1, "Cidade é necessária"),
    estado: z.string().min(1, "Estado é necessário"),
    cnpj: z.string().optional(),
    mei: z.string().optional(),
  })
  .transform((field) => ({
    nome_empresa: field.nome_empresa,
    preco: field.preco,
    descricao: field.descricao,
    horarioInicial: field.horarioInicial,
    horarioFinal: field.horarioFinal,
    forma_pagamento: field.forma_pagamento,
    domicilio: field.domicilio,
    tipoServico: field.tipoServico,
    cep: field.cep,
    logradouro: field.logradouro,
    bairro: field.bairro,
    cidade: field.cidade,
    numero: field.numero,
    estado: field.estado,
    cnpj: field.cnpj,
    mei: field.mei,
  }));

const styleP = "text-xs font-semibold text-red-500";

type ServiceRegisterFormData = z.infer<typeof serviceRegisterSchema>;

type TipoDeServico = {
  id: number;
  nome_servico: string;
};

type AddressProps = {
  logradouro: string;
  localidade: string;
  uf: string;
  bairro: string;
  estado: string;
};

export function ServiceRegisterComponent() {
  const [isLoading, setIsLoading] = useState(false);

  try {
    const [selectedOption, setSelectedOption] = useState("none");

    const handleTypeSelect = (e: { value: SetStateAction<string> }) => {
      setSelectedOption(e.value);
    };

    const [tipoServicoSelecionado, setTipoServicoSelecionado] = useState<
      string | undefined
    >("");

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value;
      setTipoServicoSelecionado(selectedValue);
    };

    const { user } = useContext(AuthContext);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const {
      control,
      handleSubmit,
      register,
      watch,
      setValue,
      formState: { errors },
    } = useForm<ServiceRegisterFormData>({
      resolver: zodResolver(serviceRegisterSchema),
      criteriaMode: "all",
      mode: "all",
      defaultValues: {
        cep: "",
        logradouro: "",
        cidade: "",
        bairro: "",
        estado: "",
      },
    });

    const [tiposDeServico, setTiposDeServico] = useState<TipoDeServico[]>([]);
    const [formaPagamentoSelecionada, setFormaPagamentoSelecionada] = useState<
      number[]
    >([]);
    const zipCode = watch("cep");
    const options = tiposDeServico.map((tipo) => ({
      value: String(tipo.id),
      label: tipo.nome_servico,
    }));

    const handleFormSubmit = async (data: ServiceRegisterFormData) => {
      setIsLoading(true);
      console.log("entro");
      const payload = {
        userId: user?.UserID,
        nome_empresa: data.nome_empresa,
        preco: data.preco,
        descricao: data.descricao,
        horario: data.horarioInicial + " até " + data.horarioFinal,
        domicilio: data.domicilio,
        tipoServico: tipoServicoSelecionado, //fazer uma requisição
        cep: data.cep,
        logradouro: data.logradouro,
        numero: data.numero,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
        mei: data.mei || "",
        cnpj: data.cnpj || "",
        forma_pagamento: formaPagamentoSelecionada,
      };
      console.log(payload);

      try {
        const response = await api.post("/servico/cadastrarservico", payload);
        console.log(response.data);

        if (response.status === 200 || response.status === 201) {
          setSuccessMessage("Serviço cadastrado com sucesso!");
        }
      } catch (error) {
        console.error("Erro ao enviar dados para a API", error);
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 400) {
          setErrorMessage(
            (axiosError.response.data as { error: string }).error
          );
        } else {
          setErrorMessage(
            "Ocorreu um problema. Por favor, tente novamente mais tarde."
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    const closeSuccessModal = () => {
      setSuccessMessage(null);
    };

    const closeErrorModal = () => {
      setModalOpen(false);
      setErrorMessage(null);
    };

    const handleSetData = useCallback((data: AddressProps) => {
      setValue("cidade", data.localidade);
      setValue("logradouro", data.logradouro);
      setValue("bairro", data.bairro);
      setValue("estado", data.uf);
    }, []);

    const handleFetchAddress = useCallback(async (zipCode: string) => {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${zipCode}/json/`
      );
      handleSetData(data);
    }, []);

    useEffect(() => {
      const fetchTiposDeServico = async () => {
        try {
          const response = await api.get("/servico/tipoServico");
          setTiposDeServico(response.data); // Supondo que a API retorne um array
        } catch (error) {
          console.error("Erro ao buscar os tipos de serviço", error);
          // Tratar o erro conforme necessário
        }
      };

      fetchTiposDeServico();
    }, []);

    useEffect(() => {
      setValue("cep", zipCodeMask(zipCode));

      if (zipCode.length != 9) return;

      handleFetchAddress(zipCode);
    }, [handleFetchAddress, setValue, zipCode]);

    return (
      <>
      {isLoading && <LoadingModal />}
        <div className="flex flex-wrap items-center justify-center">
          <div className="bg-white rounded-bl-2xl rounded-tl-2xl p-10 shadow-lg w-full">
            <div className="flex justify-center">
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="w-9/12 max-w-2xl"
              >
                {/* Campo de Nome da empresa */}
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-500 text-base mb-0">
                      Nome da Empresa
                    </label>
                    <input
                      {...register("nome_empresa")}
                      maxLength={50}
                      className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                    ></input>
                    {errors.nome_empresa?.message && (
                      <p className={styleP}>{errors.nome_empresa?.message}</p>
                    )}
                  </div>
                </div>

                {/* Campo Preço */}
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-500 text-base mb-0">
                      Preço
                    </label>
                    <input
                      {...register("preco", { valueAsNumber: true })}
                      className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      id="grid-preco"
                      type="number"
                      min={0}
                    ></input>
                    {errors.preco?.message && (
                      <p className={styleP}>{errors.preco?.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-500 text-base mb-0">
                      Horário
                    </label>
                    <input
                      {...register("horarioInicial")}
                      className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white "
                      id="grid-horario"
                      type="time"
                      placeholder="Informe o horario"
                    ></input>
                    Até
                    <input
                      {...register("horarioFinal")}
                      className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white "
                      id="grid-horario"
                      type="time"
                      placeholder="Informe o horario"
                    ></input>
                    {errors.horarioInicial?.message && (
                      <p className={styleP}>{errors.horarioInicial?.message}</p>
                    )}
                  </div>

                  <div className="w-full flex flex-wrap justify-center md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-500 text-base mb-0">
                      Atende a Domicílio
                    </label>
                    <div className="flex space-x-4 items-center">
                      <Controller
                        name="domicilio"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <>
                            <input
                              type="radio"
                              id="domicilio-sim"
                              value="true"
                              checked={value === true}
                              onChange={() => onChange(true)}
                            />
                            <label className="mr-4">Sim</label>

                            <input
                              type="radio"
                              id="domicilio-nao"
                              value="false"
                              checked={value === false}
                              onChange={() => onChange(false)}
                            />
                            <label>Não</label>
                          </>
                        )}
                      />
                    </div>
                  </div>

                  <div className="w-full flex flex-wrap justify-center md:w-1/3 px-3 mb-6 md:mb-0">
                    {/* Dropdown de Tipo de Serviço */}
                    <label className="block text-gray-500 text-base mb-0">
                      Tipo de Serviço
                    </label>

                    <Select
                      options={options}
                      value={options.find(
                        (option) => option.value === tipoServicoSelecionado
                      )}
                      onChange={(selectedOption) =>
                        setTipoServicoSelecionado(
                          selectedOption?.value || undefined
                        )
                      }
                    />
                  </div>
                </div>

                {/* CNPJ e MEI */}
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-500 text-base mb-0">
                      CNPJ
                    </label>
                    <input
                      {...register("cnpj")}
                      maxLength={18}
                      className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      onChange={(e) => {
                        e.target.value = cnpjMask(e.target.value);
                        setValue("cnpj", e.target.value);
                      }}
                    ></input>
                    {errors.cnpj?.message && (
                      <p className={styleP}>{errors.cnpj?.message}</p>
                    )}
                  </div>

                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-500 text-base mb-0">
                      MEI
                    </label>
                    <input
                      {...register("mei")}
                      className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      id="grid-mei"
                      type="text"
                      onChange={(e) => {
                        e.target.value = meiMask(e.target.value);
                        setValue("mei", e.target.value);
                      }}
                    ></input>
                    {errors.mei?.message && (
                      <p className={styleP}>{errors.mei?.message}</p>
                    )}
                  </div>
                </div>

                {/* Campo Formas de pagamento */}
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-500 text-base mb-0">
                      Forma de Pagamento
                    </label>
                    <div className="flex space-x-6">
                      {["PIX", "Dinheiro", "Cartão"].map(
                        (formaPagamento, index) => (
                          <div key={formaPagamento}>
                            <input
                              className="mx-1"
                              type="checkbox"
                              id={`formaPagamento-${formaPagamento}`}
                              value={index + 1}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setFormaPagamentoSelecionada((prev) =>
                                  checked
                                    ? [...prev, parseInt(e.target.value)]
                                    : prev.filter(
                                        (val) =>
                                          val !== parseInt(e.target.value)
                                      )
                                );
                              }}
                            />
                            <label>{formaPagamento}</label>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Campos de CEP e Estado*/}
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-500 text-base mb-0">
                      CEP
                    </label>
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

                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-500 text-base mb-0">
                      Estado
                    </label>
                    <input
                      {...register("estado")}
                      maxLength={3}
                      className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      placeholder="UF"
                    ></input>
                    {errors.estado?.message && (
                      <p className={styleP}>{errors.estado?.message}</p>
                    )}
                  </div>
                </div>

                {/* Campos de Endereço, Número, Cidade e Bairro */}
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-500 text-base mb-0">
                      Endereço
                    </label>
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

                  <div className="w-full md:w-1/3 px-3">
                    <label className="block text-gray-500 text-base mb-0">
                      Número
                    </label>
                    <input
                      {...register("numero", { valueAsNumber: true })}
                      className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      type="number"
                    ></input>
                    {errors.numero?.message && (
                      <p className={styleP}>{errors.numero?.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-5">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-500 text-base mb-0">
                      Cidade
                    </label>
                    <input
                      {...register("cidade")}
                      className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                    ></input>
                    {errors.cidade?.message && (
                      <p className={styleP}>{errors.cidade?.message}</p>
                    )}
                  </div>

                  <div className="w-full md:w-1/2 px-3">
                    <label className="block text-gray-500 text-base mb-0">
                      Bairro
                    </label>
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

                {/* Campo Descrição */}
                <div className="flex flex-wrap -mx-3 mb-5">
                  <div className="w-full px-3">
                    <label className="block text-gray-500 text-base mb-0">
                      Descrição
                    </label>
                    <textarea
                      {...register("descricao")}
                      className="h-24 resize-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      maxLength={500}
                      placeholder="Descreva o serviço oferecido (máximo de 500 caracteres)"
                    ></textarea>
                    {errors.descricao?.message && (
                      <p className={styleP}>{errors.descricao?.message}</p>
                    )}
                  </div>
                </div>

                {/* Botão de cadastro e link para login */}
                <div className="px-3 flex flex-wrap -mx-3 mb-2 w-full">
                  <button
                    type="submit"
                    className="bg-jays-orange text-white font-semibold h-8 rounded w-1/3"
                  >
                    Cadastrar
                  </button>
                </div>
              </form>
              {errorMessage && (
                <ErrorModal message={errorMessage} onClose={closeErrorModal} />
              )}
              {successMessage && (
                <SuccessModal
                  message={successMessage}
                  onClose={closeSuccessModal}
                />
              )}
            </div>
          </div>
          {/* <ImageCard imagem={jayslogo} /> */}
        </div>
      </>
    );
  } catch (error) {
    console.log(error);
  }
}
