import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    // taka kato cyknem na logoto, otivame v home stranicata
    <Link to="/">
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
