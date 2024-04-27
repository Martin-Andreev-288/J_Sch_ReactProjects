import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";

function PageNav() {
    // s NavLink se dobavq class="active" na izbranata stranica v dom dyrvoto (mozhem da vidim, ako inspektnem).
    return (
        <nav className={styles.nav}>
            <Logo />

            <ul>
                <li>
                    <NavLink to="/pricing">Pricing</NavLink>
                </li>
                <li>
                    <NavLink to="/product">Product</NavLink>
                </li>
                <li>
                    <NavLink to="/login" className={styles.ctaLink}>Login</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default PageNav;
