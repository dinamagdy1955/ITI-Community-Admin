import React, { useEffect } from "react";
import db from "src/firebase";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { getUnAcceptedUsers } from "src/Services/users";

export default function UsersRequests() {
  var arr = [];
  var l = [];
  const [users, setUsers] = React.useState([]);
  useEffect(() => {
    db.collection("users-basics").onSnapshot((res) => {
      res.forEach((e) => {
        if (e.data().isAccepted == false) {
          db.collection("users-details")
            .doc(e.id)
            .onSnapshot((response) => {
              //   console.log(e.id);
              //   console.log(e.data());
              //   console.log(response.data());

              let d = {
                id: e.id,
                name:
                  response.data().firstName + " " + response.data().lastName,
                nationalID: response.data().nationalID,
                track: response.data().track,
                branch: response.data().branch,
                email: e.data().email,
              };
              arr.push(d);
              console.log(arr);
              l = [...arr];
              setUsers(l);
              console.log(users);
            });
        }
      });
    });
    // setUsers(arr);
  }, []);
  function acceptUserRequest() {}
  function cancelUserRequest() {}
  const fields = ["name", "nationalID", "track", "branch", "email"];
  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>Simple Table</CCardHeader>
            <CCardBody>
              <CDataTable
                items={users}
                fields={fields}
                itemsPerPage={5}
                pagination
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}
