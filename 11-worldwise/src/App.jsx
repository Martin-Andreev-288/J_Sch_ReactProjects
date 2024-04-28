import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import Login from "./pages/Login";
import AppLayout from './pages/AppLayout';
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

const BASE_URL = "http://localhost:9000";
// !!!!!!!!!!!!! Tr da pasvame elementite taka <Homepage />, a ne samo Homepage, za da mozhe da podavame props
// index e za neshto, koeto iskame da se pokazva by default
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsloading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading data...");
      } finally {
        setIsloading(false);
      }
    }
    fetchCities();
  }, []);

  /* <Navigate /> veche ne se izpolzva tolkova, no ima 1 mnogo vazhen use case za nego.
  Sega ako v prilozhenieto natisnem start tracking now butona, shte vidim gradovete, no URL-a shte e
  http://localhost:5173/app, t.e. gradovete nqma da sa v nego (nqma da e http://localhost:5173/app/cities).
  Za da stane taka po tozi nachin, tr da cyknem na cities i edva togava se dobavqt.
  Za da popravim tova, izpolzvame <Navigate /> eto taka:
  Problemyt e, che ako e samo s Navigate, nqma da mozhem da se vyrnem s back butona na browser-a, zatova tr da
  napishem replace and this will then replace the current element in the history stack.
  Inache tova e deklarativen nachin, a s Navigate funkciqta e imperativen nachin. */
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="cities" />} />
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path='cities/:id' element={<City />} />
          <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
