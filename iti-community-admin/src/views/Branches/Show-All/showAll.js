import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";
import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { db } from "src/firebase";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
export default function ShowAll() {
  const history = useHistory();
  if (localStorage.getItem("adminToken") == undefined) history.push("/login");
  var arr = [];
  var l = [];
  const [branch, setBranch] = React.useState([]);
  useEffect(() => {
    db.collection("Branches").onSnapshot((res) => {
      arr = [];
      res.forEach((e) => {
        let d = {
          id: e.id,
          name: e.data().name,
          location: e.data().location,
          no_tracks: e.data().no_tracks,
          no_students: e.data().no_students,
          no_instructors: e.data().no_instructors,
          manager: e.data().manager,
        };
        arr.push(d);
        l = [...arr];
        setBranch(l);
      });
    });
  }, []);

  function Delete(id) {
    db.collection("Branches").doc(id).delete();
  }

  const fields = [
    "name",
    "location",
    "no_tracks",
    "no_students",
    "no_instructors",
    "manager",
    {
      key: "Delete",
      label: "",
      sorter: false,
      filter: false,
      _style: { width: "15%" },
    },
  ];

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Branches</CCardHeader>
            <CCardBody>
              <CDataTable
                items={branch}
                fields={fields}
                hover
                striped
                bordered
                columnFilter
                tableFilter
                sorter
                size="sm"
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  Delete: (item) => (
                    <td>
                      <Button variant="danger" onClick={() => Delete(item.id)}>
                        Delete
                      </Button>{" "}
                      <Link to={`/branches/${item.id}`}>
                        <Button variant="success">Edit</Button>
                      </Link>
                    </td>
                  ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}
/* <Button variant="success" onClick={() => Edit(item.id)}>Edit</Button>{' '} */
