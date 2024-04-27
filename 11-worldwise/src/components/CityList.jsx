import Spinner from "./Spinner";
import styles from './CityList.module.css';
import CityItem from "./CityItem";
import Message from "./Message";

function CityList({ cities, isLoading }) {
    // pri men obache spinner-a ne mozhe da se poluchi, ima problem s tova --delay 500 v json fayla i go mahnah
    if (isLoading) return <Spinner />;

    if (!cities.length)
        return (
            <Message message="Add your first city by clicking on a city on the map" />
        );

    return (
        <ul className={styles.cityList}>
            {cities.map((city) => (
                <CityItem city={city} key={city.id} />
            ))}
        </ul>
    );
}

export default CityList;
