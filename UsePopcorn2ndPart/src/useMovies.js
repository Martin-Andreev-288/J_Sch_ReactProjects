import { useState, useEffect } from "react";

// KEY-a go copy i paste-vame ot drugiq fayl. Po-dobre taka, otkolkoto kato props, zashtoto inache tova shte
// uslozhni neshtata
const KEY = "95b5ad09";

// priemame query kato parametyr. Tova ne e komponent, taka che nqma da go priemem kato props, a kato standarten
// parametyr na funkciq
export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      // taka popravqme f-qta za zatvarqne na film. Za celta dobavqme parametyr handleCloseMovie na useMovies
      // v drugiq fayl (sled query parametyra)
      callback?.();

      const controller = new AbortController();
      /* abortcontroller-a e browser API, nqma obshto s reakt, ami s browser-a. Toy e za da napravim taka, che
          da nqma tvyrde mnogo zaqvki */

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError(""); // tr da resetnem error state-a. Sled kato dolu se poluchi greshka, ako ne go resetnem
          // tuk, nqma da se poluchi otnovo
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          console.log(data);

          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          // tova e, za da ne se izpisva edno neshto, koeto ne e greshka, kato greshka zaradi abortcontroller-a
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      // taka veche ne pokazva nishto, ako nqma pone 3 vyvedeni bukvi v searchbar-a
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      // tova e za da se zatvori filma, ako zapochnem da vyvezhdame zaglavieto na drug.
      fetchMovies();
      // TOVA DOLU E CLEANUP FUNKCIQ
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  // vryshtame tezi neshta, ponezhe shte trqbvat v drugiq fayl (tezi promenlivi), a nie sme gi iznesli tuk i
  // veche gi nqma tam. Mozhe da gi vyrnem i kato array, no po-dobre kato obekt. Po-commmon e, osobeno kogato
  //   imame tolkova razlichni neshta.
  // I syotvetno c drugiq fayl pishem const { movies, isLoading, error } = useMovies(query);
  return { movies, isLoading, error };
}
