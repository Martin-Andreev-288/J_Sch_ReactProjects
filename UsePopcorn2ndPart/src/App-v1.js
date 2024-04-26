import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "95b5ad09";
/* So there are basically two strategies to decide if you want to create a new custom hook. The first one is
that we want to reuse some part of our non-visual logic, so just as we learned in the previous lecture. And the
second factor may be that we simply want to extract a huge part of our component out into some custom hook.
And so that's actually what we will do in this lecture.
In this lecture it's shown to us how we can extract all the stateful logic that belongs together into a nice
and well-packaged custom hook. */
export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // tezi neshta za vyrnati ot drugiq fayl. Kogato gi napishem tuk taka, pak zapochva da si raboti po syshtiq
  // nachin, kakto i predi da napravim tova. SAMO f-qta za zatvarqne na filma ne raboteshe.
  // Zatova dobavihme handleCloseMovie i napisahme callback?.(); v drugiq fayl. Taka se poluchava hoisting i
  // veche pak si raboti i tq.
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  // const [watched, setWatched] = useState([]);
  // tuk promenqme tozi state, za nachalna stoynost zadavame callback funkciq.
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    // tr da rekonvertnem dannite pak, ponezhe gi prevyrnahme v string, a taka dava greshka
    return JSON.parse(storedValue);
  });

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  // tr da e JSON.stringify, zashtoto localStorage izpolzva samo stringove
  /* mozhem da vidim zapazenoto v storage-a v Application -> Storage -> Local storage */
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  return (
    <>
      <NavBar movies={movies}>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔</span> {message}
    </p>
  );
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(
    function () {
      function callback(e) {
        // tova e za da ne se trie vyvedenoto, ako pak natisnem enter, dokato tyrsachkata e aktivna
        // t.e. kazvame mu prosto "ne pravi nishto"
        if (document.activeElement === inputEl.current) return;

        // pravim go taka, zashtoto inache se aktivirashe pri vseki natisnat buton, a tr da e samo pri enter
        if (e.code === "Enter") {
          inputEl.current.focus();
          setQuery("");
        }
      }

      // kak da napr taka, che kato natisnem enter, tyrsachkata za filmi da se aktivira (malko po-gore ima
      // vazhno utochnenie, zashtoto taka shte e s vseki key, a tr samo s enter)
      document.addEventListener("keydown", callback);
      return () => document.addEventListener("keydown", callback);
    },
    [setQuery]
  );

  useEffect(function () {
    console.log(inputEl.current); // <input class="search" type="text" placeholder="Search movies..." value> - tova e DOM elementa
    // We need to read the current property which is basically like that box where whatever we store in the ref
    // will get stored. And so inputEl.current is now really the DOM element itself.
    inputEl.current.focus();
  }, []);

  // nepravilniqt nachin da izberem DOM element v reakt
  // useEffect(function () {
  //   const el = document.querySelector(".search");
  //   console.log(el);
  //   el.focus();
  // }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong> {movies.length} </strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  // vsqko movie ima key imdbID property v obekta. Ako printnem movie v konzolata, shte vidim. Ot tam vzimame
  // tova movie.imdbID
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  // kopirame fetch-a otgore i podmenqme chast ot linka. GLEDAME v sayta!!! obdbapi.com. Ot tam se orientirame
  // che tr da ima i sled KEY i predi selectedId. Ima edin ogromen paragraf Parameters.

  // tuk ponezhe filmite sa v obekt, nachalniq state shte e obekt (ako napishem const data = await res.json();
  // i sled tova console.log(data) i getMovieDetails() (vizh v screenshot-a kyde tochno) - shte vidim)
  const [movie, setMovie] = useState({});
  // za da imame loading indikator, dokato se zarezhda izbraniq film (za razlika ot predniq pyt, tuk ne
  // napisahme tova za greshka s interneta i t.n.):
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  // So we created this ref here where we want to store the amount of clicks that happened on the rating
  // before the movie is added but we don't want to render that information onto the user interface. Or in
  // other words, we do not want to create a re-render.
  const countRef = useRef(0);
  // we are not allowed to mutate the ref in render logic, so we must use useEffect.

  useEffect(
    function () {
      if (userRating) countRef.current++;
      // so with a ref, we don't have a set function but instead we simply mutate the current property which is
      // in the ref. And so that's why we say that a ref is basically like a box that can hold any value.
      // ako go napravim s obiknovena promenliva (primerno let count = 0; vmesto const countRef = useRef(0)),
      // nqma da raboti, zashtoto tq shte se reset-va sled vsqko rerend-yrvane i vinagi shte se vryshta na 0
      // i nakraq rezultatyt na klikaniqta shte si e 1 sled poslednoto klikane, kogato count-yt se dobavq v
      // obekta.
    },
    [userRating]
  );

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  // tova dolnoto e da se poqvqva rating-a na user-a, ako e glasuval
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  // destrukturirame ot tozi obekt, ponezhe jonas ne haresva key-ovete da zapochvat s glavna bukva:
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  /* tozi dolen useEffect tr da e tuk, zashtoto ako e s gornite, shte ni izpisva "CLOSING" v konzolata dori i
  veche da sme zatvorili filma i da ne sme v nego
  !!! Each time that this effect here is executed, it'll basically add one more event listener to the document.
  And so if we open up 10 movies and then close them all, we will end up with 10 of the same event listeners
  attached to the document which of course, is not what we want. Po tazi prichina nay-dolu dobavqne cleanup
  funkciq (callback)
   */
  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          onCloseMovie();
          console.log("CLOSING");
        }
      }

      document.addEventListener("keydown", callback);

      // callback funkciq
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovie]
  );

  console.log(title, year); // purvonachalno printi undefined undefined, sled tova veche si printi zaglavieto
  // i godinata. Tova e zaradi procesa s await/useEffect () - pyrvonachalno e prazen obekt gore, posle
  // setMovie(data); go pylni. Vyv videoto e nqkyde sled 5-tata minuta
  // ako NQMA selectedId dolu v dependency array-a, nqma da se smenq izbraniq film (shte si stoi syshtiq)
  // hubavo obqsnenie za tova nqkyde sled 12-tata minuta
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      // tova if e za da ne izpisva undefined v nachaloto, kakto se poluchava bez nego syvsem zamalko
      document.title = `Movie | ${title}`;

      // tova dolu e cleanup funkciq. Tq raboti na principa na closure-a. Kogato zatvorim filma, shte se
      // izpishe console log-a dolu, zashtoto tq pomni. Po tozi nachin veche zaglavieto izghezva, kato zatvorim
      // fila.
      return function () {
        document.title = "usePopcorn";
        console.log(`Clean up effect for movie ${title}`);
      };
    },
    [title]
  );

  // tova &larr; dolu e strelka nalqvo. S neq vryshtame nazad v sluchaq (ili zatvarqme otvoreniq film)
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to List
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with movie {watchedUserRating} <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
