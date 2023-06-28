import React, { useState } from "react";
import { UserLayout } from "../../components/layout/userLayout/UserLayout";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { useDispatch } from "react-redux";
import { addNewBookAction } from "./BookAction";

export const NewBook = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch(addNewBookAction(form));
  };
  const BookDetails = [
    {
      label: "Title",
      name: "title",
      placeholder: "The Alchemist",
      type: "text",
      required: true,
    },
    {
      label: "Author Name",
      name: "name",
      placeholder: "Paulo Coelho",
      type: "text",
      required: true,
    },
    {
      label: "Published Year",
      name: "year",
      placeholder: "1999",
      type: "number",
      required: true,
    },
    {
      label: "Imager Url",
      name: "url",
      placeholder: "http://image-url.com",
      type: "url",
      required: true,
    },
    {
      label: "Summary",
      name: "summary",
      as: "textarea",
      type: "text",
      rows: "3",
      required: true,
    },
  ];
  return (
    <UserLayout>
      <Container>
        <p className="page-title">New Book</p>

        <hr />

        <Link to="/books">
          <Button variant="secondary" className="mb-2">
            {" "}
            &lt; Back
          </Button>
        </Link>

        <Form
          className="border rounded p-5  shadow-lg m-auto "
          style={{ width: "555px", background: "white" }}
          onSubmit={handleOnSubmit}
        >
          <Form.Text>
            <h3 className="text-center mb-5">Add New Book</h3>
          </Form.Text>

          {BookDetails.map((item, i) => (
            <CustomInput
              key={i}
              {...item}
              className="mb-2"
              onChange={handleOnChange}
            />
          ))}

          <div className="d-grid mt-2">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Form>
      </Container>
    </UserLayout>
  );
};
