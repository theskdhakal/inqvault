import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MainLayout } from "../../components/layout/mainLayout/MainLayout";
import { Button, Col, Container, Row } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { createNewBurrowAction, getSelectedBookReview } from "./BookAction";
import { format } from "date-fns";
import { ReviewBox } from "../reviews/ReviewBox";
import { setReviews } from "./BookSlice";

export const BookLanding = () => {
  const { book, reviews } = useSelector((state) => state.books);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookId } = useParams();
  console.log(book);

  const selectedBook = book.find((item) => item.id === bookId) || {};

  const { id, title, name, year, summary, url, isAvailable, availableFrom } =
    selectedBook;

  useEffect(() => {
    if (!book.length) {
      navigate("/");
    }

    //fetch all review for this book

    dispatch(getSelectedBookReview(bookId));

    return () => {
      dispatch(setReviews([]));
    };
  }, [bookId, dispatch, navigate, book.length]);

  const handleOnBurrow = () => {
    const { uid, fName } = user;

    if (user.uid) {
      //create burrowhistoryTable and add Following object

      const defaultBurrowDay = 21;

      const obj = {
        bookId,
        bookName: title,
        userName: fName,
        userId: uid,
        borrowingAt: Date.now(),
        returnAt: Date.now() + defaultBurrowDay * 24 * 60 * 60 * 1000,
        hasReturned: false,
        image: url,
      };
      dispatch(createNewBurrowAction(obj));
      return;
    }
  };

  return (
    <MainLayout>
      <Container className="m-auto p-5">
        <Link to="/library">
          <Button variant="secondary">
            <IoMdArrowRoundBack />
            Back
          </Button>
        </Link>

        <div className="mt-5 pt-5">
          <Row>
            <Col md="4">
              <img src={url} width="100%" alt="" />
            </Col>

            <Col>
              <h1>{title}</h1>
              <p>
                {name}-{year}
              </p>

              <p>
                {!user?.uid ? (
                  <Button disabled={true}>Login to Burrow</Button>
                ) : isAvailable ? (
                  <Button onClick={handleOnBurrow}> Burrow Now</Button>
                ) : (
                  <Button variant="info" disabled className="mt-3 mb-2 fw-bold">
                    Available from:{" "}
                    {format(new Date(availableFrom), "MMMM dd, yyyy")}
                  </Button>
                )}
              </p>

              <p className="mt-5">{summary}</p>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <h4>Reviews</h4>
              <div className="review-list">
                {reviews.length < 1 && (
                  <h5 className="mt-5">No Reviews Found</h5>
                )}
                {reviews.map((item) => (
                  <ReviewBox key={item.id} {...item} />
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </MainLayout>
  );
};
