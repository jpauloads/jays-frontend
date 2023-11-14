// import { ImageCard } from "../components/ImageCard";
// import jayslogo from '../assets/images/persona2.png';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useCallback, useContext, useEffect, useState } from "react";
// import axios from 'axios';
// import { zipCodeMask, cpfMask, phoneMask } from "../utils/masks";
// import { api } from "../lib/axios";
// import ErrorModal from "../components/ErrorModal";
// import SuccessModal from "../components/SuccessModal";
// import { AxiosError } from 'axios';
// import { AuthContext } from "../contexts/AuthContext";

// // Supondo que você tem um mapeamento dos tipos de serviço e formas de pagamento:
// const tiposDeServico = { 'Tipo 1': 1, 'Tipo 2': 2 }; // Exemplo
// const formasDePagamento = { 'PIX': 1, 'Dinheiro': 2, 'Cartão': 3 }; // Exemplo

// const serviceRegisterSchema = z.object({
//     nome_empresa: z.string().min(1, "Nome da empresa é necessário"),
//     preco: z.number().min(0, "Preço deve ser um valor positivo"),
//     descricao: z.string(),
//     horario: z.string(),
//     forma_pagamento: z.array(z.number()),
//     domicilio: z.boolean(),
//     tipoServico: z.string(),
//     cep: z.string().min(9, "CEP inválido"),
//     logradouro: z.string().min(1, "Logradouro é necessário"),
//     numero: z.number().min(1, "Número é necessário"),
//     bairro: z.string().min(1, "Bairro é necessário"),
//     cidade: z.string().min(1, "Cidade é necessária"),
//     estado: z.string().min(1, "Estado é necessário"),
//     cnpj: z.string().optional(),
//     mei: z.string().optional(),
//   }).transform((field) => ({
//     nome_empresa: field.nome_empresa,
//     preco: field.preco,
//     descricao: field.descricao,
//     horario: field.horario,
//     forma_pagamento: field.forma_pagamento,
//     domicilio: field.domicilio,
//     tipoServico: field.tipoServico,
//     cep: field.cep,
//     logradouro: field.logradouro,
//     bairro: field.bairro,
//     cidade: field.cidade,
//     numero: field.numero,
//     estado: field.estado,
//     cnpj: field.cnpj,
//     mei: field.mei,
// }));

// const styleP = "text-xs font-semibold text-red-500"

// type ServiceRegisterFormData = z.infer<typeof serviceRegisterSchema>;

// type AddressProps = {
//     logradouro: string;
//     localidade: string;
//     uf: string;
//     bairro: string;
//     estado: string;
// }

// export function ServiceRegisterComponent() {

//     const { user } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const [errorMessage, setErrorMessage] = useState<string | null>(null);
//     const [isModalOpen, setModalOpen] = useState(false);
//     const { 
//         handleSubmit,
//         register,
//         watch,
//         setValue,
//         setError,
//         formState: { errors }
//     } = useForm<ServiceRegisterFormData>({
//         resolver: zodResolver(serviceRegisterSchema),
//         criteriaMode: 'all',
//         mode: 'all',
//         defaultValues: {
//             cep: '',
//             logradouro: '',
//             // numero: 0,
//             cidade: '',
//             bairro: '',
//             estado: '',
//         }
//     });

//     const zipCode = watch('cep');

//     const handleFormSubmit = async (data: ServiceRegisterFormData) => {
        
//         const payload = {
//             userId: user?.UserID,
//             nome_empresa: data.nome_empresa,
//             preco: data.preco,
//             descricao: data.descricao,
//             horario: data.horario,
//             domicilio: data.domicilio,
//             tipoServico: data.tipoServico, //fazer uma requisição
//             cep: data.cep,
//             logradouro: data.logradouro,
//             numero: data.numero,
//             bairro: data.bairro,
//             cidade: data.cidade,
//             estado: data.estado,
//             mei: data.mei || '',
//             cnpj: data.cnpj || '',
//             forma_pagamento: data.forma_pagamento.map(fp => formasDePagamento[fp]),
//           };
//         console.log(payload);

//         //PAREI AQUI

//         try {
//             const response = await api.post('/usuario/cadastro', payload);
//             console.log(response.data);
            
//             if(response.status === 200 || response.status === 201){
//                 setSuccessMessage("Serviço cadastrado com sucesso!");
//             }

//         } catch (error) {
//             console.error("Erro ao enviar dados para a API", error);
//             const axiosError = error as AxiosError;
//             if (axiosError.response && axiosError.response.status === 400) {
//                 setErrorMessage((axiosError.response.data as { error: string }).error);
//             } else {
//                 setErrorMessage("Ocorreu um problema. Por favor, tente novamente mais tarde.");
//             }
//         }
//     }

//     const closeSuccessModal = () => {
//         setSuccessMessage(null);
//     };
    

