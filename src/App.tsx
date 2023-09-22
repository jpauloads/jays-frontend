import { AppRoutes } from './AppRoutes';

import './styles/global.css';
// import { firebase, auth } from "./service/firebase";

export function App() {
  return (
    <main className="w-screen h-screen flex flex-wrap items-center justify-center">
      <div className="flex">
        <AppRoutes />
      </div>
    </main> 
  )
}