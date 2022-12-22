import { useEffect, useState } from "react";

import "./Searcher.scss";

function Search({ callback }) {
  const [inputSearch, setInput] = useState("");
  const [apiCityData, setApiCityData] = useState();
  const [bgNavbar, setBgNavbar] = useState(false);

  const ACCESS_KEY_WEATHER = "f30cd3e9a480d6137f42045c1a95e541";

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${inputSearch}&limit=5&appid=${ACCESS_KEY_WEATHER}`
    )
      .then((res) => res.json())
      .then((data) => setApiCityData(data));
  }, [inputSearch]);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      setBgNavbar(true);
    } else {
      setBgNavbar(false);
    }
  });

  return (
    <div className={`navbar ${bgNavbar && "active"}`}>
      <div className={`searcher`}>
        <input
          placeholder="Enter city name (Ex: Hanoi, Ho Chi Minh City,...)"
          value={inputSearch}
          onChange={(e) => setInput(e.target.value)}
        />
        <span className="search_icon">
          <i class="fa-solid fa-magnifying-glass-location"></i>
        </span>
        <span onClick={() => setInput("")} className="clear_icon">
          <i class="fa-solid fa-xmark"></i>
        </span>

        {/* container_reuslt */}
        {apiCityData?.length > 0 && (
          <div className={`container_reuslt`}>
            {apiCityData?.map((data) => (
              <div
                onClick={() => {
                  callback({
                    name: data?.name,
                    lon: data?.lon,
                    lat: data?.lat,
                  });
                  setInput("");
                }}
                className="item_result"
              >
                {data?.name}, {data?.country}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
