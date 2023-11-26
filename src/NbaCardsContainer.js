import React from "react";
import * as NBAIcons from "react-nba-logos";

const NbaCardsContainer = ({ abrs, fetchDataOfTeam }) => {
  const nbaCardVariables = {};
  const arrayOfAbrs = abrs.map((abr) => {
    return { abr: abr.ta };
  });

  arrayOfAbrs.forEach((item) => {
    const variableName = `nbaCard_${item.abr}`;
    nbaCardVariables[variableName] = NBAIcons[item.abr];
  });
  console.log(arrayOfAbrs);

  return (
    <div>
      {abrs.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            fetchDataOfTeam(item.id);
          }}
        >
          {nbaCardVariables[`nbaCard_${item.ta}`] &&
            React.createElement(nbaCardVariables[`nbaCard_${item.ta}`])}
          <h2>{item.ta}</h2>
        </div>
      ))}
    </div>
  );
};

export default NbaCardsContainer;
