import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          ITI Community
        </a>
        <span className="ml-1">&copy; ITI Community 2021.</span>
      </div>

      <div className="mfs-auto">
        <a
          href="https://coreui.io/react"
          target="_blank"
          rel="noopener noreferrer"
        >
          ITI Community 2021
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
