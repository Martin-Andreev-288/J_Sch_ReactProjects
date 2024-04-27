function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null;
  // za da nqma next buton, sled kato minem posledniq vypros
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  // kogato sme veche na posledniq vypros:
  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
