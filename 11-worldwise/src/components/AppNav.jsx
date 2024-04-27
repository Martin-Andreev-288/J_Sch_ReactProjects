import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav() {
    // kak da switchvame mezhdu nestnati elementi (za da ne pishem gore v bara, za da otidem na koyto iskame)
    // react sam razbira koy element e izbraniq (tova inache e podobno na butoni i ppc dosega go pravihme s
    // useState)
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <NavLink to="cities">Cities</NavLink>
                </li>
                <li>
                    <NavLink to="countries">Countries</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default AppNav
