import React, { useEffect, useState } from "react";
import { UserLayout } from "../../components/layout/userLayout/UserLayout";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { useDispatch } from "react-redux";
import { updateBookAction } from "../../pages/books/BookAction";

export const EditBook = ({ selectedBook }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState();

  useEffect(() => {
    setForm(selectedBook);
  }, []);

  console.log(selectedBook);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure , you want to update the book?")) {
      dispatch(updateBookAction(form));
    }
  };
  const BookDetails = [
    {
      label: "Title",
      name: "title",
      placeholder: "The Alchemist",
      type: "text",
      required: true,
      value: form?.title,
    },
    {
      label: "Author Name",
      name: "name",
      placeholder: "Paulo Coelho",
      type: "text",
      required: true,
      value: form?.name,
    },
    {
      label: "Published Year",
      name: "year",
      placeholder: "1999",
      type: "number",
      required: true,
      value: form?.year,
    },
    {
      label: "Imager Url",
      name: "url",
      placeholder: "http://image-url.com",
      type: "url",
      required: true,
      value: form?.url,
    },
    {
      label: "Summary",
      name: "summary",
      as: "textarea",
      type: "text",
      rows: "3",
      required: true,
      value: form?.summary,
    },
  ];
  return (
    <Container>
      <Form
        className="p-5   m-auto "
        style={{ width: "460px" }}
        onSubmit={handleOnSubmit}
      >
        <div className="mt-1">
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
              Update
            </Button>
          </div>
        </div>
      </Form>
    </Container>
  );
};
