import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
// import App from './App';

import StarRating from "./StarRating";

// taka (sled kato sme i podali onSetRating i sme slozhili onSetRating(rating) v StarRating komponenta v
// StarRating.js), sme dali i ability na tozi test komponent to get access to that internal state
// I sega veche se izpisva "This movie was rated "kolkoto zvezdi sme slozhili" stars"
function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating size={24} color="red" className="test" defaultRating={3} />

    <Test />
  </React.StrictMode>
);

/* sega StarRating e reusable. Ako slozhim oshte edin pod pyrviq (s maxRating={5}), shte se renderira i toy.
Primerno mozhe da e <StarRating size={24} color="red". Mozhe da slozhim i className
(primerno className="imenaklasa") /> */
