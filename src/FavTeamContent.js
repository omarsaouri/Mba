import React, { useState, useEffect } from "react";

const FavTeamContent = ({ data, favTeamId, isTeamChoosen }) => {
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

  const gameByDate = (data) => {
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.gameFullDate);
      return (
        itemDate.getDate() === currentDate.getDate() &&
        itemDate.getMonth() === currentDate.getMonth() &&
        itemDate.getFullYear() === currentDate.getFullYear()
      );
    });

    return filteredData;
  };

  const fetchGameByDate = async (favTeamData) => {
    const tempGames = await gameByDate(favTeamData);
    setTodayGame(tempGames);
  };

  useEffect(() => {
    fetchFavTeamData(favTeamId);
  }, [isTeamChoosen]);

  useEffect(() => {
    fetchGameByDate(favTeamData);
  }, [favTeamData]);

  useEffect(() => {
    console.log(favTeamData);
  }, [favTeamData]);

  useEffect(() => {
    console.log(todayGame);
  }, [todayGame]);

  return <h1>hi 2</h1>;
};

export default FavTeamContent;
