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
export default function DeleteReportedUsers() {
  const history = useHistory();
  if (localStorage.getItem("adminToken") == undefined) history.push("/login");
  const [users, setUsers] = React.useState([]);
  useEffect(() => {
    db.collection("users-basics")
      .where("isAccepted", "==", true)
      .where("isReported", "==", true)
      .where("isRemoved", "==", false)
      .onSnapshot((res) => {
        var arr = [];
        var temp = [];
        setUsers([]);
        res.forEach((e) => {
          db.collection("users-details")
            .doc(e.id)
            .onSnapshot((response) => {
              let d = {
                id: e.id,
                name:
                  response.data().firstName + " " + response.data().lastName,
                email: e.data().email,
                isReported: e.data().isReported.toString(),
                reports: e.data().reports,
              };
              arr.push(d);
              temp = [...arr];
              setUsers(temp);
            });
        });
      });
  }, []);
  function removeReportedUsers(id) {
    db.collection("users-basics").doc(id).update({
      isRemoved: true,
    });
  }
  const fields = ["name", "email", "isReported", "reports", "Remove"];
  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>Reported Users</CCardHeader>
            <CCardBody>
              <CDataTable
                items={users}
                fields={fields}
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  Remove: (item) => {
                    return (
                      <td>
                        <CButton
                          color="primary"
                          variant="outline"
                          size="sm"
                          onClick={() => removeReportedUsers(item.id)}
                        >
                          Remove
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
