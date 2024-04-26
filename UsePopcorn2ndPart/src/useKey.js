import { useEffect } from "react";

// tozi ne tr da vryshta nishto, za razlika ot predishnite neshta. All we need is to know what should happen
// and we also need the user of this custom hook to tell us on which key the effect here should actually be
// executed. So, not the effect but the callback that they will pass in.

export function useKey(key, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
          console.log("CLOSING");
        }
      }

      document.addEventListener("keydown", callback);

      // callback funkciq
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
// !!! And so, never lie to react about your dependencies, and always make sure to include every single
// variable that is used here into your effect (v sluchaq - action i key)
