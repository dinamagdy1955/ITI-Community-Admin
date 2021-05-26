import React, { useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";
import Button from "react-bootstrap/Button";
import { db } from "src/firebase";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
export default function ShowTracks() {
  const history = useHistory();
  if (localStorage.getItem("adminToken") == undefined) history.push("/login");
  var arr = [];
  var l = [];
  const [tracks, setTracks] = React.useState([]);
  useEffect(() => {
    db.collection("Tracks").onSnapshot((res) => {
      arr = [];
      res.forEach((e) => {
        let d = {
          id: e.id,
          name: e.data().name,
          manager: e.data().manager,
          branch: e.data().branch,
          totalTime: e.data().totalTime,
          specilization: e.data().specilization,
        };
        arr.push(d);
        l = [...arr];
        setTracks(l);
      });
    });
  }, []);
  /*function Edit(id) {
    //db.collection("users-basics").doc(id).update({
    //   isAccepted: true,
    // });
    console.log('edited')
   
  }*/
  function Delete(id) {
    db.collection("Tracks").doc(id).delete();
  }

  const fields = [
    "name",
    "manager",
    "branch",
    "totalTime",
    "specilization",
    {
      key: "Delete",
      label: "",
      sorter: false,
      filter: false,
    },
  ];

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Tracks</CCardHeader>
            <CCardBody>
              <CDataTable
                items={tracks}
                fields={fields}
                hover
                striped
                bordered
                size="sm"
                itemsPerPage={5}
                pagination
                columnFilter
                tableFilter
                sorter
                scopedSlots={{
                  Delete: (item) => (
                    <td>
                      <Button
                        type="reset"
                        variant="danger"
                        onClick={() => Delete(item.id)}
                      >
                        Delete
                      </Button>{" "}
                      <Link to={`/tracks/${item.id}`}>
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
/*<Button  variant="success" onClick={() => Edit(item.id)}>Edit</Button>{' '} */
