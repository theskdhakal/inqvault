import React, { useState } from "react";
import { UserLayout } from "../../components/layout/userLayout/UserLayout";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { ClientCardCard } from "../../components/client-card/ClientCard";
import { setModalShow } from "../../components/system/SystemSlice";
import { CustomModal } from "../../components/custom-modal/CustomModal";
import { EditProfile } from "../../components/edit-profile/EditProfile";

export const Clients = () => {
  const { client } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState({});

  const handleOnEdit = (obj) => {
    setSelectedUser(obj);
    dispatch(setModalShow(true));
  };

  return (
    <UserLayout>
      <CustomModal heading="Edit CLient Details">
        <EditProfile selectedUser={selectedUser} />
      </CustomModal>

      <Container className="client-cards">
        {client.map((item) => (
          <ClientCardCard key={item.id} {...item} />
        ))}
      </Container>
    </UserLayout>
  );
};
