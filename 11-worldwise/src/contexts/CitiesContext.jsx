import { useContext } from "react";
import { createContext, useState, useEffect } from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  /* tova 3-toto po-dobre da e tuk, a ne v City.jsx, zashtoto e globalel state (shte se polzva ot cities i
    countries) */

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsloading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsloading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsloading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("There was an error loading data...");
    } finally {
      setIsloading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsloading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // za da se update-nat gradovete (zashtoto inache shte vidim novodobaveniq chak sled kato prezaredim)
      setCities((cities) => [...cities, data]);
      // taka gradovete trqbva da se dobavqt i v cities.json fayla, no i tova ne stava
    } catch {
      alert("There was an error loading data...");
    } finally {
      setIsloading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
