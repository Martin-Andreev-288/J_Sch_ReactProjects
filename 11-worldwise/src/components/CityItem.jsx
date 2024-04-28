import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

function CityItem({ city }) {
    const { cityName, emoji, date, id, position } = city;

    // console.log(position); // i poluchavame obekt s lat: ... i lng: ... na vseki grad.
    /* i 1) kato dobavim ?lat=${position.lat} dolu sled id-to, tova se dobavq i kym URL-a i stava eto taka (primer
    s ediniq ot gradovete): http://localhost:5173/app/cities/73930385?lat=38.727881642324164
2) sl tova mozhe da dobavim i latitute-a, t.e. i tova: &lng=${position.lng} i se poluchava:
http://localhost:5173/app/cities/73930385?lat=38.727881642324164&lng=-9.140900099907554
I sega se premestvame v map komponenta i chetem lat-a i lng-a ot URL-a (prehvyrli se tam) */
    return (
        <li>
            <Link className={styles.cityItem} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>({formatDate(date)})</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    );
}

export default CityItem;
