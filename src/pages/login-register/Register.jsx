import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { InputFields } from "../../components/inputFields/InputFields";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { BiUserPlus } from "react-icons/bi";
import {
  loginUser,
  registerUserAction,
} from "../../components/user/UserAction";
import { MainLayout } from "../../components/layout/mainLayout/MainLayout";
import { Navigate, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState();
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const isUserCreated = await registerUserAction(form);
    isUserCreated && navigate("/");
  };
  const isMobile = useMediaQuery({ maxWidth: 400 });

  return (
    <MainLayout>
      <div className="d-flex justify-content-center align-item-center p-5 m-auto register">
        <Form
          className="border rounded p-5  shadow-lg m-auto register-form"
          style={{ width: isMobile ? "85vw" : "555px" }}
          onSubmit={handleOnSubmit}
        >
          <Form.Text>
            <h3 className="text-center mb-5">Join the library today</h3>
          </Form.Text>

          <Form.Group clasName="mb-3">
            <Form.Label>Account Type</Form.Label>
            <Form.Select name="role" onChange={handleOnChange}>
              <option value="">--Select User--</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Select>
          </Form.Group>

          {InputFields.map((item, i) => (
            <CustomInput
              key={i}
              {...item}
              className="mb-2"
              onChange={handleOnChange}
            />
          ))}

          <div className="d-grid mt-2">
            <Button variant="success" type="submit">
              Register <BiUserPlus />
            </Button>
          </div>
        </Form>
      </div>
    </MainLayout>
  );
};
