import { useEffect, useState } from "react";
import axios, { all } from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const SearchBar = (props) => {
  return (
    <div>
      <p>Find countries</p>
      <input type="text" onInput={props.handler()}></input>
    </div>
  );
};

const ListCountry = (props) => {
  const [weather, setWeather] = useState(null);
  if (props.countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (props.countries.length > 1) {
    return (
      <div>
        {props.countries.map((c) => {
          return (
            <div key={c.name.common}>
              <p style={{ display: "inline-block" }}>{c.name.common}</p>
              <button
                style={{ marginLeft: "0.5rem" }}
                onClick={() => {
                  props.handler(c.name.common);
                }}
              >
                show
              </button>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <>
        {props.countries.map((c) => {
          {
            axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${c.latlng[0]}&lon=${c.latlng[1]}&appid=${API_KEY}`,
            ).then((resp) => {
              setWeather(resp.data);
              return (
                <div key={c.name.common}>
                  <h2>{c.name.common}</h2>

                  <p>Capital: {c.capital}</p>
                  <p>Area: {c.area}</p>

                  <p>languages:</p>
                  <ol>
                    {Object.values(c.languages).map((l, i) => {
                      return <li key={i}>{l}</li>;
                    })}
                  </ol>

                  <img src={c.flags.png}></img>

                  <p>Weather in {c.name.common}</p>
                  <div>
                    <p>temperature: {weather.main.temp}</p>

                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather.icon}2x.png`}
                    >
                    </img>
                    <p>wind: {weather.wind.speed} m/s</p>
                  </div>
                </div>
              );
            });
          }
        })}
      </>
    );
  }
};

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [currentCountries, setCurrentCountries] = useState([]);

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then(
      (response) => {
        setAllCountries(response.data);
      },
    );
  }, []);

  const handleSearch = (event) => {
    setCurrentCountries(
      allCountries.filter((c) =>
        c.name.common.toLowerCase().includes(event.target.value.toLowerCase())
      ),
    );
    console.log(currentCountries);
  };

  const handleSearchFilter = (filter) => {
    setCurrentCountries(
      allCountries.filter((c) =>
        c.name.common.toLowerCase().includes(filter.toLowerCase())
      ),
    );
    console.log(currentCountries);
  };

  return (
    <div>
      <SearchBar handler={() => handleSearch}></SearchBar>
      <ListCountry countries={currentCountries} handler={handleSearchFilter}>
      </ListCountry>
    </div>
  );
};

export default App;
