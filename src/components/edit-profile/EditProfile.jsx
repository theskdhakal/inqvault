import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileACtion } from "../user/UserAction";
import { CustomInput } from "../custom-input/CustomInput";
import a1 from "../Assets/a1.jpg";

export const EditProfile = () => {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    setForm(user);
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to update the details?")) return;

    const { email, role, uid, ...rest } = form;
    const obj = {
      id: uid,
      ...rest,
    };
    dispatch(updateProfileACtion(obj));
  };

  const inputs = [
    {
      label: "user role",
      name: "role",
      type: "text",
      required: true,
      value: form.role,
      disabled: true,
    },
    {
      label: "first Name",
      name: "fName",
      type: "text",
      placeholder: "Sam smith",
      required: true,
      value: form?.fName,
    },
    {
      label: "Last Name",
      name: "lName",
      type: "text",
      placeholder: "Sam smith",
      required: true,
      value: form?.lName,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Samsmith@email.com",
      required: true,
      value: form?.email,
      disabled: true,
    },
  ];

  return (
    <Container className="pb-2">
      <Form
        onSubmit={handleOnSubmit}
        className="border p-5 shadow-lg rounded m-auto bg-light  "
        style={{ width: "30vw" }}
      >
        <div className="d-flex justify-content-center align-item-center">
          <img src={a1} style={{ width: "11vw" }} />
        </div>
        <hr />
        <h3 className="text-primary text-center fw-bolder mb-3 mt-5">
          Update My Profile
        </h3>

        <div className="mt-5">
          {inputs.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnChange} />
          ))}

          <div className="d-grid">
            <Button variant="primary" type="submit">
              update details
            </Button>
          </div>
        </div>
      </Form>
    </Container>
  );
};
