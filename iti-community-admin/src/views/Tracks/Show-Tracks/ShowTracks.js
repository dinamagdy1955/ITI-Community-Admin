import React from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";
import Button from "react-bootstrap/Button";

export default function ShowTracks() {
  //ShowTracks()
  const usersData = [
    {
      id: 0,
      Track_Name: "John Doe",
      Manager: "2018/01/01",
      Specialization: "Guest",
      NO_Students: 50,
      Branch: "Guest",
      Total_Time: "3 month",
    },
    {
      id: 1,
      Track_Name: "Samppa Nori",
      Manager: "2018/01/01",
      Specialization: "Member",
      NO_Students: 80,
      Branch: "Guest",
      Total_Time: "3 month",
    },
    {
      id: 2,
      Track_Name: "Estavan Lykos",
      Manager: "2018/02/01",
      Specialization: "Staff",
      NO_Students: 10,
      Branch: "Guest",
      Total_Time: "6 month",
    },
    {
      id: 3,
      Track_Name: "Chetan Mohamed",
      Manager: "2018/02/01",
      Specialization: "Admin",
      NO_Students: 15,
      Branch: "Guest",
      Total_Time: "9 month",
    },
    {
      id: 4,
      Track_Name: "Derick Maximinus",
      Manager: "2018/03/01",
      Specialization: "Member",
      NO_Students: 30,
      Branch: "Guest",
      Total_Time: "3 month",
    },
    {
      id: 5,
      Track_Name: "Friderik Dávid",
      Manager: "2018/01/21",
      Specialization: "Staff",
      NO_Students: 12,
      Branch: "Guest",
      Total_Time: "9 month",
    },
    {
      id: 6,
      Track_Name: "Yiorgos Avraamu",
      Manager: "2018/01/01",
      Specialization: "Member",
      NO_Students: 13,
      Branch: "Guest",
      Total_Time: "3 month",
    },

    {
      id: 7,
      Track_Name: "Ford Prefect",
      Manager: "2001/05/25",
      Specialization: "Alien",
      NO_Students: 24,
      Branch: "Guest",
    },
  ];
  const getBadge = (NO_Students) => {
    switch (NO_Students) {
      case "Active":
        return "success";
      case "Inactive":
        return "secondary";
      case "Pending":
        return "warning";
      case "Banned":
        return "danger";
      default:
        return "primary";
    }
  };

  const fields = [
    "Track_Name",
    "Manager",
    "Specialization",
    "NO_Students",
    "Branch",
    "Total_Time",
    "Edit_Delete",
  ];

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Branches</CCardHeader>
            <CCardBody>
              <CDataTable
                items={usersData}
                fields={fields}
                hover
                striped
                bordered
                size="sm"
                itemsPerPage={10}
                pagination
                scopedSlots={{
                  NO_Students: (item) => (
                    <td>
                      <CBadge color={getBadge(item.NO_Students)}>
                        {item.NO_Students}
                      </CBadge>
                    </td>
                  ),
                }}
                scopedSlots={{
                  Edit_Delete: (item) => (
                    <td>
                      <Button variant="success">Edit</Button>{" "}
                      <Button variant="danger">Delete</Button>{" "}
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
