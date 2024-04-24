import { useState } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerSyle = {
  display: "flex",
};

// slagame defaultRating, koyto e syzdaden i v index.js. Negovata cel e da pokazva rayting-a, ako user-a veche
// e glasuval, ili prosto da pokazva nqkakyv reyting, koyto sme zadali v skobite mu v index.js
// za defaultRating-a: Maybe you heard or read that we should never initialize state from props. However, this
// is only true if you want the state variable to stay in sync with that passed in props, or in other words,
// if you want the state value to update in case that the prop value is also updated. However, that is clearly
// not the case here. So, we are really only using this defaultRating here basically as seed data, so really
// just as the initial state, and we don't care whether this value here may changes somewhere else in the app,
// so outside this component.
export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating); // tuk veche setvame i external rating-a, ne samo internal-a
  }

  /* textyle shte zavisi ot props-vete, taka che go mestim tuk */
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };
  // pravim taka, che da se pokazva nqkakva duma za ocenkata. Malko obyrkvashto, no vsyshtnost prosto normalen
  // javascript. Tova se sluchva ot {messages.length ... natatyk. Tova e prosto s cel ako nqkoy dobavi razlichen
  // broy na ocenkite s dumi v index.js ot maksimalnata ocenka (t.e. v sluchaq maksimalnata ocenka e 5, znachi i
  // dumite za ocenka tr da sa 5) - tova da dade cifra, vmesto duma (t.e. shte dade 1, 2, 3, 4, 5, vmesto duma).
  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerSyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}

/* starStyle syshto shte sa zavisimi ot props-ovete, zatova i tqh gi mestim
promenqme cvetovete i dolu v JSX-a */
function Star({ onRate, full, onHoverIn, onHoverOut, color, size }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
