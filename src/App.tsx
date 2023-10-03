import { AppRoutes } from './AppRoutes';

import './styles/global.css';
// import { firebase, auth } from "./service/firebase";

export function App() {
  return (
    <div>
      <main>
        <div>
          <AppRoutes />
        </div>
      </main>
    </div>
  )
}