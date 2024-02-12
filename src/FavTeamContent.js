import React, { useState, useEffect } from "react";
import DateSelector from "./DateSelector";
import GameCard from "./GameCard";

const FavTeamContent = ({ data, favTeamId, isTeamChoosen, favTeamColors }) => {
  const [favTeamData, setFavTeamData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todayGame, setTodayGame] = useState();

  const getDataOfTeam = async (id) => {
    if (!data || !data.lscd) {
      return [];
    }

    const teamData = data.lscd
      .flatMap((mscd) => mscd.mscd?.g || [])
      .filter((game) => id === game.h.tid || id === game.v.tid)
      .map((game) => ({
        gameFullDate: new Date(game.etm),
        homeTeamName: game.h.tn,
        homeTeamAbr: game.h.ta,
        homeRecord: game.h.re,
        visitorTeamName: game.v.tn,
        visitorRecord: game.v.re,
        visitorTeamAbr: game.v.ta,
      }))
      .sort((a, b) => a.gameFullDate - b.gameFullDate);

    return teamData;
  };

  const fetchFavTeamData = async (favTeamId) => {
    const tempData = await getDataOfTeam(favTeamId);
    setFavTeamData(tempData);
  };

  const gameByDate = (data, dateExp) => {
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.gameFullDate);
      const selectedDate = new Date(dateExp);
      return (
        itemDate.getFullYear() === selectedDate.getFullYear() &&
        itemDate.getMonth() === selectedDate.getMonth() &&
        itemDate.getDate() === selectedDate.getDate()
      );
    });

    return filteredData;
  };

  const fetchGameByDate = async (favTeamData, dateExp) => {
    const tempGames = await gameByDate(favTeamData, dateExp);
    setTodayGame(tempGames);
  };

  useEffect(() => {
    favTeamColors.forEach((color, index) => {
      document.documentElement.style.setProperty(`--color-${index + 1}`, color);
    });
  }, [favTeamColors]);

  useEffect(() => {
    fetchFavTeamData(favTeamId);
  }, [isTeamChoosen]);

  useEffect(() => {
    fetchGameByDate(favTeamData, currentDate);
  }, [favTeamData]);

  return (
    <>
      <DateSelector
        currentDate={currentDate}
        fetchGameByDate={fetchGameByDate}
        favTeamData={favTeamData}
        gameByDate={gameByDate}
      ></DateSelector>
      {todayGame && <GameCard todayGame={todayGame}></GameCard>}
    </>
  );
};

export default FavTeamContent;
