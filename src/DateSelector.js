import React, { useState, useEffect } from "react";

const DateSelector = ({
  fetchGameByDate,
  favTeamData,
  currentDate,
  gameByDate,
}) => {
  const [day, setDay] = useState(new Date());

  const monthYearDateFormat = day.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const dayDateFormat = day.toLocaleString("en-US", {
    weekday: "short",
    day: "numeric",
  });

  const goNextDay = () => {
    const newNextDay = new Date(day);
    newNextDay.setDate(day.getDate() + 1);
    setDay(newNextDay);
  };

  const goPrevDay = () => {
    const newPrevDay = new Date(day);
    newPrevDay.setDate(day.getDate() - 1);

    // Update PrevDay without affecting currentDate
    setDay(newPrevDay);
  };

  const resetDate = () => {
    setDay(currentDate);
  };

  useEffect(() => {
    console.log(day);
    console.log(favTeamData);
    fetchGameByDate(favTeamData, day);
  }, [day]);

  return (
    <section className="date-selector-container">
      <button
        className="date-selector-btns"
        onClick={() => {
          resetDate();
        }}
      >
        <i class="fas fa-undo-alt"></i>
      </button>
      <button
        className="date-selector-btns"
        onClick={() => {
          goPrevDay();
        }}
      >
        <i class="fas fa-chevron-left"></i>
      </button>
      <div className="date-container">
        <h2>{monthYearDateFormat}</h2>
        <h3>{dayDateFormat}</h3>
      </div>
      <button
        className="date-selector-btns"
        onClick={() => {
          goNextDay();
        }}
      >
        <i class="fas fa-chevron-right"></i>
      </button>

      <button
        className="date-selector-btns"
        onClick={() => {
          resetDate();
        }}
      >
        <i class="fas fa-forward"></i>
      </button>
    </section>
  );
};

export default DateSelector;
