import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
i;

export const ResetPwd = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="d-grid mt-4">
      <Button variant="danger" type="submit">
        Request reset password reset email
      </Button>
    </div>
  );
};
