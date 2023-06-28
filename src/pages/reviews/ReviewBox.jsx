import React from "react";
import { Rating } from "../../components/rating/Rating";
import "./Review.css";

export const ReviewBox = ({ userName, title, feedback, ratings }) => {
  return (
    <div className="review d-flex  border rounded">
      <div className="avatar">
        <div className="name-log">{userName[0]}</div>
        <div className="name">{userName}</div>
      </div>

      <div className="review-content">
        <h3>{title}</h3>
        <Rating rate={ratings} />
        <p className="mt-3">{feedback}</p>
      </div>
    </div>
  );
};
