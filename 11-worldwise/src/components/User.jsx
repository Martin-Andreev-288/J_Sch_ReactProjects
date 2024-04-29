import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./User.module.css";

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  /* zashtoto inache shte stane greshka, kato se razlognem. User-a shte izchezne, no shte ostane na stranicata.
    Sluchva se taka, che se opitvame da prochetem dannite ot return-a dolu, koito veche ne syshtestvuvat, zatova
     i se poluchava greshkata. Po tazi prichina tr da napishem tova const navigate = useNavigate(); i dolu
     vyv handleClick funkciqta da navigirame */

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
