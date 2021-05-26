import React, { useState, useEffect } from "react";
import { db } from "src/firebase";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CImg,
} from "@coreui/react";
import { useHistory } from "react-router";

const ShowAdmins = () => {
  const history = useHistory();
  if (localStorage.getItem("adminToken") == undefined) history.push("/login");
  const [admins, setAdmins] = useState([]);
  let sub1;
  useEffect(() => {
    var arr = [];
    var l = [];
    sub1 = db.collection("admins").onSnapshot((res) => {
      arr = [];
      l = [];
      setAdmins([]);
      res.forEach((e) => {
        let d = {
          id: e.id,
          name: e.data().firstName + " " + e.data().lastName,
          avatar: e.data().avatar,
          username: e.data().userName,
          email: e.data().email,
          branch: e.data().branch,
        };
        if (d.avatar == undefined) {
          d.avatar =
            "https://firebasestorage.googleapis.com/v0/b/iti-community.appspot.com/o/nav-img.png?alt=media&token=c9c9cc3e-e650-4b5d-a56a-e7db7ba69c36";
        }
        arr.push(d);
        l = [...arr];
        setAdmins(l);
      });
    });
    return () => {
      sub1();
    };
  }, []);

  function DeleteAdmin(userId) {
    db.collection("admins").doc(userId).delete();
  }

  const fields = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "username",
      label: "User Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "branch",
      label: "Branch",
    },
    {
      key: "avatar",
      label: "Avatar",
      sorter: false,
      filter: false,
    },
    {
      key: "edit",
      label: "",
      sorter: false,
      filter: false,
    },
  ];
  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>Admins</CCardHeader>
            <CCardBody>
              <CDataTable
                items={admins}
                fields={fields}
                itemsPerPage={5}
                sorter
                columnFilter
                tableFilter
                pagination
                scopedSlots={{
                  avatar: (item, index) => {
                    return (
                      <td>
                        <CImg
                          src={item.avatar}
                          width="100px"
                          style={{ borderRadius: "50%" }}
                        />
                      </td>
                    );
                  },
                  edit: (item, index) => {
                    return (
                      <td>
                        <CButton
                          size="sm"
                          color="danger"
                          className="w-75 mx-1"
                          onClick={() => DeleteAdmin(item.id)}
                        >
                          Delete
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
};
export default ShowAdmins;
