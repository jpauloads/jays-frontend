import './styles/global.css';
import jayslogo from './assets/images/jaylogo.svg';
// import { firebase, auth } from "./service/firebase";

export function App() {
  return (
    <main className='w-screen h-screen bg-jays-orange flex items-center justify-center'>

      {/* <div className='border-4 round flex w-8/12'> */}
      <div className="flex">

        <div className="bg-white rounded-bl-2xl rounded-tl-2xl items-center p-10 shadow-lg w-full max-lg:rounded-2xl">
        <h2 className="text-gray-500 text-3xl font-semibold text-start font-['Raleway']">Jay's</h2>
          <h1 className="justify-center flex mt-16 mb-16 text-gray-500 text-4xl font-semibold font-['Open Sans']">Bem Vindo de Volta</h1>

            <div className='flex justify-center text-gray-500'>

              <form className='flex flex-col gap-4 w-8/12' action="">

                <div className='mb-4'>
                  <label className='mb-2' htmlFor="">
                    E-mail</label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline focus:shadow-outline"
                  id="email"
                  placeholder="Informe seu e-mail"
                  type="email" 
                  name='email'/>
                </div>

                <div className='mb-1'>
                  <label className='mb-2' htmlFor="">
                    Password</label>
                  <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="password" 
                  placeholder="******************"
                  type="password" 
                  name='password'/>
                </div>
                <a className='text-xs text-right text-orange-700' href="#">Esqueceu a senha?</a>
                
                <div className='flex justify-center items-center flex-col'>
                <button 
                  type='submit'
                  className='bg-jays-orange text-white mt-10 h-8 rounded w-10/12'>
                    Login
                  </button>

                  <button 
                  // onClick={signInWithGoogle}
                  className='bg-white mt-11 font-semibold h-8 border border-gray-500 rounded-md w-10/12'>
                    Login com o Google
                </button>
                <a className='pt-8 text-xs text-right' href="#">
                  Não tem uma conta? <span className="text-orange-700 font-semibold">Cadastre-se</span>
                </a>

                </div>

              </form>

            </div>
      </div>

      <div className='bg-jays-gray w-full rounded-tr-2xl rounded-br-2xl max-lg:hidden'>
        <img src={jayslogo} alt="Logo Jays" className='p-24'/>
      </div>
        
      </div>
    </main> 
  )
}