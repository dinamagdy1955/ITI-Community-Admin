import React, { useEffect } from "react";
import db from "src/firebase";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CButton,
} from "@coreui/react";

export default function UsersRequests() {
  var arr = [];
  var l = [];

  const [users, setUsers] = React.useState([]);
  useEffect(() => {
    db.collection("users-basics").onSnapshot((res) => {
      arr = [];
      res.forEach((e) => {
        if (!e.data().isAccepted && !e.data().isRemoved) {
          db.collection("users-details")
            .doc(e.id)
            .onSnapshot((response) => {
              //   console.log(e.id);
              //   console.log(e.data());
              //   console.log(response.data());
              console.log(response.data());
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
              console.log(l);
              setUsers(l);
              console.log(users);
            });
        }
      });
    });
    // setUsers(arr);
  }, []);
  function acceptUserRequest(id) {
    db.collection("users-basics").doc(id).update({
      isAccepted: true,
    });
  }
  function cancelUserRequest(id) {
    db.collection("users-basics").doc(id).update({
      isRemoved: true,
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
            <CCardHeader>Simple Table</CCardHeader>
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
                          square
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
                          square
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
