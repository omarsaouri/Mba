import React from "react";
import { useState, useEffect } from "react";
import { getColors } from "nba-color";
import NbaCardsContainer from "./NbaCardsContainer";
import FavTeamContent from "./FavTeamContent";

function Main({ data, isTeamChoosen, setIsTeamChoosen, setFavTeamAbr }) {
  const [tnsArray, setTnsArray] = useState([]);
  const [favTeamId, setFavTeamId] = useState();
  const [favTeamColors, setFavTeamColors] = useState(); // the state i wanna use (it returns an object with colors  )

  // array that contains ids of all NBA teams and their associated names
  const getIdTnsArray = async () => {
    if (!data || !data.lscd) {
      return;
    }

    const tidArrayData = data.lscd.flatMap((mscd) => {
      return mscd.mscd?.g?.map((game) => {
        return {
          id: game.h.tid,
          ta: game.h.ta,
        };
      });
    });
    const flattenedTidArray = tidArrayData?.flat();
    const uniqueIds = new Set();
    const filteredArray = flattenedTidArray?.filter((obj) => {
      if (!uniqueIds.has(obj.id)) {
        uniqueIds.add(obj.id);
        return true;
      }
      return false;
    });
    const tnsIdsArray = filteredArray?.slice(0, -1);

    setTnsArray(tnsIdsArray);
  };
  //gets colors of a choosen team
  const getTeamColors = (ta) => {
    const teamColors = getColors(ta);
    const teamColorsArray = Object.entries(teamColors);
    const teamColorsHex = teamColorsArray
      .map(([_, secondItem]) => secondItem?.hex)
      .filter((hex) => hex !== undefined && hex !== null);
    setFavTeamColors(teamColorsHex);
  };

  useEffect(() => {
    getIdTnsArray();
  }, [data]);

  return (
    <main>
      {isTeamChoosen ? (
        <FavTeamContent
          data={data}
          favTeamId={favTeamId}
          isTeamChoosen={isTeamChoosen}
          favTeamColors={favTeamColors}
        ></FavTeamContent>
      ) : (
        <NbaCardsContainer
          abrs={tnsArray}
          isTeamChoosen={isTeamChoosen}
          setIsTeamChoosen={setIsTeamChoosen}
          setFavTeamId={setFavTeamId}
          getTeamColors={getTeamColors}
          setFavTeamAbr={setFavTeamAbr}
        ></NbaCardsContainer>
      )}
    </main>
  );
}

export default Main;
