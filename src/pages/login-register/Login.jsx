import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { InputFields } from "../../components/inputFields/InputFields";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { BsFillFileLock2Fill } from "react-icons/bs";
import { FaSignInAlt } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loginUser } from "../../components/user/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { MainLayout } from "../../components/layout/mainLayout/MainLayout";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../components/firebase-config/FirebaseConfig";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";

export const Login = () => {
  const [form, setForm] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    user?.uid && navigate("/");
  }, [user?.uid]);

  const loginFields = InputFields.filter(
    (field) => field.name === "email" || field.name === "password"
  );

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnLogin = async (e) => {
    e.preventDefault();

    dispatch(loginUser(form));
  };

  const handleOnPasswordReset = () => {
    try {
      if (window.confirm("Send password Reset Link?")) {
        const { email } = form || {};

        if (!email) {
          toast.warning("please provide an email address");
          return;
        }

        //firebase sends email with password reset link
        sendPasswordResetEmail(auth, email).then((resp) => {
          toast.success("password reset link has been sent");
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const isMobile = useMediaQuery({ maxWidth: 450 });
  return (
    <MainLayout>
      <div className="d-flex justify-content-center align-item-center m-auto login">
        <Form
          className="border rounded p-5  shadow-lg m-auto  "
          style={{ background: "white", width: isMobile ? "86vw" : "555px" }}
          onSubmit={handleOnLogin}
        >
          <Form.Text>
            <h3 className="text-center mb-5">Join the library today</h3>
          </Form.Text>

          {loginFields.map((item, i) => (
            <CustomInput
              key={i}
              {...item}
              className="mb-2"
              onChange={handleOnChange}
            />
          ))}

          <div className="d-grid mt-2">
            <Button variant="primary" type="submit">
              Login <FaSignInAlt />
            </Button>
          </div>

          <div className="d-flex justify-content-between">
            <Link to="/register" className="nav-link">
              <p className="text-center text-dark my-4 small">
                <IoPersonAddSharp className="icon" /> Not a member yet?
              </p>
            </Link>

            <p className="text-center my-4 small">
              <Button
                onClick={handleOnPasswordReset}
                className="nav-link text-dark"
                variant="link"
              >
                <BsFillFileLock2Fill className="icon" />
                Forgot your password ?
              </Button>
            </p>
          </div>
        </Form>
      </div>
    </MainLayout>
  );
};
