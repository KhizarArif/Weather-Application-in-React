import React, { useState, useEffect } from "react";
import {appId} from './config/config';
import axios from 'axios';

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${appId}`;


  const searchLocation = (e) => {
    if(e.key == "Enter"){
      axios.get(url).then((res) => {
        setData(res.data)
      })
      setLocation("");  
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input 
         type="text" 
         className="search-bar"
         placeholder="Enter Location"
         value={location}
         onChange={(e) =>setLocation(e.target.value)}
         onKeyPress={searchLocation}
        />
      </div>
      <div className="container">
        {
          data.name != undefined && (
            <>
            <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            <h1>{data.main.temp.toFixed()}°F</h1>
          </div>
          <div className="description">
            <p>{data.weather ? data.weather[0].main : null}</p>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className="bold">{data.main? data.main.feels_like.toFixed() : null}°F</p>
            <p>Feels like </p>
          </div>
          <div className="humidity">
            <p className="bold"> {data.main? data.main.humidity.toFixed() : null}% </p>
            <p> Humidity </p>
          </div>
          <div className="wind"> 
            <p className="bold"> {data.wind? data.wind.speed.toFixed() : null} MPH </p>
            <p> Winds </p> 
          </div>
        </div>
        </>
          )
        }
      </div>
    </div>
  );
}

export default App;
