import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { Button } from "react-bootstrap";
import { AiFillMessage } from "react-icons/ai";
import { setModalShow } from "../../system/SystemSlice";
import { CustomModal } from "../../custom-modal/CustomModal";
import { ContactForm } from "../../../pages/Contact/ContactForm";

export const UserLayout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleOnClick = (e) => {
    e.preventDefault();

    dispatch(setModalShow(true));
  };

  return (
    <>
      <CustomModal heading="Contact-Us">
        <ContactForm />
      </CustomModal>
      <Header />

      <div className="user-layout ">
        <div className="left  p-2 ">
          <div className="title  px-5">
            {user.fName}
            {"    "} {user.lName}
          </div>
          <hr />
          <div className="sidebar ">
            <ul>
              {user.role === "admin" && (
                <>
                  <li>
                    <Link to="/books" className="text-dark nav-link">
                      Books
                    </Link>
                  </li>
                  <li>
                    <Link to="/clients" className="text-dark nav-link">
                      Clients
                    </Link>
                  </li>

                  <li>
                    <Link to="/reviews" className="text-dark nav-link">
                      Reviews
                    </Link>
                  </li>
                  <li>
                    <Link to="/messages" className="text-dark nav-link">
                      Client-Message
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/history" className="text-dark nav-link">
                  History
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="right">
          {/* main content area  */}

          <div className="main pt-3 margin-auto">{children}</div>
        </div>
      </div>

      <Button className=" message" onClick={handleOnClick}>
        <p className="vertical-text">
          <span className="my-1">
            <AiFillMessage />
          </span>
          Message
        </p>
      </Button>

      <Footer />
    </>
  );
};
