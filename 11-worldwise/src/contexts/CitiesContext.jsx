import { useContext } from "react";
import { createContext, useState, useEffect } from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsloading] = useState(false);

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

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
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