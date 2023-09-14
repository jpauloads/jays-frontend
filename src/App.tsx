import './styles/global.css';

import { Habit } from "./components/Habit"

function App() {
  return (
    <div>
      <Habit completed={3}/>
      <Habit completed={4}/>
      <Habit completed={5}/>
      <Habit completed={6}/>
      <Habit completed={7}/>
      <Habit completed={8}/>
      <Habit completed={9}/>
      <Habit completed={10}/>
    </div>
  )
}

export default App

//instalar:
//tailwindcss     Plugin do postcss
//postcss         Automatizar tarefas dentro do css
//autoprefixer    Adiciona prefixos de browser
//npx tailwindcss init -p
//após isso crio a pasta syles, e o arquivo global.css