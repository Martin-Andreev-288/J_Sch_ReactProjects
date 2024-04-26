import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

const initialState = {
  questions: [],
  status: "loading", // tozi pyt vmesto s isLoading, go pravim taka. Prilozhenieto ppc ima nqkolko statusa:
  // 'loading', 'error', 'ready', 'active', 'finished'
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

    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}
