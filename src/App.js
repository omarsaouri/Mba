import { useEffect, useState } from "react";
import * as NBAIcons from "react-nba-logos";
import Header from "./Header";
import "./css/main.css";
import Main from "./Main";

function App() {
  const [data, setData] = useState([]);
  const [isTeamChoosen, setIsTeamChoosen] = useState(false);
  const [favTeamAbr, setFavTeamAbr] = useState();

  // gets the full schedule
  const fetchData = async () => {
    const response = await fetch(
      "https://data.nba.com/data/10s/v2015/json/mobile_teams/nba/2023/league/00_full_schedule.json"
    );
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header isTeamChoosen={isTeamChoosen} favTeamAbr={favTeamAbr}></Header>
      <Main
        data={data}
        isTeamChoosen={isTeamChoosen}
        setIsTeamChoosen={setIsTeamChoosen}
        setFavTeamAbr={setFavTeamAbr}
      ></Main>
    </>
  );
}

export default App;
