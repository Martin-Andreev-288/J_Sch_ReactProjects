import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );
  /* ako ne e taka s ternary, se poluchava greshka. Sled 6-tata minuta Jonas obqsnqva za neq.
  useEffect-a se izpylnqva sled kato komponenta e veche render-nat. Tova e klyucha da go razberem.
  */
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
