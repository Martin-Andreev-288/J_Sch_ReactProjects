function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
  // progress max e za lentata, koqto otchita dokyde si stignal. Ocvetqva se s malko sled vseki otgovoren
  // vypros       Obqsnenie za Number(answer !== null) - ako nqma otg - shte stane 0, ako ima - shte stane 1
  // i shte se dobavi kym index-a
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />

      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
