function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  /* pravim taka, che da mozhe da izberem otgovor i kato e veche izbran - da se ocvetqt pravilniq i nevernite i
 da ne mozhe pak da se izbira */
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
