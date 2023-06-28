import React, { useEffect } from "react";
import { UserLayout } from "../../components/layout/userLayout/UserLayout";
import { Button, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "../../components/rating/Rating";
import { getAllBookReview } from "../books/BookAction";
import "./Review.css";

export const Reviews = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBookReview());
  }, [dispatch]);

  const { reviews } = useSelector((state) => state.books);
  return (
    <UserLayout>
      <Container className="review-table">
        <Table striped bordered hover className="rev-tab">
          <thead>
            <tr>
              <th>Book-Title</th>
              <th>User</th>
              <th>Feedback</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((item) => (
              <tr key={item.id}>
                <td>{item.bookName}</td>
                <td>{item.userName}</td>
                <td>{item.feedback}</td>
                <td>
                  <Rating rate={item.ratings} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </UserLayout>
  );
};
