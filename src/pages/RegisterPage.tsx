import { ImageCard } from "../components/ImageCard";
import jayslogo from '../assets/images/persona2.png';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import axios from 'axios';
import { zipCodeMask, cpfMask } from "../utils/masks";
import { api } from "../lib/axios";

const createUserFormSchema = z.object({
    nome: z.string().min(1, 'Nome é necessário'),
    documento: z.string().length(14, 'CPF inválido'),
    cep: z.string().min(9, 'Por favor, informe um CEP válido'),
    logradouro: z.string().min(1, 'Por favor, uma rua válida'),
    numero: z.number().min(1, 'Escreva um número'),
    cidade: z.string().min(1, 'Por favor, informe uma cidade válida'),
    bairro: z.string().min(1, 'Campo inválido'),
    descricao: z.string().default('CPF'),
    login: z.string().min(4, 'Username deve ter pelo menos 4 caracteres'),
    email: z.string().email('Email inválido'),
    senha: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
    confirmPassword: z.string().min(8, 'Confirmação de senha deve ter pelo menos 8 caracteres').optional()
}).transform((field) => ({
    nome: field.nome,
    email: field.email,
    senha: field.senha,
    confirmPassword: field.confirmPassword,
    login: field.login,
    documento: field.documento,
    cep: field.cep,
    logradouro: field.logradouro,
    bairro: field.bairro,
    cidade: field.cidade,
    numero: field.numero,
    descricao: field.descricao,

}));

const styleP = "text-xs font-semibold text-red-500"

type CreateUserFormData = z.infer<typeof createUserFormSchema>

type AddressProps = {
    logradouro: string;
    localidade: string;
    uf: string;
    bairro: string;
}

