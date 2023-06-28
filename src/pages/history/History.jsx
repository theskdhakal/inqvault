import React from "react";
import { UserLayout } from "../../components/layout/userLayout/UserLayout";
import { HistoryTable } from "../../components/history-table/HistoryTable";

export const History = () => {
  return (
    <UserLayout>
      <HistoryTable />
    </UserLayout>
  );
};
