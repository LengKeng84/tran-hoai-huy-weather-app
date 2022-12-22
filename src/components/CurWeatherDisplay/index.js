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
            <Tippy theme="light" content="Humidity">
              <div className="humidity">
                <i class="fa-solid fa-droplet"></i>
                <span>{data?.main.humidity}%</span>
              </div>
            </Tippy>

            {/* Pressure */}
            <Tippy theme="light" content="Pressure">
              <div className="pressure">
                <i class="fas fa-stream"></i>
                <span>{data?.main.pressure} hPa</span>
              </div>
            </Tippy>

            {/* Wind */}
            <Tippy theme="light" content="Wind speed">
              <div className="wind">
                <i class="fa-solid fa-wind"></i>
                <span>{data?.wind.speed} m/s</span>
              </div>
            </Tippy>

            {/* Cloud Cover */}
            <Tippy theme="light" content="Cloud Cover">
              <div className="cloudiness">
                <i class="fa-solid fa-cloud"></i>
                <span>{data?.clouds.all}%</span>
              </div>
            </Tippy>
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
          {/* temperature */}
          <div className="temperature">
            <i class="fa-solid fa-temperature-half"></i>

            <Tippy theme="light" content="Minimum temperature">
              <div className="temperature_item">
                Min :{" "}
                <span
                  className={`temperature_item_content ${
                    data?.main.temp_min <= 273 &&
                    "temperature_item_content_cool"
                  }`}
                >
                  {CelsiusConverter(data?.main.temp_min)} <sup>o</sup>C
                </span>
              </div>
            </Tippy>
            <Tippy theme="light" content="Maximum temperature">
              <div className="temperature_item">
                Max :{" "}
                <span
                  className={`temperature_item_content ${
                    data?.main.temp_min <= 273 &&
                    "temperature_item_content_cool"
                  }`}
                >
                  {CelsiusConverter(data?.main.temp_max)} <sup>o</sup>C
                </span>
              </div>
            </Tippy>
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
            <Tippy theme="light" content="Wind direction">
              {/* wind_direction */}
              <div className="wind_direction">
                <div className="wind_direction_icon">
                  <i class="fa-solid fa-wind"></i>
                  <i class="fa-solid fa-ruler"></i>
                </div>
                <div className="wind_direction_content">
                  {data?.wind.deg} deg
                </div>
              </div>
            </Tippy>
            {data?.wind.gust && (
              <Tippy theme="light" content="Have wind gust">
                <div className="wind_gust">
                  <div className="wind_gust_icon">
                    <i class="fa-solid fa-wind"></i>
                    <i class="fa-solid fa-triangle-exclamation"></i>
                  </div>
                  <div className="wind_gust_content">{data?.wind.gust} m/s</div>
                </div>
              </Tippy>
            )}
          </div>
          {/* Wind - End */}
          {/* visibility - Start */}
          <div className="visibility">
            <Tippy theme="light" content="Visibility">
              <div>
                <i class="fa-sharp fa-solid fa-eye"></i>
                {data?.visibility} km
              </div>
            </Tippy>
          </div>
          {/* visibility - End */}

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
