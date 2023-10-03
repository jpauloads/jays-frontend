import { ImageCard } from "../components/ImageCard";
import jayslogo from '../assets/images/persona2.png';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import axios from 'axios';
import { zipCodeMask } from "../utils/masks";

const createUserFormSchema = z.object({
    name: z.string().min(1, 'Nome é necessário'),
    lastName: z.string().min(1, 'Sobrenome é necessário'),
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
    confirmPassword: z.string().min(8, 'Confirmação de senha deve ter pelo menos 8 caracteres'),
    phone: z.string().min(9, 'Número inválido'),
    birthdate: z.string().min(1, 'Informe a data'),
    username: z.string().min(4, 'Username deve ter pelo menos 4 caracteres'),
    cpf: z.string().length(11, 'CPF inválido'),
    address: z.object({
        zipCode: z.string().min(9, 'Por favor, informe um CEP válido'),
        street: z.string().min(1, 'Por favor, uma rua válida'),
        number: z.string(),
        city: z.string().min(1, 'Por favor, informe uma cidade válida'),
        state: z.string().min(1, 'Campo inválido'),
        district: z.string().min(1, 'Campo inválido'),
    })
})
    .transform((field) => ({
        name: field.name,
        lastName: field.lastName,
        email: field.email,
        password: field.password,
        confirmPassword: field.confirmPassword,
        phone: field.phone,
        birthdate: field.birthdate,
        username: field.username,
        cpf: field.cpf,
        address: {
            zipCode: field.address.zipCode,
            street: field.address.street,
            number: field.address.number,
            city: field.address.city,
            state: field.address.state,
            district: field.address.district
        }
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
            address: {
                zipCode: '',
                street: '',
                number: '',
                city: '',
                state: '',
                district: ''
            }
        }
    });

    const zipCode = watch('address.zipCode');

    const handleFormSubmit = async (data: CreateUserFormData) => {
        if (data.password !== data.confirmPassword) {
            setError('confirmPassword', {
                type: "manual",
                message: "Senha e confirmação de senha não são iguais."
            });
            return;
        }
        console.log(data);

        // Envio dos dados para a API
        // try {
        //     const response = await axios.post('URL_DA_SUA_API', data);
        //     console.log(response.data);
        //     // Você pode adicionar mais lógica aqui dependendo da resposta da sua API.
        // } catch (error) {
        //     console.error("Erro ao enviar dados para a API", error);
        // }
    }

    const handleSetData = useCallback((data: AddressProps) => {
        setValue('address.city', data.localidade);
        setValue('address.street', data.logradouro);
        setValue('address.state', data.uf);
        setValue('address.district', data.bairro);
    }, [])

    const handleFetchAddress = useCallback(async (zipCode: string) => {
        const { data } = await axios.get(
            `https://viacep.com.br/ws/${zipCode}/json/`
        );

        handleSetData(data)
    }, []);

    useEffect(() => {
        setValue('address.zipCode', zipCodeMask(zipCode));

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

                            <form
                                onSubmit={handleSubmit(handleFormSubmit)}
                                className="w-9/12 max-w-2xl">

                                <div className="flex flex-wrap -mx-3 mb-4">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block text-gray-500 text-base mb-0">
                                            Nome
                                        </label>
                                        <input
                                            {...register('name')}
                                            className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                            id="grid-first-name"
                                            type="text">
                                        </input>
                                        {errors.name?.message && (
                                            <p className={styleP}>{errors.name?.message}</p>
                                        )}
                                    </div>

                                    <div className="w-full md:w-1/2 px-3">
                                        <label className="block text-gray-500 text-base mb-0">
                                            Sobrenome
                                        </label>
                                        <input
                                            {...register('lastName')}
                                            className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                            id="grid-last-name"
                                            type="text" >
                                        </input>
                                        {errors.lastName?.message && (
                                            <p className={styleP}>{errors.lastName?.message}</p>
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
                                            {...register('password')}
                                            className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white "
                                            id="grid-password"
                                            type="password" placeholder="***************">
                                        </input>
                                        {errors.password?.message && (
                                            <p className={styleP}>{errors.password?.message}</p>
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
                                            type="password" placeholder="***************">
                                        </input>
                                        {errors.confirmPassword?.message && (
                                            <p className={styleP}>{errors.confirmPassword?.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-wrap -mx-3 mb-4">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block text-gray-500 text-base mb-0">
                                            Telefone
                                        </label>
                                        <input
                                            {...register('phone')}
                                            className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                            id="grid-phone"
                                            type="tel">
                                        </input>
                                        {errors.phone?.message && (
                                            <p className={styleP}>{errors.phone?.message}</p>
                                        )}
                                    </div>

                                    <div className="w-full md:w-1/2 px-3">
                                        <label className="block text-gray-500 text-base mb-0">
                                            Data de Nascimento
                                        </label>
                                        <input
                                            {...register('birthdate')}
                                            className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                            id="grid-birthday"
                                            type="date" >
                                        </input>
                                        {errors.birthdate?.message && (
                                            <p className={styleP}>{errors.birthdate?.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-wrap -mx-3 mb-4">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block text-gray-500 text-base mb-0">
                                            Username
                                        </label>
                                        <input
                                            {...register('username')}
                                            className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                            id="grid-username"
                                            type="text">
                                        </input>
                                        {errors.username?.message && (
                                            <p className={styleP}>{errors.username?.message}</p>
                                        )}
                                    </div>

                                    <div className="w-full md:w-1/2 px-3">
                                        <label className="block text-gray-500 text-base mb-0">
                                            CPF/CNPJ
                                        </label>
                                        <input
                                            {...register('cpf')}
                                            maxLength={11}
                                            className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                            id="grid-cpf"
                                            type="text" >
                                        </input>
                                        {errors.cpf?.message && (
                                            <p className={styleP}>{errors.cpf?.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-wrap -mx-3 mb-4">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block text-gray-500 text-base mb-0">
                                            CEP
                                        </label>
                                        <input
                                            {...register('address.zipCode')}
                                            maxLength={9}
                                            className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                            id="grid-cep"
                                            type="text"
                                            placeholder="Informe seu CEP">
                                        </input>
                                        {errors.address?.zipCode?.message && (
                                            <p className={styleP}>{errors.address?.zipCode?.message}</p>
                                        )}
                                    </div>
                                    <div className="w-full md:w-1/2 px-3">
                                        <label className="block text-gray-500 text-base mb-0">
                                            Estado
                                        </label>
                                        <input
                                            {...register('address.state')}
                                            className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                            id="grid-state"
                                            type="text">
                                        </input>
                                        {errors.address?.state?.message && (
                                            <p className={styleP}>{errors.address?.state?.message}</p>
                                        )}
                                    </div>

                                </div>

                                <div className="flex flex-wrap -mx-3 mb-4">
                                    <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                                        <label className="block text-gray-500 text-base mb-0">
                                            Endereço
                                        </label>
                                        <input
                                            {...register('address.street')}
                                            className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                            id="grid-street"
                                            type="text"
                                            placeholder="Rua">
                                        </input>
                                        {errors.address?.street?.message && (
                                            <p className={styleP}>{errors.address?.street?.message}</p>
                                        )}
                                    </div>

                                    <div className="w-full md:w-1/3 px-3">
                                        <label className="block text-gray-500 text-base mb-0">
                                            Número
                                        </label>
                                        <input
                                            className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                            id="grid-number"
                                            type="number">
                                        </input>
                                        {errors.address?.number?.message && (
                                            <p className={styleP}>{errors.address?.number?.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-wrap -mx-3 mb-5">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block text-gray-500 text-base mb-0">
                                            Cidade
                                        </label>
                                        <input
                                            {...register('address.city')}
                                            className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                            id="grid-city"
                                            type="text">
                                        </input>
                                        {errors.address?.city?.message && (
                                            <p className={styleP}>{errors.address?.city?.message}</p>
                                        )}
                                    </div>

                                    <div className="w-full md:w-1/2 px-3">
                                        <label className="block text-gray-500 text-base mb-0">
                                            Bairro
                                        </label>
                                        <input
                                            {...register('address.district')}
                                            className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                            id="grid-district"
                                            type="text">
                                        </input>
                                        {errors.address?.district?.message && (
                                            <p className={styleP}>{errors.address?.district?.message}</p>
                                        )}
                                    </div>
                                </div>

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