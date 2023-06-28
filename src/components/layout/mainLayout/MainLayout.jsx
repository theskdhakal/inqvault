import React from "react";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { Button } from "react-bootstrap";
import { AiFillMessage } from "react-icons/ai";
import { CustomModal } from "../../custom-modal/CustomModal";
import { ContactForm } from "../../../pages/Contact/ContactForm";
import { setModalShow } from "../../system/SystemSlice";
import { useDispatch } from "react-redux";

export const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const handleOnClick = (e) => {
    e.preventDefault();

    dispatch(setModalShow(true));
  };
  return (
    <div>
      <CustomModal heading="Contact-Us">
        <ContactForm />
      </CustomModal>
      {/* header goes on top  */}
      <Header />

      <div className="main ">{children}</div>

      <Button className=" message" onClick={handleOnClick}>
        <p className="vertical-text">
          <AiFillMessage />
          Message
        </p>
      </Button>

      <Footer />
    </div>
  );
};
