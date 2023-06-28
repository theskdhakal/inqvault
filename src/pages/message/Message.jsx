import React, { useEffect } from "react";
import { UserLayout } from "../../components/layout/userLayout/UserLayout";
import { MessageTable } from "../../components/message-table/MessageTable";
import { getAllMessageAction } from "../../components/user/UserAction";
import { useDispatch } from "react-redux";

export const Message = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMessageAction());
  }, [dispatch]);
  return (
    <UserLayout>
      <MessageTable />
    </UserLayout>
  );
};
