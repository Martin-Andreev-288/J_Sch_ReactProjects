import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

function CityItem({ city }) {
    const { cityName, emoji, date, id } = city;
    /* taka sega to={`${id}`} podava razlichnoto id v URL-a. Ako minem s kursora vyrhu vseki grad, shte izskochi
    neshto kato nadpis v dolniq lqv ygyl. I ako cyknem vyrhu nqkoy grad, shte ni prati v nego. Vizh i promqnata
    v App.jsx. Sluchva se tochno, kakto sme go opredelili tam (s Route path="cities/:id")
    !!!!!!!!!!!!!!1 T.e. (ako pravilno razbiram) sega taka s tozi link CityItem-a e svyrzan s konkretniq grad i kato cyknem
    vyrhu nego, shte ni otvede v grada, koyto e v City komponenta.
    CityItem poluchava props ot CityList. City komponenta zasega se importva dikretno v App.jsx.
    Obqsnenie na Jonas: V App.jsx: Here we specify the name of the param, and as always the element that should be rendered
    when the URL matches this path. Then we basically link to this route, so we create a link (in CityItem.jsx) and we did so
    by passing in this data right here (to={`${id}) so this ID of each city. And then as a final step in City.jsx we read that
    data from the URL using this useParams hook  */
    return (
        <li>
            <Link className={styles.cityItem} to={`${id}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>({formatDate(date)})</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    );
}

export default CityItem;
