import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

const maxRateStar = 5;

export const Rating = ({ rate = 5 }) => {
  const hasDecimalValue = rate % 1;

  const fullRateStar = Math.floor(rate);

  const noRateStar =
    hasDecimalValue > 0
      ? maxRateStar - fullRateStar - 1
      : maxRateStar - fullRateStar;

  const fullStar = new Array(fullRateStar).fill("");
  const noStar = new Array(noRateStar).fill("");

  return (
    <div className="text-warning d-flex gap-1 d-flex ">
      {fullStar.map(() => (
        <BsStarFill />
      ))}

      {hasDecimalValue > 0 && <BsStarHalf />}

      {noStar.map(() => (
        <BsStar />
      ))}
    </div>
  );
};
