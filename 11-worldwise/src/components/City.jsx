import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import BackButton from "./BackButton";
import styles from "./City.module.css";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  // console.log(id); // i taka vizhdame obekt s id - {id: '73930385'}. Prichinata kliucha da se kazva id e, che
  // sme go krystili taka v App.js - Route path='cities/:id'. Ako go imenuvame Route path='cities/:city', shte
  // izliza kato {city: '73930385'}. I ponezhe e obekt - go destrukturirame. t.e. const {id}, a en const id.
  // i tova id e id-to na syotvetniq grad ot fayla s gradovete, s koyto syzdavame fake fetch.

  const { getCity, currentCity, isLoading } = useCities();
  // taka ako se promeni id-to, syotvetniq grad sys syotvetnoto id shte se zaredi:
  useEffect(
    function () {
      getCity(id);
    },
    [id]
  );

  const { cityName, emoji, date, notes } = currentCity;
  // dobavqme spinner-a, zashtoto predi za moment se pokazvashe PREDISHNIQ grad. Samo che pri men spinner-a ne
  // raboti zasega zaradi onzi problem v package-json-a.
  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
