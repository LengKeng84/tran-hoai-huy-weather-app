import "./Display.scss";
import { useEffect, useState } from "react";

import CurWeatherDisplay from "../CurWeatherDisplay";
import ForecastDisplay from "../ForecastDisplay";

function Display({ locationData }) {
  const [currentWeather, setCurrentWeather] = useState();
  const [day1, setDay1] = useState();
  const [day2, setDay2] = useState();
  const [day3, setDay3] = useState();
  const [day4, setDay4] = useState();
  const [day5, setDay5] = useState();
  const [day6, setDay6] = useState();
  const ACCESS_KEY_WEATHER = "f30cd3e9a480d6137f42045c1a95e541";
  const filterDay = (list, callback) => {
    let newValue = {
      date: list ? list[0]?.dt_txt?.substr(0, 10) : null,
      data: list?.filter(
        (data) => data?.dt_txt.substr(0, 10) === list[0]?.dt_txt.substr(0, 10)
      ),
    };
    callback(newValue);
    return list.filter(
      (data) => data?.dt_txt?.substr(0, 10) !== list[0]?.dt_txt?.substr(0, 10)
    );
  };

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${locationData?.lat}&lon=${locationData?.lon}&appid=${ACCESS_KEY_WEATHER}`
    )
      .then((res) => res.json())
      .then((data) => setCurrentWeather(data));
  }, [locationData]);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${locationData?.lat}&lon=${locationData?.lon}&appid=${ACCESS_KEY_WEATHER}`
    )
      .then((res) => res.json())
      .then((data) => data.list)
      .then((list) => filterDay(list, setDay1))
      .then((list) => filterDay(list, setDay2))
      .then((list) => filterDay(list, setDay3))
      .then((list) => filterDay(list, setDay4))
      .then((list) => filterDay(list, setDay5))
      .then((list) => filterDay(list, setDay6));
  }, [locationData]);

  return (
    <div className="display">
      <div className="location_name">
        <span>
          <i class="fa-solid fa-location-dot"></i>
        </span>
        <span>{locationData?.name}</span>
      </div>

      {/* weather_display */}
      <div className="weather_display">
        <CurWeatherDisplay data={currentWeather} />
      </div>

      {/* forecast_display */}
      <div className="forecast_weather_display">
        <div className="forecast_display_title">
          ForeCast Weather for the next 5 days
        </div>
        <div className="forecast_display_line">
          <span></span>
        </div>
        <div className="forecast_container">
          <ForecastDisplay dataForecast={day1} />
          <ForecastDisplay dataForecast={day2} />
          <ForecastDisplay dataForecast={day3} />
          <ForecastDisplay dataForecast={day4} />
          <ForecastDisplay dataForecast={day5} />
          {day6?.date ? <ForecastDisplay dataForecast={day6} /> : null}
        </div>
      </div>
    </div>
  );
}

export default Display;
