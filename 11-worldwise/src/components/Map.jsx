import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
/* NavLink e deklarativen metod za prenasochvane, a useNavigate - imperativen!! */
function Map() {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    // i tezi 3 neshta otgore mozhe da gi izpolzvame i v drugi komponenti, primerno v City (prehvyrli se tam).
    return (
        <div className={styles.mapContainer} onClick={() => navigate("form")}>
            {/* i taka kydeto i da cyknem na map stranicata, shte ni zavede vyv form (t.e. shte ni otvori forma) */}
            <h1>Map</h1>
            <h1>Position: {lat}, {lng} </h1>
            {/* i taka v map prozoreca izpisva:
        Map
        Position: 50.53586782505711, 14.376933665713324
        A MOZHEM i da promenim tezi st-ti sys setSearchParams tuk po-dolu eto taka:
 */}
            <button onClick={() => {
                setSearchParams({ lat: 23, lng: 50 });
            }}
            >
                Change Pos
            </button>
            {/* i taka sega ako cyknem na Change Pos butona - shte go promeni lat-a i lng-a navsqkyde v
            prilozhenieto, ne samo na edno mqsto */}
        </div >
    );
}

export default Map;
