import React, { useState, useEffect } from "react";

const DateSelector = ({
  currentDate,
  setCurrentDate,
  fetchGameByDate,
  favTeamData,
}) => {
  //const [nextDay, setNextDay] = useState(new Date());
  const [day, setDay] = useState(new Date());
  //const [prevDay, setPrevDay] = useState(new Date());
  const monthYearDateFormat = currentDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const dayDateFormat = currentDate.toLocaleString("en-US", {
    weekday: "short",
    day: "numeric",
  });

  const goNextDay = () => {
    const newNextDay = new Date(day);
    newNextDay.setDate(day.getDate() + 1);

    // Update nextDay without affecting currentDate
    setDay(newNextDay);
  };

  const goPrevDay = () => {
    const newPrevDay = new Date(day);
    newPrevDay.setDate(day.getDate() - 1);

    // Update PrevDay without affecting currentDate
    setDay(newPrevDay);
  };

  useEffect(() => {
    console.log(day);
    fetchGameByDate(favTeamData, day);
  }, [day]);

  return (
    <section>
      <button
        onClick={() => {
          goPrevDay();
        }}
      >
        go back
      </button>
      <div>
        <h2>{monthYearDateFormat}</h2>
        <h3>{dayDateFormat}</h3>
      </div>
      <button
        onClick={() => {
          goNextDay();
        }}
      >
        go forward
      </button>
    </section>
  );
};

export default DateSelector;
