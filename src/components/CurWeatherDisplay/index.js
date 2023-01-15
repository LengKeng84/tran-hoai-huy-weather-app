import { timeConverter } from "../../functions/timeConverter";
import { CelsiusConverter } from "../../functions/CelsiusConverter";
import "./CurWeatherDisplay.scss";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { useState } from "react";

function CurWeatherDisplay({ data }) {
  const [hideMore, setHideMore] = useState(true);

  return (
    <div className="current_weather">
      <div className="header">
        <div className="title">
          Current Weather - {timeConverter(data?.dt, "hour_min")}
        </div>
        <div className="current_hour"></div>
      </div>

      {/* Container - Start*/}
      <div className="main_container">
        {/* container1 - Start */}
        <div className={`container1`}>
          {/* temperature - Start */}
          <div className="temperature">
            <div
              className={`temperature_main ${
                data?.main?.temp <= 273 && "temperature_main_cool"
              }`}
            >
              <span>{CelsiusConverter(data?.main?.temp)}</span>
              <span>
                <sup>o</sup>C
              </span>
            </div>

            <div className="temperature_feelLike">
              <span>Real Feel</span> : {CelsiusConverter(data?.main.feels_like)}
              <span>
                <sup>o</sup>C
              </span>
            </div>
          </div>
          {/* temperature - End */}

          {/* weather des - Start */}
          <div className="weather_des">
            <div className="weather_des_icon">
              <img
                src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
                alt=""
              />
            </div>
            <div className="description">{data?.weather[0].description}</div>
          </div>
          {/* weather des - End */}

          {/* Other - Start */}
          <div className="other">
            {/* Humidity */}
            <div className="humidity other_container">
              <i class="fa-solid fa-droplet"></i>
              <span className="title">Humidity: </span>
              <span className="value">{data?.main.humidity}%</span>
            </div>

            {/* Pressure */}
            <div className="pressure other_container">
              <i class="fas fa-stream"></i>
              <span className="title">Pressure: </span>
              <span className="value">{data?.main.pressure} hPa</span>
            </div>

            {/* Wind */}
            <div className="wind other_container">
              <i class="fa-solid fa-wind"></i>
              <span className="title">Wind speed: </span>
              <span className="value">{data?.wind.speed} m/s</span>
            </div>

            {/* Cloud Cover */}
            <div className="cloudiness other_container">
              <i class="fa-solid fa-cloud"></i>
              <span className="title">Cloud Cover: </span>
              <span className="value">{data?.clouds.all}%</span>
            </div>
          </div>
          {/* Other - End */}
        </div>
        {/* container1 - End */}

        <div className="line"></div>

        {/* more_btn - Start */}
        <div className="more_btn">
          {hideMore && (
            <button onClick={() => setHideMore(false)}>
              More details <i class="fa-solid fa-angles-down"></i>
            </button>
          )}

          {!hideMore && (
            <button onClick={() => setHideMore(true)}>
              Hide More details <i class="fa-solid fa-angles-up"></i>
            </button>
          )}
        </div>
        {/* more_btn - End */}

        {/* display2_container2 - Start */}

        <div className={`container2 ${!hideMore && "container2_active"}`}>
          {/* Header */}
          <div className="container2_header">More details</div>
          <div className="container2_container">
            {/* temperature */}
            <div className="temperature">
              <i class="fa-solid fa-temperature-half"></i>

              <div className="temperature_item">
                Min temperature:{" "}
                <span
                  className={`temperature_item_content ${
                    data?.main.temp_min <= 273 &&
                    "temperature_item_content_cool"
                  }`}
                >
                  {CelsiusConverter(data?.main.temp_min)} <sup>o</sup>C
                </span>
              </div>

              <div className="temperature_item">
                Max temperature:{" "}
                <span
                  className={`temperature_item_content ${
                    data?.main.temp_min <= 273 &&
                    "temperature_item_content_cool"
                  }`}
                >
                  {CelsiusConverter(data?.main.temp_max)} <sup>o</sup>C
                </span>
              </div>
            </div>
            {/* pressure - Start*/}
            {(data?.main.grnd_level || data?.main.sea_level) && (
              <div className="pressure">
                {data?.main.grnd_level && (
                  <Tippy
                    theme="light"
                    content="Atmospheric pressure on the ground level"
                  >
                    <div className="pressure_ground">
                      <i class="fas fa-stream"></i>{" "}
                      <span>{data?.main.grnd_level} hPa</span>
                    </div>
                  </Tippy>
                )}
                {data?.main.sea_level && (
                  <Tippy
                    theme="light"
                    content="Atmospheric pressure on the sea level"
                  >
                    <div className="pressure_sea">
                      <i class="fas fa-water"></i>{" "}
                      <span>{data?.main.sea_level} hPa</span>
                    </div>
                  </Tippy>
                )}
              </div>
            )}
            {/* pressure - End*/}
            {/* Wind - Start */}
            <div className="wind">
              {/* wind_direction */}
              <div className="wind_direction">
                <div className="wind_direction_icon">
                  <i class="fa-solid fa-wind"></i>
                  <i class="fa-solid fa-ruler"></i>
                </div>
                <div className="wind_direction_content">
                  Wind direction: <span>{data?.wind.deg} deg</span>
                </div>
              </div>

              {data?.wind.gust && (
                <div className="wind_gust">
                  <div className="wind_gust_icon">
                    <i class="fa-solid fa-wind"></i>
                    <i class="fa-solid fa-triangle-exclamation"></i>
                  </div>
                  <div className="wind_gust_content">
                    Have wind gust: <span>{data?.wind.gust} m/s</span>
                  </div>
                </div>
              )}
            </div>
            {/* Wind - End */}
            {/* visibility - Start */}
            <div className="visibility">
              <i class="fa-sharp fa-solid fa-eye"></i>
              <div>
                Visibility: <span>{data?.visibility} km</span>
              </div>
            </div>
            {/* visibility - End */}
          </div>

          {/* Time of data calculation - Start */}
          <div className="time_data_calculation">
            <div>Time of data calculation </div>
            <div>{timeConverter(data?.dt, "full")}</div>
          </div>
          {/* Time of data calculation - End */}
        </div>

        {/* main_display2_container2 - End */}
      </div>
      {/* Container - End*/}
    </div>
  );
}

export default CurWeatherDisplay;
