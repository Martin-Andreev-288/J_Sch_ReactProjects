import Options from "./Options";

function Question({ question, dispatch, answer }) {
  console.log(question);
  // tuk imame prop drilling s dispatch i answer (ot app na Question i na Options), no ako e za edno nivo, ne e
  // golqm problem
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
