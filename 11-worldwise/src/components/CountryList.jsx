import Spinner from "./Spinner";
import styles from './CountryList.module.css';
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
    const { cities, isLoading } = useCities();
    // pri men obache spinner-a ne mozhe da se poluchi, ima problem s tova --delay 500 v json fayla i go mahnah
    if (isLoading) return <Spinner />;

    if (!cities.length)
        return (
            <Message message="Add your first city by clicking on a city on the map" />
        );

    const countries = cities.reduce((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }];
        else return arr;
    }, []);

    return (
        <ul className={styles.countryList}>
            {countries.map((country) => (
                <CountryItem country={country} key={country.country} />
            ))}
        </ul>
    );
}

export default CountryList;
