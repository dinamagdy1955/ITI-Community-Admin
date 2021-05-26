import React, { useState, useEffect } from "react";
import { db } from "src/firebase";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CCollapse,
  CFade,
  CLink,
} from "@coreui/react";
import { useHistory } from "react-router";
import CIcon from "@coreui/icons-react";
export default function UnAcceptAdmin() {
  const history = useHistory();
  if (localStorage.getItem("adminToken") == undefined) history.push("/login");
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    var arr = [];
    var temp = [];
    db.collection("admins").onSnapshot((res) => {
      arr = [];
      temp = [];
      setAdmins([]);
      res.forEach((e) => {
        if (!e.data().isAccepted) {
          let d = {
            id: e.id,
            name: e.data().firstName + " " + e.data().lastName,
            branch: e.data().branch,
            email: e.data().email,
            userName: e.data().userName,
          };
          arr.push(d);
          temp = [...arr];
          setAdmins(temp);
        }
      });
    });
  }, []);
  const [collapsed, setCollapsed] = React.useState(true);
  const [showCard, setShowCard] = React.useState(true);
  function AcceptAdmin(id) {
    db.collection("admins").doc(id).update({
      isAccepted: true,
    });
  }
  return (
    <div>
      {admins.map((admin) => {
        return (
          <CCol xs="12" sm="6" md="4">
            <CFade in={showCard}>
              <CCard>
                <CCardHeader>
                  <strong>{admin.name}</strong>
                  <div className="card-header-actions">
                    <CLink
                      className="card-header-action"
                      onClick={() => AcceptAdmin(admin.id)}
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
                      onClick={() => setShowCard(false)}
                    >
                      <CIcon name="cil-x-circle" />
                    </CLink>
                  </div>
                </CCardHeader>
                <CCollapse show={collapsed}>
                  <CCardBody>
                    <div>
                      <strong>Email:</strong>
                      {admin.email}
                    </div>
                    <div>
                      <strong>Branch:</strong>
                      {admin.branch}
                    </div>
                    <div>
                      <strong>Username:</strong>
                      {admin.userName}
                    </div>
                  </CCardBody>
                </CCollapse>
              </CCard>
            </CFade>
          </CCol>
        );
      })}
    </div>
  );
}
