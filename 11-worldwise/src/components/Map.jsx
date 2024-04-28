import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import styles from "./Map.module.css";
import { useState } from "react";
import { useCities } from "../contexts/CitiesContext";
/* NavLink e deklarativen metod za prenasochvane, a useNavigate - imperativen!! */
function Map() {
  const navigate = useNavigate();
  /* This is the power of having global state. Whenever you need a piece of state, you just grab it, and there
  is it. You don't have to pass any props. */
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([40, 0]);
  // tezi chisla v useState-a za lat i lng

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  // i tezi 3 neshta otgore mozhe da gi izpolzvame i v drugi komponenti, primerno v City (prehvyrli se tam).
  return (
    <div className={styles.mapContainer}>
      {/* i taka kydeto i da cyknem na map stranicata, shte ni zavede vyv form (t.e. shte ni otvori forma) */}
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
