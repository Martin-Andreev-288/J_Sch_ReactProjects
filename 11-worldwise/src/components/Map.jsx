import { useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';
/* za da dostypim lat-a i lng-a ot URL-a izpolzvame useSearchParams, koeto e podobno na useState - vryshta
array, koyto ima aktualnoto systoqnie (state) and then second, we get a function with which we can set the
SearchParams, so we can also update the SearchParams in this way.
I sled tova tr da getnem lat-a i lng-a (t.e. ne mozhem direktno da gi dostypim, this data is actyally not
directly accessible) on the SearchParams, it's not like an object that gives us this data here.
syotvetno tova, koeto pishem v skobite sled get (lat i lng) tr da syotvetstva na tova v URL-a. */
function Map() {
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    // i tezi 3 neshta otgore mozhe da gi izpolzvame i v drugi komponenti, primerno v City (prehvyrli se tam).
    return (
        <div className={styles.mapContainer}>
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
        </div>
    );
}

export default Map;
