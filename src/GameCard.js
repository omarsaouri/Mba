import React, { useState, useEffect } from "react";
import * as NBAIcons from "react-nba-logos";

const GameCard = ({ todayGame }) => {
  const [game, setGame] = useState();

  useEffect(() => {
    setGame(todayGame);
  }, [todayGame]);

  if (!game || !game[0]) {
    return null;
  }
  const gameDate = game[0].gameFullDate;
  const gameDay = gameDate.toLocaleString("en-US", {
    weekday: "short",
    day: "numeric",
  });

  const timeFormat = gameDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  const HomeTeamName = game[0].homeTeamName;
  const VisitorTeamName = game[0].visitorTeamName;
  const HomeTeamRecord = game[0].homeRecord;
  const VisitorTeamRecord = game[0].visitorRecord;

  const VisitorTeamIcon = NBAIcons[game[0].visitorTeamAbr];
  const HomeTeamIcon = NBAIcons[game[0].homeTeamAbr];

  return (
    <>
      {todayGame && (
        <section className="game-card">
          <div className="team-content">
            {VisitorTeamIcon && <VisitorTeamIcon />}
            {VisitorTeamName && <h3>{VisitorTeamName}</h3>}
            {VisitorTeamRecord && <p>{VisitorTeamRecord}</p>}
          </div>

          <p>{timeFormat && timeFormat}</p>

          <div className="team-content">
            {HomeTeamIcon && <HomeTeamIcon />}
            {HomeTeamName && <h3>{HomeTeamName}</h3>}
            {HomeTeamRecord && <p>{HomeTeamRecord}</p>}
          </div>
        </section>
      )}
    </>
  );
};

export default GameCard;