export function RegisterPage() {
    const { 
        handleSubmit,
        register,
        watch,
        setValue,
        setError,
        formState: { errors }
    } = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserFormSchema),
        criteriaMode: 'all',
        mode: 'all',
        defaultValues: {
            cep: '',
            logradouro: '',
            // numero: 0,
            cidade: '',
            bairro: ''
        }
    });

    const zipCode = watch('cep');

    const handleFormSubmit = async (data: CreateUserFormData) => {
        if (data.senha !== data.confirmPassword) {
            setError('confirmPassword', {
                type: "manual",
                message: "Senha e confirmação de senha não são iguais."
            });
            return;
        }
        
        const { confirmPassword, ...payload } = data;
        console.log(payload);

        try {
            const response = await api.post('/usuario', payload);
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao enviar dados para a API", error);
        }
    }

    const handleSetData = useCallback((data: AddressProps) => {
        setValue('cidade', data.localidade);
        setValue('logradouro', data.logradouro);
        setValue('bairro', data.bairro);
    }, [])

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

    return (
        <>
        <div className="w-screen h-screen flex flex-wrap items-center justify-center">
            <div className="flex">
            <div className="bg-white rounded-bl-2xl rounded-tl-2xl p-10 shadow-lg w-full">
                <h2 className="text-2xl font-semibold text-start font-['Raleway']">Jay's</h2>
                <h1 className="justify-center flex mt-2 mb-5 text-4xl font-semibold font-['Open Sans']">Bem Vindo ao Jay's</h1>
                <div className='flex justify-center'>
    
                    <form onSubmit={handleSubmit(handleFormSubmit)} className="w-9/12 max-w-2xl">
    
                        {/* Campos de Nome e Sobrenome */}
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full px-3">
                                <label className="block text-gray-500 text-base mb-0">
                                    Nome Completo
                                </label>
                                <input 
                                    {...register('nome')}
                                    className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
                                    type="text">
                                </input>
                                {errors.nome?.message && (
                                    <p className={styleP}>{errors.nome?.message}</p>
                                )}
                            </div>
                        </div>
    
                        {/* Campo de CPF */}
                        <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block text-gray-500 text-base mb-0">
                                Username
                            </label>
                            <input 
                                {...register('login')}
                                className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
                                id="grid-username" 
                                type="text">
                            </input>
                            {errors.login?.message && (
                                <p className={styleP}>{errors.login?.message}</p>
                            )}
                        </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block text-gray-500 text-base mb-0">
                                    CPF
                                </label>
                                <input 
                                    {...register('documento')}
                                    maxLength={14}
                                    className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
                                    type="text" 
                                    onChange={(e) => {
                                        e.target.value = cpfMask(e.target.value);
                                        setValue('documento', e.target.value);
                                    }} 
                                >
                                </input>
                                {errors.documento?.message && (
                                    <p className={styleP}>{errors.documento?.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                            <label className="block text-gray-500 text-base mb-0">
                                Email
                            </label>
                            <input 
                                {...register('email')}
                                className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white "
                                id="grid-email" 
                                type="email" placeholder="Informe seu email">
                            </input>
                            {errors.email?.message && (
                                <p className={styleP}>{errors.email?.message}</p>
                            )}
                        </div>
                    </div>

                        <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                            <label className="block text-gray-500 text-base mb-0">
                                Senha
                            </label>
                            <input 
                                {...register('senha')}
                                className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white "
                                id="grid-password" 
                                type="password" placeholder="********">
                            </input>
                            {errors.senha?.message && (
                                <p className={styleP}>{errors.senha?.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                            <label className="block text-gray-500 text-base mb-0">
                                Confirme sua senha
                            </label>
                            <input 
                                {...register('confirmPassword')}
                                className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white "
                                id="grid-confirm-password" 
                                type="password" placeholder="********">
                            </input>
                            {errors.confirmPassword?.message && (
                                <p className={styleP}>{errors.confirmPassword?.message}</p>
                            )}
                        </div>
                    </div>
    
                        {/* Campos de CEP e Estado (que será populado automaticamente) */}
                        <div className="flex flex-wrap -mx-3 mb-4">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block text-gray-500 text-base mb-0">
                                    CEP
                                </label>
                                <input 
                                    {...register('cep')}
                                    maxLength={9}
                                    className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
                                    type="text" 
                                    placeholder="Informe seu CEP">
                                </input>
                                {errors.cep?.message && (
                                    <p className={styleP}>{errors.cep?.message}</p>
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
                                    {...register('logradouro')}
                                    className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
                                    type="text"
                                    placeholder="Rua">
                                </input>
                                {errors.logradouro?.message && (
                                    <p className={styleP}>{errors.logradouro?.message}</p>
                                )}
                            </div>
    
                            <div className="w-full md:w-1/3 px-3">
                                <label className="block text-gray-500 text-base mb-0">
                                    Número
                                </label>
                                <input 
                                    { ...register('numero', { valueAsNumber: true } ) }
                                    className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
                                    type="number">
                                </input>
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
                                    {...register('cidade')}
                                    className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
                                    type="text">
                                </input>
                                {errors.cidade?.message && (
                                    <p className={styleP}>{errors.cidade?.message}</p>
                                )}
                            </div>
    
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block text-gray-500 text-base mb-0">
                                    Bairro
                                </label>
                                <input  
                                    {...register('bairro')}
                                    className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" 
                                    type="text">
                                </input>
                                {errors.bairro?.message && (
                                    <p className={styleP}>{errors.bairro?.message}</p>
                                )}
                            </div>
                        </div>
    
                        {/* Botão de cadastro e link para login */}
                        <div className="px-3 flex flex-wrap -mx-3 mb-2 w-full">
                            <button 
                                type="submit"
                                className='bg-jays-orange text-white font-semibold h-8 rounded w-1/3'>
                                Cadastrar
                            </button>
                        </div>
    
                        <div className="w-full flex justify-start mt-1">
                            <span 
                                className="text-sm font-semibold font-['Open Sans']">
                                    Já possui cadastro?
                            </span>
                            <Link 
                                to="/" 
                                className="text-orange-700 text-sm font-semibold font-['Open Sans'] ml-2">
                                    Log in
                            </Link>
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
    
