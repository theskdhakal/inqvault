import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { addNewReviewAction } from "../books/BookAction";
import { useDispatch } from "react-redux";
import { setModalShow } from "../../components/system/SystemSlice";
import { addNewMessageAction } from "../../components/user/UserAction";

export const ContactForm = () => {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const messageObj = {
      ...form,
    };
    dispatch(addNewMessageAction(messageObj));
  };

  const inputs = [
    {
      label: "Message ",
      name: "message",
      type: "text",
      required: true,
      placeholder: "nice book",
    },
    {
      label: "Email Address",
      name: "email",
      type: "emal",

      placeholder: "a@a.com",
      required: true,
    },
  ];

  return (
    <Container>
      <Form onSubmit={handleOnSubmit}>
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
            Send Message
          </Button>
        </div>
      </Form>
    </Container>
  );
};
