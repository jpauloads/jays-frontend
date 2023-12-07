import { AppRoutes } from "./AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { ServicesProvider } from "./contexts/ServicesContext";

import "./styles/global.css";
// import { firebase, auth } from "./service/firebase";

export function App() {
  return (
    <ServicesProvider>
      <AuthProvider>
        <main>
          <div>
            <AppRoutes />
          </div>
        </main>
      </AuthProvider>
    </ServicesProvider>
  );
}
