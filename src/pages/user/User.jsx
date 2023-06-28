import React from "react";
import { MainLayout } from "../../components/layout/mainLayout/MainLayout";
import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";

export const User = () => {
  return (
    <MainLayout>
      <Dropdown as={NavItem}>
        <Dropdown.Toggle as={NavLink}>abcd…</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Hello there!</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </MainLayout>
  );
};
