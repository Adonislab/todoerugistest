import { Outlet, Link } from "react-router-dom";
import '../styles/Navigation.css';



export default function Layout() {

    

	return (
		<>
			<nav>
                <ul>
                    <li>
                        <Link to="/">Acceuil</Link>
                    </li>
                    <li>
                        <Link to="/task">Planification</Link>
                    </li>
            
                    
                </ul>
            </nav>
            <Outlet/>
		</>
	);
}