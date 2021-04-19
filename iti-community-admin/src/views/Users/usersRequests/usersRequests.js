import React from "react";
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
  const [collapsed, setCollapsed] = React.useState(true);
  const [showCard, setShowCard] = React.useState(true);
  return (
    <>
      <CCol xs="12" sm="6" md="4">
        <CFade in={showCard}>
          <CCard>
            <CCardHeader>
              <div className="card-header-actions">
                <CLink className="card-header-action">
                  <CIcon name="cil-settings" />
                </CLink>
                <CLink
                  className="card-header-action"
                  onClick={() => setCollapsed(!collapsed)}
                >
                  <CIcon
                    name={collapsed ? "cil-chevron-bottom" : "cil-chevron-top"}
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
              <CCardBody></CCardBody>
            </CCollapse>
          </CCard>
        </CFade>
      </CCol>
    </>
  );
}
