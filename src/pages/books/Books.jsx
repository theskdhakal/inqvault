import React from "react";
import { UserLayout } from "../../components/layout/userLayout/UserLayout";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BookTable } from "./BookTable";

export const Books = () => {
  const { user } = useSelector((state) => state.user);

  if (user.role !== "admin") {
    return (
      <UserLayout>
        <h1>NOt AUTHORIZED</h1>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <Container>
        <p className="page-title"> BOOKS</p>

        <hr />
        <div className="text-end">
          <Link to="/newBook">
            <Button variant="primary">+Add New Books</Button>
          </Link>
        </div>

        <div className="mt-3 p-2 shadow-lg">
          <BookTable />
        </div>
      </Container>
    </UserLayout>
  );
};