//     const closeErrorModal = () => {
//         setModalOpen(false);
//         setErrorMessage(null);
//     };

//     const handleSetData = useCallback((data: AddressProps) => {
//         setValue('cidade', data.localidade);
//         setValue('logradouro', data.logradouro);
//         setValue('bairro', data.bairro);
//         setValue('estado', data.uf);
//     }, [])

//     const handleFetchAddress = useCallback(async (zipCode: string) => {
//         const { data } = await axios.get(
//             `https://viacep.com.br/ws/${zipCode}/json/`
//         );
//         handleSetData(data)
//     }, []);

//     useEffect(() => {
//         setValue('cep', zipCodeMask(zipCode));

//         if (zipCode.length != 9) return;

//         handleFetchAddress(zipCode);
//     }, [handleFetchAddress, setValue, zipCode]);

//     return (
//         <>
//         <div className="flex flex-wrap items-center justify-center">
//             <div className="flex">
//             <div className="bg-white rounded-bl-2xl rounded-tl-2xl p-10 shadow-lg w-full">
//                 <h2 className="text-2xl font-semibold text-start font-['Raleway']">Jay's</h2>
//                 <h1 className="justify-center flex mt-2 mb-5 text-4xl font-semibold font-['Open Sans']">Bem Vindo ao Jay's</h1>
//                 <div className='flex justify-center'>
    
//                     <form onSubmit={handleSubmit(handleFormSubmit)} className="w-9/12 max-w-2xl">
    
//                         {/* Campos de Nome e Sobrenome */}
//                         <div className="flex flex-wrap -mx-3 mb-4">
//                             <div className="w-full px-3">
//                                 <label className="block text-gray-500 text-base mb-0">
//                                     Nome Completo
//                                 </label>
//                                 <input 
//                                     {...register('nome')}
//                                     className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
//                                     type="text">
//                                 </input>
//                                 {errors.nome?.message && (
//                                     <p className={styleP}>{errors.nome?.message}</p>
//                                 )}
//                             </div>
//                         </div>
    
//                         {/* Campo de CPF e Telefone */}
//                         <div className="flex flex-wrap -mx-3 mb-4">
//                             <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
//                                 <label className="block text-gray-500 text-base mb-0">
//                                     CPF
//                                 </label>
//                                 <input 
//                                     {...register('documento')}
//                                     maxLength={14}
//                                     className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
//                                     type="text" 
//                                     onChange={(e) => {
//                                         e.target.value = cpfMask(e.target.value);
//                                         setValue('documento', e.target.value);
//                                     }} 
//                                 >
//                                 </input>
//                                 {errors.documento?.message && (
//                                     <p className={styleP}>{errors.documento?.message}</p>
//                                 )}
//                             </div>
//                         <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
//                             <label className="block text-gray-500 text-base mb-0">
//                                 Telefone
//                             </label>
//                             <input 
//                                 {...register('telefone')}
//                                 className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
//                                 id="grid-telefone" 
//                                 type="text"
//                                 placeholder="(xx)xxxxx-xxxx"
//                                 onChange={(e) => {
//                                     e.target.value = phoneMask(e.target.value);
//                                     setValue('telefone', e.target.value);
//                                 }}
//                                 >
//                             </input>
//                             {errors.telefone?.message && (
//                                 <p className={styleP}>{errors.telefone?.message}</p>
//                             )}
//                         </div>
//                         </div>
//                     <div className="flex flex-wrap -mx-3 mb-4">
//                         <div className="w-full md:w-3/5 px-3 mb-6 md:mb-0">
//                             <label className="block text-gray-500 text-base mb-0">
//                                 Email
//                             </label>
//                             <input 
//                                 {...register('email')}
//                                 className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white "
//                                 id="grid-email" 
//                                 type="email" placeholder="Informe seu email">
//                             </input>
//                             {errors.email?.message && (
//                                 <p className={styleP}>{errors.email?.message}</p>
//                             )}
//                         </div>

//                         <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
//                             <label className="block text-gray-500 text-base mb-0">
//                                 Data nasc.
//                             </label>
//                             <input 
//                                 {...register('dt_nasc')}
//                                 className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white "
//                                 id="grid-nascimento" 
//                                 type="date"
//                                 >
//                             </input>
//                             {errors.dt_nasc?.message && (
//                                 <p className={styleP}>{errors.dt_nasc?.message}</p>
//                             )}
//                         </div>
//                     </div>

//                         <div className="flex flex-wrap -mx-3 mb-4">
//                         <div className="w-full px-3">
//                             <label className="block text-gray-500 text-base mb-0">
//                                 Senha
//                             </label>
//                             <input 
//                                 {...register('senha')}
//                                 className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white "
//                                 id="grid-password" 
//                                 type="password" placeholder="********">
//                             </input>
//                             {errors.senha?.message && (
//                                 <p className={styleP}>{errors.senha?.message}</p>
//                             )}
//                         </div>
//                     </div>

