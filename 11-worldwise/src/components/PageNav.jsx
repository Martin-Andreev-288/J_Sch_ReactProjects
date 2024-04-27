import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";

function PageNav() {
    // s NavLink se dobavq class="active" na izbranata stranica v dom dyrvoto (mozhem da vidim, ako inspektnem).
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/pricing">Pricing</NavLink>
                </li>
                <li>
                    <NavLink to="/product">Product</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default PageNav;
