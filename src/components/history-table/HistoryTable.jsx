import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { setModalShow } from "../system/SystemSlice";
import { CustomModal } from "../custom-modal/CustomModal";
import { ReviewForm } from "../../pages/reviews/ReviewForm";
import {
  deleteReviewAction,
  getBurrowBookAction,
  returnBookAction,
} from "../../pages/books/BookAction";
import { Rating } from "../rating/Rating";
import { useMediaQuery } from "react-responsive";

export const HistoryTable = () => {
  const dispatch = useDispatch();
  const { burrowHistory } = useSelector((state) => state.books);
  const { user } = useSelector((state) => state.user);
  console.log(burrowHistory);
  const [bookForReview, setBookForReview] = useState({});

  useEffect(() => {
    dispatch(getBurrowBookAction(user?.uid));
  }, [user?.uid]);

  const handleOnReturn = ({ id, bookId, userId }) => {
    if (window.confirm("are you sure you want to return the book")) {
      dispatch(returnBookAction(bookId, id, userId));
    }
  };

  const handleOnGiveReview = (item) => {
    setBookForReview(item);
    dispatch(setModalShow(true));
  };

  const handleOnDeleteReview = (item) => {
    if (window.confirm("are you sure?")) {
      dispatch(deleteReviewAction(item));
    }
  };

  const isMobile = useMediaQuery({ maxWidth: 450 });

  return (
    <Container className="my-5 p-3 shadow-lg">
      <CustomModal heading="Feedback">
        <ReviewForm bookForReview={bookForReview} />
      </CustomModal>
      <Table striped bordered hover>
        <thead>
          <tr>
            {!isMobile && <th>Thumbnail</th>}
            <th>Title</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {burrowHistory.map((item) => (
            <tr key={item.id}>
              {!isMobile && (
                <td>
                  {" "}
                  <img src={item.image} alt=" " style={{ width: "50px" }} />
                </td>
              )}
              <td>{item.bookName}</td>

              <td> {format(new Date(item.borrowingAt), "MMMM dd, yyyy")}</td>

              <td> {format(new Date(item.returnAt), "MMMM dd, yyyy")}</td>
              <td>
                {item.hasReturned ? (
                  item.reviewId ? (
                    <>
                      <Rating rate={item.ratings} />
                      <br />
                      <Button
                        variant="outline-danger"
                        onClick={() => handleOnDeleteReview(item)}
                      >
                        Delete Review
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="warning"
                      onClick={() => handleOnGiveReview(item)}
                    >
                      Give Review
                    </Button>
                  )
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => handleOnReturn(item)}
                  >
                    Return Book
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
