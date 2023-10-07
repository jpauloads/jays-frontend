import { AppRoutes } from './AppRoutes';
import { AuthProvider } from './contexts/AuthContext';

import './styles/global.css';
// import { firebase, auth } from "./service/firebase";

export function App() {
  return (
    <AuthProvider>
      <main>
        <div>
          <AppRoutes />
        </div>
      </main>
    </AuthProvider>
  )
}