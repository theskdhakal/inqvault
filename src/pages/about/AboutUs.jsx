import React from "react";
import logo from "../../components/Assets/logo.JPG";
import { MainLayout } from "../../components/layout/mainLayout/MainLayout";
import { Container } from "react-bootstrap";

export const AboutUs = () => {
  return (
    <MainLayout>
      <Container className="p-5 ">
        <div>
          <div className="d-flex justify-content-center align-item-center">
            <img src={logo} />
          </div>

          <div className="description mt-4">
            <h5>
              The InqVault Library, established over a century ago by the
              visionary Sk Dhakal, stands as a symbol of knowledge and
              community. Its purpose is clear - to provide a space where people
              can explore, learn, and connect with information. Within its
              walls, a vast collection of books awaits, inviting readers of all
              ages to dive into new worlds and expand their horizons.
            </h5>

            <p className="text-white text-center bg-primary mt-5">
              For more info, please shoot us message
            </p>
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};
