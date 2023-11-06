import { Link } from "react-router-dom";
//Propriedades
// type ImageCardProps = {
//     imagem: string;
// };
// 
//Código

export function Header() {
    return (
        <>
            <div className="p-5">
                <nav className="flex items-center justify-between">
                    <h1 className="text-white">Jays</h1>
                    <ul className="flex justify-center items-center text-white">
                        <li className="pr-3">
                        <button><Link to="/">Início</Link></button></li>
                        <li className="pr-3">
                            <button><Link to="#">Sobre nós</Link></button>
                        </li>
                        <li className="pr-3">
                            <button className="hover:bg-jays-hover transition-bg duration-300 text-white font-bold py-2 px-4 rounded border border-white-500">
                                <Link to="/" className="font-semibold">Login</Link>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}