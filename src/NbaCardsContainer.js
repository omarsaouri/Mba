import React from "react";
import { useState, useEffect } from "react";
import * as NBAIcons from "react-nba-logos";
import Loading from "react-loading-components";

const NbaCardsContainer = ({
  abrs,
  isTeamChoosen,
  setIsTeamChoosen,
  setFavTeamId,
  getTeamColors,
  setFavTeamAbr,
}) => {
  const [loading, setLoading] = useState(true);
  const nbaCardVariables = {};
  const arrayOfAbrs = abrs.map((abr) => {
    return { abr: abr.ta };
  });

  arrayOfAbrs.forEach((item) => {
    const variableName = `nbaCard_${item.abr}`;
    nbaCardVariables[variableName] = NBAIcons[item.abr];
  });

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <>
      {!loading && (
        <div className="intro-container">
          <h2>Choose your favorite NBA Team</h2>
          <p>You will exclusively track the team you've chosen</p>
        </div>
      )}
      <section className="nba-cards-container">
        {loading && (
          <div className="loading-container">
            <Loading type="tail_spin" width={75} height={75} fill="#fff" />
          </div>
        )}

        {!loading &&
          abrs.map((item) => (
            <div
              className="nba-card"
              key={item.id}
              onClick={() => {
                setIsTeamChoosen(true);
                setFavTeamId(item.id);
                getTeamColors(item.ta);
                setFavTeamAbr(item.ta);
              }}
            >
              {nbaCardVariables[`nbaCard_${item.ta}`] &&
                React.createElement(nbaCardVariables[`nbaCard_${item.ta}`], {
                  size: 60,
                })}
              <h3>{item.ta}</h3>
            </div>
          ))}
      </section>
    </>
  );
};

export default NbaCardsContainer;
