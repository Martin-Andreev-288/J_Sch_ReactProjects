import { useState, useEffect } from "react";

// ideqta na tozi hook e da raboti po absoliutno syshtiq nachin kato useState hook-a, zatova i e s tova ime
// Vazhna reviziq kakvo sme napravili - sled 7-mata minuta na 171 lekciq (malko e dylgo za pisane)

export function useLocalStorageState(initialState, key) {
  // predi beshe watched, setWatched (vzehme go ot App-v1.js)
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    // console.log(storedValue); // ako nqma nishto v spisyka, shte printne null i shte dade greshka. Zatova
    // pravim promqna dolu vmesto return JSON.parse(storedValue); da e taka:
    // Inache e JSON.parse, zashtoto tr da rekonvertnem dannite pak, ponezhe gi prevyrnahme v string, a taka
    // dava greshka
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
