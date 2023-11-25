import React from "react";
import { useState, useEffect } from "react";
import { getColors } from "nba-color";

function Main({ data }) {
  const [tnsArray, setTnsArray] = useState([]);

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
  const getDataOfTeam = async (id) => {
    if (!data || !data.lscd) {
      return [];
    }

    const dataOfTeam = data.lscd.flatMap((mscd) => {
      return mscd.mscd?.g
        ?.filter((game) => id === game.h.tid || id === game.v.tid)
        ?.map((game) => {
          return {
            gameDay: game.gdte,
            gameTime: game.stt,
            homeTeamName: game.h.tn,
            homeTeamAbr: game.h.ta,
            homeRecord: game.h.re,
            visitorTeamName: game.v.tn,
            visitorRecord: game.v.re,
            visitorTeamAbr: game.v.ta,
          };
        });
    });
    return dataOfTeam;
  };

  const fetchDataOfTeam = async (id) => {
    const teamSchedule = await getDataOfTeam(id);
    console.log(teamSchedule);
  };
  //gets colors of a choosen team
  const getTeamColors = async (ta) => {
    const teamColors = getColors(ta);
    console.log(teamColors);
  };

  useEffect(() => {
    getIdTnsArray();
  }, [data]);
  return (
    <ul>
      {tnsArray?.map((item) => (
        <li
          onClick={() => {
            fetchDataOfTeam(item.id);
            getTeamColors(item.ta);
          }}
          key={item.id}
        >
          {item.ta}
        </li>
      ))}
    </ul>
  );
}

export default Main;
