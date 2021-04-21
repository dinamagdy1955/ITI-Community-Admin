import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
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
        console.log(e.data());
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
        console.log(l);
        setBranch(l);
        console.log(branch);
      });
    });
  }, []);

  function getBranchData(itm) {
    console.log(itm);
    return itm;
  }

  function Delete(id) {
    /*console.log('deleted')*/
    var x = prompt(
      `are you sure you want to delete the Branch with id : ${id}`
    );
    console.log(x);
    if (x != null) {
      db.collection("Branches").doc(id).delete();
    }
  }

  const fields = [
    "name",
    "location",
    "no_tracks",
    "no_students",
    "no_instructors",
    "manager",
    "Delete",
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
                size="sm"
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  Delete: (item) => (
                    <td>
                      <Button variant="danger" onClick={() => Delete(item.id)}>
                        Delete
                      </Button>{" "}
                      <Link
                        to="/branches/Edit-Branche"
                        onClick={() => getBranchData(item)}
                      >
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
