import React, { useEffect } from "react";
import { db } from "src/firebase";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CButton,
} from "@coreui/react";
import { useHistory } from "react-router";
export default function UsersRequests() {
  const history = useHistory();
  if (localStorage.getItem("adminToken") == undefined) history.push("/login");
  const [users, setUsers] = React.useState([]);
  useEffect(() => {
    var arr = [];
    var l = [];
    db.collection("users-basics")
      .where("isAccepted", "==", false)
      .where("isRemoved", "==", false)
      .onSnapshot((res) => {
        arr = [];
        l = [];
        setUsers([]);
        res.forEach((e) => {
          db.collection("users-details")
            .doc(e.id)
            .onSnapshot((response) => {
              if (response.exists) {
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
                l = [...arr];
                setUsers(l);
              }
            });
        });
      });
  }, []);
  function acceptUserRequest(id) {
    db.collection("users-basics").doc(id).update({
      isAccepted: true,
    });
  }
  function cancelUserRequest(id) {
    db.collection("users-basics")
      .doc(id)
      .delete()
      .then(() => {
        db.collection("users-details").doc(id).delete();
      });
  }
  const fields = [
    "name",
    "nationalID",
    "track",
    "branch",
    "email",
    "Accept",
    "Cancel",
  ];
  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>Users Requests</CCardHeader>
            <CCardBody>
              <CDataTable
                items={users}
                fields={fields}
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  Accept: (item) => {
                    return (
                      <td>
                        <CButton
                          color="primary"
                          variant="outline"
                          size="sm"
                          onClick={() => acceptUserRequest(item.id)}
                        >
                          Accept
                        </CButton>
                      </td>
                    );
                  },
                  Cancel: (item) => {
                    return (
                      <td>
                        <CButton
                          color="primary"
                          variant="outline"
                          size="sm"
                          onClick={() => cancelUserRequest(item.id)}
                        >
                          Cancel
                        </CButton>
                      </td>
                    );
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}
