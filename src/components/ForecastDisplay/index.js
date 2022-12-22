import { useState } from "react";
import { CelsiusConverter } from "../../functions/CelsiusConverter";
import { timeConverter } from "../../functions/timeConverter";
import "./ForecastDisplay.scss";

function ForecastDisplay({ dataForecast }) {
  const [moreDisplay, setMoreDisplay] = useState(false);
  const [activeChoose, setActiveChoose] = useState("temp");
  const dayTime = dataForecast
    ? dataForecast?.data.filter((data) => data.sys.pod === "d")
    : [];
  const nightTime = dataForecast
    ? dataForecast?.data.filter((data) => data.sys.pod === "n")
    : [];
  const averageHandler = (array) => {
    let result = 0;
    for (let i = 0; i < array?.length; i++) {
      result += array[i];
    }
    return Math.round(result / array?.length);
  };
  const tempDay = averageHandler(dayTime?.map((data) => data.main.temp)) - 273;
  const tempNight =
    averageHandler(nightTime?.map((data) => data.main.temp)) - 273;
  const tempReelDay =
    averageHandler(dayTime?.map((data) => data.main.feels_like)) - 273;
  const tempReelNight =
    averageHandler(nightTime?.map((data) => data.main.feels_like)) - 273;

  console.log(dataForecast?.data);

  return (
    <div className="forecast_display">
      {!moreDisplay ? (
        /* display1 - Start ------------------------------------------------------------------------------------- */
        <div onClick={() => setMoreDisplay(true)} className="display1">
          {/* day */}
          <div className="day">
            <span>{timeConverter(dataForecast?.data[0]?.dt, "day")} /</span>
            <span>{dataForecast?.date?.substr(5, 5)}</span>
          </div>

          {/* Temperature - Start */}
          <div className="temperature">
            {/* temperature_day */}
            <div className="temperature_items">
              {dayTime[0]?.weather[0].icon ? (
                <div className="img">
                  <img
                    src={`http://openweathermap.org/img/wn/${dayTime[0]?.weather[0].icon}@2x.png`}
                  />
                </div>
              ) : (
                <div className="img"></div>
              )}

              {tempDay ? (
                <div className={`value ${tempDay < 0 && "value_cool"}`}>
                  {tempDay}
                  <sup>o</sup>C
                </div>
              ) : (
                <div className="value">NaN</div>
              )}
            </div>

            <span className="line">/</span>

            {/* temperature_night */}
            <div className="temperature_items">
              {/* <span className="icon icon_moon">
                  <i class="fa-solid fa-moon"></i>
                </span> */}
              <div className="img">
                <img
                  src={`http://openweathermap.org/img/wn/${nightTime[0]?.weather[0].icon}@2x.png`}
                />
              </div>
              <div className={`value ${tempNight < 0 && "value_cool"}`}>
                {tempNight}
                <sup>o</sup>C
              </div>
            </div>
          </div>
          {/* Temperature - End */}

          {/* Main_weather - Start */}
          <div className="main_weather">
            {dayTime[0]?.weather[0].main ? dayTime[0]?.weather[0].main : NaN} /{" "}
            {nightTime[0]?.weather[0].main
              ? nightTime[0]?.weather[0].main
              : NaN}
          </div>
          {/* Main_weather - End */}

          {/* Humidity - Start */}
          <div className="humidity">
            <i class="fa-solid fa-droplet"></i>
            <span>
              {averageHandler(
                dataForecast?.data.map((data) => data.main.humidity)
              )}
              %
            </span>
          </div>
          {/* Humidity - End */}

          {/* Wind - Start */}
          <div className="wind">
            <i class="fa-solid fa-wind"></i>
            <span>
              {averageHandler(
                dataForecast?.data.map((data) => data.wind.speed)
              )}{" "}
              m/s
            </span>
          </div>
          {/* Wind - End */}

          {/* Dropdown Btn */}
          <button className="dropdown_btn">
            <i class="fa-solid fa-chevron-down"></i>
          </button>
        </div>
      ) : (
        /* display1 - End ------------------------------------------------------------------------------------- */
        /* display2 - Start ------------------------------------------------------------------------------------- */
        <div className="display2">
          {/* Day */}
          <div onClick={() => setMoreDisplay(false)} className="day">
            <span>{timeConverter(dataForecast?.data[0]?.dt, "day")} /</span>{" "}
            <span>{dataForecast?.date?.substr(5, 5)}</span>
            <button className="dropdown_btn">
              <i class="fa-solid fa-chevron-up"></i>
            </button>
          </div>
          {/* DayTime - Start */}
          <div className="container">
            <div className="time">
              <i class="fa-solid fa-sun"></i>
              <span>Day</span>
            </div>

            {/* temperature - Start */}

            <div className="temperature">
              {/* Main */}
              {tempDay ? (
                <div className={`main ${tempDay < 0 && "value_cool"}`}>
                  <span>{tempDay}</span>
                  <span>
                    <sup>o</sup>C
                  </span>
                </div>
              ) : (
                <div className="main">NaN</div>
              )}

              {/* Real Like */}
              {tempReelDay ? (
                <div className={`reel ${tempReelDay < 0 && "value_cool"}`}>
                  Reel Like: {tempReelDay}
                  <sup>o</sup>C
                </div>
              ) : (
                <div className="reel">Reel Like: NaN</div>
              )}
            </div>

            {/* temperature - End */}

            {/* description - Start */}
            <div className="description_weather">
              {dayTime[0]?.weather[0].icon ? (
                <div className="img">
                  <img
                    src={`http://openweathermap.org/img/wn/${dayTime[0]?.weather[0].icon}@2x.png`}
                    alt=""
                  />
                </div>
              ) : null}
              <div className="content">
                {dayTime[0]?.weather[0].description}
              </div>
            </div>
            {/* description - End */}

            {/* other - Start */}
            <div className="other">
              {/* Humidity */}
              <div className="items">
                <div className="icon">
                  <i class="fa-solid fa-droplet"></i>
                </div>
                <div className="title">Humidity</div>
                <div className="value">
                  {averageHandler(dayTime?.map((data) => data.main.humidity))}%
                </div>
              </div>

              {/* Wind */}
              <div className="items">
                <div className="icon">
                  <i class="fa-solid fa-wind"></i>
                </div>
                <div className="title">Wind</div>
                <div className="value">
                  {averageHandler(dayTime?.map((data) => data.wind.speed))} m/s
                </div>
              </div>

              {/* Cloud Cover */}
              <div className="items">
                <div className="icon">
                  <i class="fa-solid fa-cloud"></i>
                </div>
                <div className="title">Cloud Cover</div>
                <div className="value">
                  {averageHandler(dayTime?.map((data) => data.clouds.all))} %
                </div>
              </div>

              {/* Pressure */}
              <div className="items">
                <div className="icon">
                  <i class="fa-solid fa-stream"></i>
                </div>
                <div className="title">Pressure</div>
                <div className="value">
                  {averageHandler(dayTime?.map((data) => data.main.pressure))}{" "}
                  hPa
                </div>
              </div>
            </div>
          </div>
          {/* DayTime - End */}

          <div className="line"></div>

          {/* NightTime - Start */}
          <div className="container">
            <div className="time">
              <i class="fa-solid fa-moon"></i>
              <span>Night</span>
            </div>

            {/* temperature - Start */}

            <div className="temperature">
              {/* Main */}
              <div className={`main ${tempNight < 0 && "value_cool"}`}>
                <span>{tempDay}</span>
                <span>
                  <sup>o</sup>C
                </span>
              </div>

              {/* Real Like */}
              <div className={`reel ${tempReelNight < 0 && "value_cool"}`}>
                Reel Like: {tempReelNight}
                <sup>o</sup>C
              </div>
              <div className="temperature_realLike"></div>
            </div>

            {/* temperature - End */}

            {/* description - Start */}
            <div className="description_weather">
              <div className="img">
                <img
                  src={`http://openweathermap.org/img/wn/${nightTime[0]?.weather[0].icon}@2x.png`}
                  alt=""
                />
              </div>
              <div className="content">
                {nightTime[0]?.weather[0].description}
              </div>
            </div>
            {/* description - End */}

            {/* other - Start */}
            <div className="other">
              {/* Humidity */}
              <div className="items">
                <div className="icon">
                  <i class="fa-solid fa-droplet"></i>
                </div>
                <div className="title">Humidity</div>
                <div className="value">
                  {averageHandler(nightTime?.map((data) => data.main.humidity))}
                  %
                </div>
              </div>

              {/* Wind */}
              <div className="items">
                <div className="icon">
                  <i class="fa-solid fa-wind"></i>
                </div>
                <div className="title">Wind</div>
                <div className="value">
                  {averageHandler(nightTime?.map((data) => data.wind.speed))}{" "}
                  m/s
                </div>
              </div>

              {/* Cloud Cover */}
              <div className="items">
                <div className="icon">
                  <i class="fa-solid fa-cloud"></i>
                </div>
                <div className="title">Cloud Cover</div>
                <div className="value">
                  {averageHandler(nightTime?.map((data) => data.clouds.all))} %
                </div>
              </div>

              {/* Pressure */}
              <div className="items">
                <div className="icon">
                  <i class="fa-solid fa-stream"></i>
                </div>
                <div className="title">Pressure</div>
                <div className="value">
                  {averageHandler(nightTime?.map((data) => data.main.pressure))}{" "}
                  hPa
                </div>
              </div>
            </div>
          </div>
          {/* NightTime - End */}

          <div className="line2"></div>
          {/* Daily Hour - Start */}
          <div className="forecast_hourly">
            <div className="forecast_hourly_title">Forecast hourly</div>
            <div className="forecast_hourly_choose">
              <div
                onClick={() => setActiveChoose("temp")}
                className={`forecast_hourly_choose_items ${
                  activeChoose === `temp` &&
                  "forecast_hourly_choose_items_active"
                }`}
              >
                Temperature
              </div>
              <div
                onClick={() => setActiveChoose("humi")}
                className={`forecast_hourly_choose_items ${
                  activeChoose === `humi` &&
                  "forecast_hourly_choose_items_active"
                }`}
              >
                Humidity
              </div>
              <div
                onClick={() => setActiveChoose("wind")}
                className={`forecast_hourly_choose_items ${
                  activeChoose === `wind` &&
                  "forecast_hourly_choose_items_active"
                }`}
              >
                Wind
              </div>
            </div>
            <div className="forecast_hourly_container">
              {dataForecast?.data.map((data, index) => (
                <div key={index} className="forecast_hourly_items">
                  <div className="forecast_hourly_items_title">
                    {data?.dt_txt.slice(11, 16)}
                  </div>

                  {/* Temp choose */}
                  {activeChoose === "temp" && (
                    <div
                      className={`forecast_hourly_items_content_temp ${
                        CelsiusConverter(data?.main.temp) < 0 && "value_cold"
                      }`}
                    >
                      {CelsiusConverter(data?.main.temp)} <sup>o</sup>C
                    </div>
                  )}

                  {/* Humi choose */}
                  {activeChoose === "humi" && (
                    <div className={`forecast_hourly_items_content_humi`}>
                      {data?.main.humidity}%
                    </div>
                  )}

                  {/* Wind choose */}
                  {activeChoose === "wind" && (
                    <div className={`forecast_hourly_items_content_wind`}>
                      {data?.wind.speed} m/s
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Daily Hour - End */}
        </div>
        /* display2 - End ------------------------------------------------------------------------------------- */
      )}
    </div>
  );
}

export default ForecastDisplay;
