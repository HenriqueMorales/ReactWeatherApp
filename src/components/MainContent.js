import { useState } from "react";
import _ from "lodash";
import api from "../services/api";

export default function MainContent(props) {
  const apiKey = process.env.REACT_APP_API_KEY;
  const today = new Date().toLocaleDateString();

  const [city, setCity] = useState("");
  const [weatherContent, setWeatherContent] = useState({});
  const [showContent, setShowContent] = useState(false);

  function handleCityChange(e) {
    let newValue = e.target.value;
    setCity((prevValue) => newValue);
  }

  const getContent = async function (e) {
    try {
      e.preventDefault();
      const { data } = await api.get(
        `weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
      );
      setWeatherContent((prevValue) => data);
      setShowContent((prevValue) => true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="main-container">
      <section className="query">
        <form className="query-form" onSubmit={getContent}>
          <input
            name="city"
            type="text"
            maxLength="50"
            placeholder="Busque por uma cidade..."
            value={city}
            onChange={handleCityChange}
            autoComplete="off"
            required
          />
          <button type="submit">Pesquisar</button>
        </form>
      </section>

      {showContent && (
        <section className="info">
          <div className="city">{`${_.capitalize(
            weatherContent.name
          )}, ${_.upperCase(weatherContent.sys.country)}`}</div>
          <div className="temperature">
            {Math.round(weatherContent.main.temp)}°C
          </div>
          <div className="weather-condition">
            {_.capitalize(weatherContent.weather[0].description)}
          </div>
          <div className="today">{today}</div>
        </section>
      )}
    </main>
  );
}
