import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
/* NavLink e deklarativen metod za prenasochvane, a useNavigate - imperativen!! */
function Map() {
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([40, 0]);
  // tezi chisla v useState-a za lat i lng

  /* izklyuchitelno zdravo obyrkvane stana tuk. Vyv versiqta na Jonas nqmashe nishto v skobite na
  useSearchParams i taka davashe greshka Cannot read properties of null (reading 'lat'). Vidqh tova ot
  sekciqta s vyprosi i otgovori i sled kato go slozhih - se poluchi.  */
  const [searchParams] = useSearchParams({ lat: 40, lng: 0 });
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  /* Za da ne ni vryshta na predishniq grad, kato natisnem back buton, a da sme si v syshtiq:
  SAMO CHE PRI MEN ne se poluchava. Vizh po-kysno. Vizh ChangeCenter po-dolu.*/
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  return (
    <div className={styles.mapContainer}>
      {/* i taka kydeto i da cyknem na map stranicata, shte ni zavede vyv form (t.e. shte ni otvori forma) */}
      <MapContainer
        center={mapPosition}
        zoom={6}
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

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

/* Za da ni zavede do pravilniq grad na kartata, kato go izberem, zashtoto inache si stoim na edno mqsto,
syzdavame komponent, koyto po-dobre da e tuk, ne v otdelen fayl, i go slagame sled tova i gore:
Izpolzvame hook ot react-leaflet */
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

// tova e za da ni otvori forma vlqvo, kato cyknem nqkyde na kartata vdqsno. Izpolzvame hook ot react-leaflet
function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      // console.log(e); // tova idva ot leaflet library. Edno ot propyrtitata (vizhda se, kato cyknem nqkyde na
      // // kartata), e: LatLng {lat: 38.103673700636776, lng: -1.77978515625}. Taka sega go dobavqme dolu:
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      // i sega kato cyknem, lat-a i lng-a se dobavqt v URL-a
    },
  });
}

export default Map;
