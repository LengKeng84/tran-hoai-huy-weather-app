import { useState } from "react";
import Search from "./components/Searcher";
import "./App.scss";
import Display from "./components/Display";
function App() {
  const [apiData, setApiData] = useState({
    name: "Ho Chi Minh City",
    lon: 106.7017555,
    lat: 10.7758439,
  });
  const getData = (data) => {
    setApiData(data);
  };
  // console.log("app", apiData);

  return (
    <div className="App">
      <div className="back_ground">
        <img
          src="https://img.freepik.com/free-vector/arizona-night-desert-landscape-natural-wild-west-background-with-coyote-pack-silhouettes-run-through-cacti-rocks-cloudy-sky-with-full-moon-shining-game-scene-cartoon-vector-illustration_107791-8446.jpg?w=1800&t=st=1666724133~exp=1666724733~hmac=2da890a9c8ae445300c917ba17cda03bc252b8f1c35d9749b9ef46f88e182581"
          alt=""
        />
      </div>
      <Search callback={getData} />
      <Display locationData={apiData} />
    </div>
  );
}

export default App;
