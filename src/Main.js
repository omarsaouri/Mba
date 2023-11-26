import React from "react";
import { useState, useEffect } from "react";
import { getColors } from "nba-color";
import NbaCardsContainer from "./NbaCardsContainer";
import FavTeamContent from "./FavTeamContent";

function Main({ data }) {
  const [tnsArray, setTnsArray] = useState([]);
  const [isTeamChoosen, setIsTeamChoosen] = useState(false);
  const [favTeamId, setFavTeamId] = useState();

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
  // gets the data of a choosen team

  //gets colors of a choosen team
  const getTeamColors = async (ta) => {
    const teamColors = getColors(ta);
  };

  useEffect(() => {
    getIdTnsArray();
  }, [data]);

  return (
    <main>
      {!isTeamChoosen && (
        <NbaCardsContainer
          abrs={tnsArray}
          isTeamChoosen={isTeamChoosen}
          setIsTeamChoosen={setIsTeamChoosen}
          setFavTeamId={setFavTeamId}
        ></NbaCardsContainer>
      )}
      {isTeamChoosen && (
        <FavTeamContent
          data={data}
          favTeamId={favTeamId}
          isTeamChoosen={isTeamChoosen}
        ></FavTeamContent>
      )}
    </main>
  );
}

export default Main;
