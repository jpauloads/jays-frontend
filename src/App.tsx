import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

import './styles/global.css';
// import { firebase, auth } from "./service/firebase";

export function App() {
  return (
    <main className="w-screen h-screen flex flex-wrap items-center justify-center">
      <div className="flex">
        <RegisterPage />
        {/* <LoginPage /> */}
      </div>
    </main> 
  )
}