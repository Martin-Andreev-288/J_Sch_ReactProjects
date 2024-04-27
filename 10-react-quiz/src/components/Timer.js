import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      // cleanup za intervala - so to clear an interval, we basically just have to pass in the ID of the timer
      // that we started with set interval. So every single set interval timer will return a unique ID. And so we
      // can then again use that to clear, so to cancel that timer. And so now this will run between renders and
      // even more importantly after this component is unmounted and so then the timer will really actually stop.
      // !!!!!bez cleanup-a se dobavq nov item sled vseki nov quiz i nqkolko timer-a tekat po edno i syshto vreme.
      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
