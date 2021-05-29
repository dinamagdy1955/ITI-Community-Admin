import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router";
import { userDataContext } from "src/userDataContext";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";

const TheLayout = () => {
  const { userData } = useContext(userDataContext);
  const history = useHistory();
  const location = useLocation();
  console.log(location.pathname);
  if (localStorage.getItem("adminToken") === undefined) history.push("/login");
  if (
    localStorage.getItem("adminToken") !== undefined &&
    location.pathname === "/login#"
  )
    history.push("/dashboard");

  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
