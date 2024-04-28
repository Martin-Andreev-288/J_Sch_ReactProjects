import styles from './Button.module.css';

function Button({ children, onClick, type }) {

    /* tuk obache za da izpolzvame ediniqt ot 3-te klasa na butona, tr da imame 2 klasa. Pravim go taka:
    Interesnoto e, che taka dinamichno predavame 2 razlichni stila na 2-ta butona (t.e. na ADD i na back)
    */
    return (
        <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
            {children}
        </button>
    );
}

export default Button;
