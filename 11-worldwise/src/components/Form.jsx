// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        {/* ponezhe ima 3 vida butona (s 3 razlichni klasa v Button.module.css), s type mozhem da vyvedem edno
         ot 3-te imena. Tuk go pishem taka, posle se predava v Button.jsx i se izpolzva v className-a
         Vizh razqsnenieto i tam, zashtoto ima vazhno prodylzhenie.
         Inache tuk imame primer s 2 razlichni butona, koito se formatirat po 1 i syshti nachin (izpolzvani sa
         2 razlichni klasa za 2-ta po interesen nachin).
         Inache tuk butona se namira vyv formata, koeto znachi, che ako cyknem back, this will trigger the form
         to be submitted. And so that will then cause the page to reload. I ZA TOVA tr da dobavim prevent
         default. */}
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
