import React from "react";
import { UserLayout } from "../../components/layout/userLayout/UserLayout";
import { Chart } from "../../components/chart/Chart";
import library from "../../components/Assets/library.gif";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";

export const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  if (user.role !== "admin") {
    return (
      <UserLayout>
        <Container>
          <img src={library} className="gif" />
          <h2 className="text-white px-5">
            {" "}
            Please Click on history menu to access your borrowing history
          </h2>
        </Container>
      </UserLayout>
    );
  }
  return (
    <UserLayout>
      <Chart />
    </UserLayout>
  );
};
