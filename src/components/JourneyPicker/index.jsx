import React, { useEffect, useState } from 'react';
import './style.css';

//mapování měst
const CityOptions = ({ cities }) => {
  const cityArray = cities.map((city) => (
    <option value={city.name} key={city.code}>
      {city.name}
    </option>
  ));

  return <>{cityArray}</>;
};

//mapování data
const DateOptions = ({ dates }) => {
  const dateArray = dates.map((date) => (
    <option value={date.dateBasic} key={date.dateBasic}>
      {date.dateCs}
    </option>
  ));
  return <>{dateArray}</>;
};

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('m');
  const [date, setDate] = useState('');
  const [cities, setCities] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    fetch('https://apps.kodim.cz/daweb/leviexpress/api/cities')
      .then((response) => response.json())
      .then((data) => setCities(data.results));
    fetch('https://apps.kodim.cz/daweb/leviexpress/api/dates')
      .then((response) => response.json())
      .then((data) => setDates(data.results));
  }, []);

  //Funkce na odeslání formuláře
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fromCity);
    console.log(toCity);
    console.log(date);
  };
  return (
    <div className="journey-picker container">
      <h2 className="journey-picker__head">Kam chcete jet?</h2>
      <div className="journey-picker__body">
        <form className="journey-picker__form" onSubmit={handleSubmit}>
          <label>
            <div className="journey-picker__label">Odkud:</div>
            <select
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
            >
              <option value="">Vyberte</option>
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Kam:</div>
            <select value={toCity} onChange={(e) => setToCity(e.target.value)}>
              <option value="">Vyberte</option>
              <CityOptions cities={cities} />
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Datum:</div>
            <select value={date} onChange={(e) => setDate(e.target.value)}>
              <option value="">Vyberte</option>
              <DateOptions dates={dates} />
            </select>
          </label>
          <div className="journey-picker__controls">
            <button className="btn" type="submit">
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src="/map.svg" />
      </div>
    </div>
  );
};