//                     <div className="flex flex-wrap -mx-3 mb-4">
//                         <div className="w-full px-3">
//                             <label className="block text-gray-500 text-base mb-0">
//                                 Confirme sua senha
//                             </label>
//                             <input 
//                                 {...register('confirmPassword')}
//                                 className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white "
//                                 id="grid-confirm-password" 
//                                 type="password" placeholder="********">
//                             </input>
//                             {errors.confirmPassword?.message && (
//                                 <p className={styleP}>{errors.confirmPassword?.message}</p>
//                             )}
//                         </div>
//                     </div>
    
//                         {/* Campos de CEP e Estado*/}
//                         <div className="flex flex-wrap -mx-3 mb-4">
//                             <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
//                                 <label className="block text-gray-500 text-base mb-0">
//                                     CEP
//                                 </label>
//                                 <input 
//                                     {...register('cep')}
//                                     maxLength={9}
//                                     className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
//                                     type="text" 
//                                     placeholder="Informe seu CEP">
//                                 </input>
//                                 {errors.cep?.message && (
//                                     <p className={styleP}>{errors.cep?.message}</p>
//                                 )}
//                             </div>

//                             <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
//                                 <label className="block text-gray-500 text-base mb-0">
//                                     Estado
//                                 </label>
//                                 <input 
//                                     {...register('estado')}
//                                     maxLength={3}
//                                     className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
//                                     type="text" 
//                                     placeholder="UF">
//                                 </input>
//                                 {errors.estado?.message && (
//                                     <p className={styleP}>{errors.estado?.message}</p>
//                                 )}
//                             </div>
//                         </div>
    
//                         {/* Campos de Endereço, Número, Cidade e Bairro */}
//                         <div className="flex flex-wrap -mx-3 mb-4">
//                             <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
//                                 <label className="block text-gray-500 text-base mb-0">
//                                     Endereço
//                                 </label>
//                                 <input 
//                                     {...register('logradouro')}
//                                     className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
//                                     type="text"
//                                     placeholder="Rua">
//                                 </input>
//                                 {errors.logradouro?.message && (
//                                     <p className={styleP}>{errors.logradouro?.message}</p>
//                                 )}
//                             </div>
    
//                             <div className="w-full md:w-1/3 px-3">
//                                 <label className="block text-gray-500 text-base mb-0">
//                                     Número
//                                 </label>
//                                 <input 
//                                     { ...register('numero', { valueAsNumber: true } ) }
//                                     className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
//                                     type="number">
//                                 </input>
//                                 {errors.numero?.message && (
//                                     <p className={styleP}>{errors.numero?.message}</p>
//                                 )}
//                             </div>
//                         </div>
    
//                         <div className="flex flex-wrap -mx-3 mb-5">
//                             <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
//                                 <label className="block text-gray-500 text-base mb-0">
//                                     Cidade
//                                 </label>
//                                 <input 
//                                     {...register('cidade')}
//                                     className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
//                                     type="text">
//                                 </input>
//                                 {errors.cidade?.message && (
//                                     <p className={styleP}>{errors.cidade?.message}</p>
//                                 )}
//                             </div>
    
//                             <div className="w-full md:w-1/2 px-3">
//                                 <label className="block text-gray-500 text-base mb-0">
//                                     Bairro
//                                 </label>
//                                 <input  
//                                     {...register('bairro')}
//                                     className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
//                                     type="text">
//                                 </input>
//                                 {errors.bairro?.message && (
//                                     <p className={styleP}>{errors.bairro?.message}</p>
//                                 )}
//                             </div>
//                         </div>
    
//                         {/* Botão de cadastro e link para login */}
//                         <div className="px-3 flex flex-wrap -mx-3 mb-2 w-full">
//                             <button 
//                                 type="submit"
//                                 className='bg-jays-orange text-white font-semibold h-8 rounded w-1/3'>
//                                 Cadastrar
//                             </button>
//                         </div>
    
//                         <div className="w-full flex justify-start mt-1">
//                             <span 
//                                 className="text-sm font-semibold font-['Open Sans']">
//                                     Já possui cadastro?
//                             </span>
//                             <Link 
//                                 to="/" 
//                                 className="text-orange-700 text-sm font-semibold font-['Open Sans'] ml-2">
//                                     Log in
//                             </Link>
//                         </div>
//                     </form>
//                     {errorMessage && <ErrorModal message={errorMessage} onClose={closeErrorModal} />}
//                     {successMessage && <SuccessModal message={successMessage} onClose={closeSuccessModal} />}

//                 </div>
//             </div>
//             <ImageCard imagem={jayslogo} />
//             </div>
//         </div>
//         </>
//         )
//     }
    
