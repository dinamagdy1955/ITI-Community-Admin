import React, { useEffect } from "react";
import db from "src/firebase";
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

export default function UsersRequests() {
  var arr = [];
  const [collapsed, setCollapsed] = React.useState(true);
  const [showCard, setShowCard] = React.useState(true);

  useEffect(() => {
    const getData = async () => {
      await db
        .collection("users-basics")
        .get()
        .then((res) => {
          res.forEach((e) => {
            arr.push({
              id: e.id,
              data: e.data(),
            });
          });
          console.log(arr);
        });
    };
    getData();
  }, []);

  function acceptUserRequest() {}
  function cancelUserRequest() {}
  return (
    <div>
      {arr.map((user, index) => {
        return (
          <CCol xs="12" sm="6" md="4">
            <CFade in={showCard}>
              <CCard>
                <CCardHeader>
                  {user}
                  <div className="card-header-actions">
                    <CLink
                      className="card-header-action"
                      onClick={() => acceptUserRequest()}
                    >
                      <CIcon name="cil-settings" />
                    </CLink>
                    <CLink
                      className="card-header-action"
                      onClick={() => setCollapsed(!collapsed)}
                    >
                      <CIcon
                        name={
                          collapsed ? "cil-chevron-bottom" : "cil-chevron-top"
                        }
                      />
                    </CLink>
                    <CLink
                      className="card-header-action"
                      onClick={() => {
                        setShowCard(false);
                        cancelUserRequest();
                      }}
                    >
                      <CIcon name="cil-x-circle" />
                    </CLink>
                  </div>
                </CCardHeader>
                <CCollapse show={collapsed}>
                  <CCardBody></CCardBody>
                </CCollapse>
              </CCard>
            </CFade>
          </CCol>
        );
      })}
    </div>
  );
}
