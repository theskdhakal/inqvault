import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { addNewReviewAction } from "../books/BookAction";
import { useDispatch } from "react-redux";

export const ReviewForm = ({ bookForReview }) => {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const { bookId, userName, userId, id, bookName } = bookForReview;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const reviewObj = {
      ...form,
      bookId,
      userName,
      userId,
      bhId: id,
      bookName,
    };

    dispatch(addNewReviewAction(reviewObj));
  };

  const inputs = [
    {
      label: "Review Title",
      name: "title",
      type: "text",
      required: true,
      placeholder: "nice book",
      value: form.title,
    },
    {
      label: "Ratings",
      name: "ratings",
      type: "number",
      min: 1,
      max: 5,

      placeholder: "5",
      required: true,

      value: form.ratings,
    },
    {
      label: "Feedback",
      name: "feedback",
      type: "text",
      required: true,

      as: "textarea",
      rows: "3",
      value: form.feedback,
    },
  ];

  return (
    <Container>
      <Form onSubmit={handleOnSubmit}>
        <h3>Review for: {bookName}</h3>
        {inputs.map((item, i) => (
          <CustomInput
            key={i}
            {...item}
            className="mb-2"
            onChange={handleOnChange}
          />
        ))}

        <div className="d-grid mt-2">
          <Button variant="primary" type="submit">
            Submit Review
          </Button>
        </div>
      </Form>
    </Container>
  );
};
