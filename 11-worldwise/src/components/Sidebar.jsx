import { Outlet } from 'react-router-dom';
import AppNav from './AppNav';
import Logo from './Logo';
import styles from "./Sidebar.module.css";

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />
            {/* v tova Outlet sa pytishtata, tova e podobno na children props-ovete */}
            <Outlet />

            <footer className={styles.footer}>
                <p className={styles.copyright}>
                    &copy; Copyright {new Date().getFullYear()} by WorldWIse Inc.
                </p>
            </footer>
        </div>
    );
}

export default Sidebar;
