import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
  questions: [],
  status: "loading", // tozi pyt vmesto s isLoading, go pravim taka. Prilozhenieto ppc ima nqkolko statusa:
  // 'loading', 'error', 'ready', 'active', 'finished'
  index: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready", // tova e i strahotnoto na useReducer, tuk sega mozhem da dobavim i status
        // questions i status chesto shte se smenqt zaedno, zatova i useReducer e tolkova polezen
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return { ...state, status: "active" };

    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  // ako dolu conditionally display-nem komponentite (v Main), shte e mnogo rabota, zatova po-dobre da
  // destrukturirame state obekta
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data })) // tuk pasvame aktualnata data
      .catch((err) => dispatch({ type: "dataFailed" })); // tuk nqma nuzhda ot payload, ne se interesuvame ot
    // greshkata, ne ni trqbva. Dostatychno e da kazhen na state-a, che sega status-a e error. I sega ako sprem
    // syrvyra i vlezem v components i shte vidim, che status-a na hookovete shte e er
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && <Question question={questions[index]} />}
      </Main>
    </div>
  );
}
// i sega ako prezaredim, kato v network promenim na ot no throttling na slow, shte vidim za prezarezhdane
// kakvo izpisva
