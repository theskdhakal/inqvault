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
