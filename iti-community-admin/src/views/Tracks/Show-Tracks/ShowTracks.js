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
        console.log(e.data());
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
        console.log(l);
        setTracks(l);
        console.log(tracks);
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
    /* console.log('deleted')*/
    var x = prompt(`are you sure you want to delete the track with id : ${id}`);
    console.log(x);
    if (x != null) {
      return db.collection("Tracks").doc(id).delete();
    }
  }

  const fields = [
    "name",
    "manager",
    "branch",
    "totalTime",
    "specilization",
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
                items={tracks}
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
                      <Button
                        type="reset"
                        variant="danger"
                        onClick={() => Delete(item.id)}
                      >
                        Delete
                      </Button>{" "}
                      <Link to= {`/tracks/${item.id}`}>
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
