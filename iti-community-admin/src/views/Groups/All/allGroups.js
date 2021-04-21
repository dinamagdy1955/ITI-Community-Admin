import { CButton, CCardBody, CCollapse, CDataTable, CImg } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { delGroup, getGroupData } from "src/Services/GroupServices";
import { useHistory } from "react-router";
export default function AllGroups() {
  const history = useHistory();
  if (localStorage.getItem("adminToken") == undefined) history.push("/login");
  const [group, setGroup] = useState([]);

  useEffect(() => {
    getGroupData().onSnapshot((res) => {
      var arr = [];
      var data = [];
      res.forEach((e) => {
        data.push({
          id: e.id,
          data: e.data(),
        });
      });

      data.map((g) => {
        var day = new Date(g.data.createdDate * 1000).getDate();
        var month = new Date(g.data.createdDate * 1000).getMonth();
        var year = new Date(g.data.createdDate * 1000).getFullYear() - 1969;
        arr.push({
          id: g.id,
          Name: g.data.Name,
          About: g.data.About,
          membersNo: g.data.members.length,
          members: g.data.members,
          URL: g.data.ImgURL,
          CreatedAt: day + "-" + month + "-" + year,
        });
        let viewData = [...arr];
        setGroup(viewData);
        return true;
      });
    });
  }, []);

  const [details, setDetails] = useState([]);

  const toggleDetails = (index) => {
    const Position = details.indexOf(index);
    let newDetails = details.slice();
    if (Position !== -1) {
      newDetails.splice(Position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const fields = [
    { key: "Name", _style: { width: "40%" } },
    "CreatedAt",
    { key: "membersNo", _style: { width: "20%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  function deleteGroup(id) {
    delGroup(id);
  }

  return (
    <>
      <CDataTable
        items={group}
        fields={fields}
        columnFilter
        tableFilter
        itemsPerPageSelect
        itemsPerPage={5}
        hover
        sorter
        border
        addTableClasses="CustomTable"
        pagination
        scopedSlots={{
          show_details: (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(index);
                  }}
                >
                  {details.includes(index) ? "Hide" : "Show"}
                </CButton>
              </td>
            );
          },
          details: (item, index) => {
            return (
              <CCollapse show={details.includes(index)}>
                <CCardBody className="container text-center">
                  {item.URL === "" ? (
                    <CImg
                      src="http://via.placeholder.com/400x400/"
                      width="400"
                      className="mb-2"
                    />
                  ) : (
                    <CImg src={item.URL} width="400" className="mb-2" />
                  )}
                  <h6>About This Group:</h6>
                  <p className="text-muted">{item.About}</p>
                  <Link to={`/Groups/${item.id}`}>
                    <CButton size="sm" color="info">
                      Edit
                    </CButton>
                  </Link>
                  <CButton
                    size="sm"
                    color="danger"
                    className="ml-1"
                    onClick={() => deleteGroup(item.id)}
                  >
                    Delete
                  </CButton>
                </CCardBody>
              </CCollapse>
            );
          },
        }}
      />
    </>
  );
}
