import React from "react";
import { UserLayout } from "../../components/layout/userLayout/UserLayout";
import { EditProfile } from "../../components/edit-profile/EditProfile";

export const Profile = () => {
  return (
    <UserLayout>
      <EditProfile />
    </UserLayout>
  );
};
