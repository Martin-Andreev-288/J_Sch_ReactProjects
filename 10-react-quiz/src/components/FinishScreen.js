function FinishScreen({ points, maxPossiblePoints, highscore, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🎖️";
  if (percentage >= 80 && percentage < 100) emoji = "🥳";
  if (percentage >= 50 && percentage < 80) emoji = "😊";
  if (percentage >= 0 && percentage < 50) emoji = "🤔";
  if (percentage === 0) emoji = "🤦";

  /* !!!!! Za da ne tr da sme otgovorili na vsichki vyprosi, za da mozhem da proverim, v Components -> hooks ->
  reducer rychno smenqme status-a na "finished" i taka shte ni se renderira vse edno sme zavyrshili testa
    pravim i taka, che da se zapazi highscore-a
  */
  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </>
  );
}

export default FinishScreen;
