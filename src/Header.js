import React from "react";
import * as NBAIcons from "react-nba-logos";

function Header({ isTeamChoosen, favTeamAbr }) {
  const Icon = NBAIcons[favTeamAbr];
  return (
    <header>
      {!isTeamChoosen && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="75"
          height="75"
          viewBox="0 0 192.756 192.756"
        >
          <g fillRule="evenodd" clipRule="evenodd">
            <path
              fill="transparent"
              d="M0 0h192.756v192.756H0V0z"
              className=""
            />
            <path
              fill="#fff"
              d="M175.893 125.479h-7.736c0-7.83.514-18.082-2.047-25.791h-35.719v25.791h-7.508v-10.955c-6.607 9.941-20.652 10.961-31.85 10.955h-20.25c0-12.793-5.848-26.824-15.181-37.086-8.08-8.887-18.774-13.585-30.548-13.585l.455 50.672h-8.645V67.278c7.292 0 14.753.504 21.809 2.703 13.53 4.217 25.577 13.174 32.11 26.283V67.278h11.545c13.263.068 38.505 2.787 38.505 16.662 0 6.526-6.408 11.132-12.285 11.868 5.963.909 11.197 3.634 14.334 8.901V67.278c4.793.235 9.893.024 14.637.707 15.504 2.231 29.416 8.598 34.889 25.724 3.305 10.342 3.485 20.783 3.485 31.77zM78.291 73.44H84c7.28 0 27.507.931 27.507 11.868 0 7.529-15.469 9.412-20.704 10.955 7.424 1.064 24.467 4.334 24.842 13.924-1.223 7.369-16.889 9.812-24.75 9.812H78.291V73.44zm52.1 0c15.84 0 27.352 5.209 34.125 20.313h-34.125V73.44z"
            />
          </g>
        </svg>
      )}
      {isTeamChoosen && <Icon />}
    </header>
  );
}

export default Header;
