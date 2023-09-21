import { ImageCard } from "../components/ImageCard";
import jayslogo from '../assets/images/persona2.png';
import { Link } from 'react-router-dom';

export function RegisterPage() {
    return (
    <>

        <div className="bg-white rounded-bl-2xl rounded-tl-2xl p-10 shadow-lg w-full">
            <h2 className="text-2xl font-semibold text-start font-['Raleway']">Jay's</h2>
            <h1 className="justify-center flex mt-2 mb-5 text-4xl font-semibold font-['Open Sans']">Bem Vindo ao Jay's</h1>
            <div className='flex justify-center'>

                <form className="w-9/12 max-w-2xl">

                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block text-gray-500 text-base mb-0">
                                Nome
                            </label>
                            <input className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text">
                            </input>
                            
                        </div>

                        <div className="w-full md:w-1/2 px-3">
                            <label className="block text-gray-500 text-base mb-0">
                                Sobrenome
                            </label>
                            <input className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-last-name" type="text" >
                            </input>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                            <label className="block text-gray-500 text-base mb-0">
                                Email
                            </label>
                            <input className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white " id="grid-email" type="email" placeholder="Informe seu email">
                            </input>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block text-gray-500 text-base mb-0">
                                Telefone
                            </label>
                            <input className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-phone" type="tel">
                            </input>
                            
                        </div>

                        <div className="w-full md:w-1/2 px-3">
                            <label className="block text-gray-500 text-base mb-0">
                                Data de Nascimento
                            </label>
                            <input className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-birthday" type="date" >
                            </input>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block text-gray-500 text-base mb-0">
                                Username
                            </label>
                            <input className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-username" type="text">
                            </input>
                            
                        </div>

                        <div className="w-full md:w-1/2 px-3">
                            <label className="block text-gray-500 text-base mb-0">
                                CPF/CNPJ
                            </label>
                            <input className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-cpf" type="text" >
                            </input>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                            <label className="block text-gray-500 text-base mb-0">
                                CEP
                            </label>
                            <input className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-cep" type="text" placeholder="Informe seu CEP">
                            </input>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                            <label className="block text-gray-500 text-base mb-0">
                                Endereço
                            </label>
                            <input className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-address" type="text">
                            </input>
                            
                        </div>

                        <div className="w-full md:w-1/3 px-3">
                            <label className="block text-gray-500 text-base mb-0">
                                Número
                            </label>
                            <input className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-number" type="text" >
                            </input>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-5">
                        <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
                            <label className="block text-gray-500 text-base mb-0">
                                Cidade
                            </label>
                            <input className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-city" type="text">
                            </input>
                            
                        </div>

                        <div className="w-full md:w-1/3 px-3">
                            <label className="block text-gray-500 text-base mb-0">
                                Estado
                            </label>
                            <input className="h-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-state" type="text" >
                            </input>
                        </div>
                    </div>
                    
                    <div className="px-3 flex flex-wrap -mx-3 mb-2 w-full">
                        <button 
                            type='submit'
                            className='bg-jays-orange text-white font-semibold h-8 rounded w-1/3'>
                            Cadastrar
                        </button>
                    </div>

                    <div className="w-full flex justify-start mt-1">
                        <span 
                            className="text-sm font-semibold font-['Open Sans']">
                                Já possui cadastro?
                        </span>
                        <a className="text-orange-700 text-sm font-semibold font-['Open Sans'] ml-2"
                        href="#"
                        >
                            Log in
                        </a>
                        {/* <Link 
                            to="#" 
                            className="text-orange-700 text-sm font-semibold font-['Open Sans'] ml-2">
                                Log in
                        </Link> */}
                    </div>

                </form>

            </div>
        </div>
        <ImageCard imagem={jayslogo} />
    </>
    )
}