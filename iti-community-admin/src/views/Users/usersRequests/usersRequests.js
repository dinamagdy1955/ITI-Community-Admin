import React, { useEffect } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CCollapse,
  CFade,
  CSwitch,
  CLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { getUnAcceptedUsers } from "src/Services/users";

export default function UsersRequests() {
  var arr = [];

  const [collapsed, setCollapsed] = React.useState(true);
  const [showCard, setShowCard] = React.useState(true);
  useEffect(() => {
    const data = getUnAcceptedUsers().then((res) => {
      arr = res;
      console.log(arr);
    });
  }, [arr]);
  function acceptUserRequest() {}
  function cancelUserRequest() {}
  return (
    <div>
      {arr.map((user, index) => {
        return (
          <div>
            <p>{user}</p>
          </div>
          // <CCol xs="12" sm="6" md="4">
          //   <CFade in={showCard}>
          //     <CCard>
          //       <CCardHeader>
          //         {user.detailedData.firstName}
          //         <div className="card-header-actions">
          //           <CLink
          //             className="card-header-action"
          //             onClick={() => acceptUserRequest()}
          //           >
          //             <CIcon name="cil-settings" />
          //           </CLink>
          //           <CLink
          //             className="card-header-action"
          //             onClick={() => setCollapsed(!collapsed)}
          //           >
          //             <CIcon
          //               name={
          //                 collapsed ? "cil-chevron-bottom" : "cil-chevron-top"
          //               }
          //             />
          //           </CLink>
          //           <CLink
          //             className="card-header-action"
          //             onClick={() => {
          //               setShowCard(false);
          //               cancelUserRequest();
          //             }}
          //           >
          //             <CIcon name="cil-x-circle" />
          //           </CLink>
          //         </div>
          //       </CCardHeader>
          //       <CCollapse show={collapsed}>
          //         <CCardBody></CCardBody>
          //       </CCollapse>
          //     </CCard>
          //   </CFade>
          // </CCol>
        );
      })}
    </div>
  );
}
