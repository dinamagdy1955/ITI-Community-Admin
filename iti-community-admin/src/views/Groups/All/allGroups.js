import {
  CBadge,
  CButton,
  CCardBody,
  CCollapse,
  CDataTable,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  delGroup,
  delUser,
  editUser,
  getGroupData,
  getUsers,
} from "src/Services/GroupServices";
import { useHistory } from "react-router";
export default function AllGroups() {
  const history = useHistory();
  if (localStorage.getItem("adminToken") === undefined) history.push("/login");

  const [group, setGroup] = useState([]);

  var users = [];
  var sub;
  var sub2;
  useEffect(() => {
    sub = getGroupData().onSnapshot((res) => {
      var arr = [];
      var data = [];
      res.forEach((e) => {
        data.push({
          id: e.id,
          data: e.data(),
        });
      });

      data.map((g) => {
        var day = new Date(g.data.CreatedDate * 1000).getDate();
        var month = new Date(g.data.CreatedDate * 1000).getMonth() + 1;
        var year = new Date(g.data.CreatedDate * 1000).getFullYear() - 1969;
        sub2 = getUsers(g.id).onSnapshot((res) => {
          let flag = false;
          users = [];
          res.forEach((e) => {
            users.push({
              id: e.id,
              ...e.data(),
            });
          });
          arr.find((e) => {
            if (e.id == g.id) {
              flag = true;
              e.id = g.id;
              e.Name = g.data.Name;
              e.About = g.data.Description;
              e.URL = g.data.Img;
              e.CreatedAt = day + "-" + month + "-" + year;
              e.Specialty = g.data.Specialty;
              e.Users = users;
            }
          });
          if (!flag) {
            arr.push({
              id: g.id,
              Name: g.data.Name,
              About: g.data.Description,
              URL: g.data.Img,
              CreatedAt: day + "-" + month + "-" + year,
              Specialty: g.data.Specialty,
              Users: users,
            });
          }
          let viewData = [...arr];
          setGroup(viewData);
          return true;
        });
      });
    });
    return () => {
      sub();
      // sub2();
    };
  }, []);

  const [details, setDetails] = useState([]);

  const [large, setLarge] = useState(false);

  const toggleDetails = (index) => {
    const Position = details.indexOf(index);
    let newDetails = details.slice();
    if (Position !== -1) {
      newDetails.splice(Position, 1);
    } else {
      newDetails = [index];
    }
    setDetails(newDetails);
  };

  const fields = [
    { key: "Name", _style: { width: "40%" } },
    "Specialty",
    "CreatedAt",
    // { key: "membersNo", _style: { width: "20%" } },
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

  function deleteUser(id, user) {
    delUser(id, user);
  }

  function Roles(id, user, role) {
    editUser(id, user, role);
  }

  const [getRole, setRole] = useState({ Role: "All", val: 3 });
  function showRole(e) {
    switch (e.target.value) {
      case "3":
        setRole({ Role: "All", val: 3 });
        break;
      case "0":
        setRole({ Role: "Subscriber", val: 0 });
        break;
      case "1":
        setRole({ Role: "Admin", val: 1 });
        break;
      case "2":
        setRole({ Role: "Member", val: 2 });
        break;
      default:
        break;
    }
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
                  <div className="row text-left">
                    <div className="col-6">
                      <h6>Description :</h6>
                      <p className="text-muted">{item.About}</p>
                    </div>
                    <div className="col-6">
                      <h6>Members :</h6>
                      <CListGroup className="pb-2">
                        {item.Users.length <= 4 ? (
                          item.Users.map((e, i) =>
                            <CListGroupItem
                              className="justify-content-between"
                              key={i}
                            >
                              {e.firstName} {e.lastName}
                              <span className="float-right  p-0">
                                <CTooltip content="Make Admin">

                                  {e.Role == 1 ? (
                                    <CButton
                                      disabled
                                      className="p-0 text-success mx-3"
                                      onClick={() => Roles(item.id, e.id, "admin")}
                                    >
                                      <CIcon name="cil-user-follow" className="p-0" />
                                    </CButton>
                                  ) : (
                                    <CButton
                                      className="p-0 text-success mx-3"
                                      onClick={() => Roles(item.id, e.id, "admin")}
                                    >
                                      <CIcon name="cil-user-follow" className="p-0" />
                                    </CButton>
                                  )}

                                </CTooltip>
                                <CTooltip content="Make Member">
                                  {e.Role == 2 ? (
                                    <CButton
                                      disabled
                                      className="p-0 text-primary mx-3"
                                      onClick={() => Roles(item.id, e.id, "member")}
                                    >
                                      <CIcon name="cil-user" className="p-0" />
                                    </CButton>
                                  ) : (
                                    <CButton
                                      className="p-0 text-primary mx-3"
                                      onClick={() => Roles(item.id, e.id, "member")}
                                    >
                                      <CIcon name="cil-user" className="p-0" />
                                    </CButton>
                                  )}
                                </CTooltip>
                                <CTooltip content="Delete">
                                  <CButton
                                    className="p-0 text-danger mx-3"
                                    onClick={() => deleteUser(item.id, e.id)}
                                  >
                                    <CIcon name="cil-trash" className="p-0" />
                                  </CButton>
                                </CTooltip>

                              </span>
                            </CListGroupItem>
                          )
                        ) : (
                          <CListGroupItem
                            className="justify-content-between text-center bg-primary p-0"
                          >
                            <CButton
                              onClick={() => setLarge(!large)}
                              className="text-white btn-block"
                            >
                              Show All Members
                          </CButton>
                          </CListGroupItem>
                        )}
                      </CListGroup>
                    </div>
                  </div>
                  <CModal
                    show={large}
                    onClose={() => setLarge(!large)}
                    size="lg"
                  >
                    <CModalHeader closeButton>
                      <CModalTitle>{item.Name}</CModalTitle>
                    </CModalHeader>
                    <CModalBody className="text-left">
                      <select
                        className="form-control form-select mb-2"
                        aria-label="Default select example"
                        onChange={showRole}
                      >
                        <option value="3">Select Role</option>
                        <option value="1">Admins</option>
                        <option value="2">Members</option>
                        <option value="0">Subscribers</option>
                      </select>
                      {item.Users.map((e, i) => (
                        <div className="" key={i}>
                          {getRole.val == 3 ? (
                            <div className="row py-2">
                              <div className="col-2 d-flex align-items-center">
                                <img
                                  src={e.avatar}
                                  className="img-thumbnail rounded-circle"
                                  width="80"
                                />
                              </div>
                              <div className="col-7 d-flex align-items-center">
                                {e.Role == 1 && (
                                  <span>
                                    {e.firstName} {e.lastName}{" "}
                                    <CBadge color="success">Admin</CBadge>
                                  </span>
                                )}
                                {e.Role == 2 && (
                                  <span>
                                    {e.firstName} {e.lastName}{" "}
                                    <CBadge color="info">Member</CBadge>
                                  </span>
                                )}
                                {e.Role == 0 && (
                                  <span>
                                    {e.firstName} {e.lastName}{" "}
                                    <CBadge color="secondary">
                                      Subscriber
                                    </CBadge>
                                  </span>
                                )}
                              </div>
                              <div className="col-3 text-right d-flex align-items-center justify-content-end">
                                <CDropdown className="m-1">
                                  <CDropdownToggle>Action</CDropdownToggle>
                                  <CDropdownMenu>
                                    <CDropdownItem
                                      onClick={() =>
                                        Roles(item.id, e.id, "admin")
                                      }
                                    >
                                      Make Admin
                                    </CDropdownItem>
                                    <CDropdownItem
                                      onClick={() =>
                                        Roles(item.id, e.id, "member")
                                      }
                                    >
                                      Make Member
                                    </CDropdownItem>
                                    <CDropdownItem
                                      onClick={() =>
                                        Roles(item.id, e.id, "subs")
                                      }
                                    >
                                      Make Subscriber
                                    </CDropdownItem>
                                    <CDropdownDivider />
                                    <CDropdownItem
                                      onClick={() => deleteUser(item.id, e.id)}
                                    >
                                      Delete
                                    </CDropdownItem>
                                  </CDropdownMenu>
                                </CDropdown>
                              </div>
                            </div>
                          ) : (
                            e.Role == getRole.val && (
                              <div className="row py-2">
                                <div className="col-2 d-flex align-items-center">
                                  <img
                                    src={e.avatar}
                                    className="img-thumbnail rounded-circle"
                                    width="80"
                                  />
                                </div>
                                <div className="col-7 d-flex align-items-center">
                                  <span>
                                    {e.firstName} {e.lastName}{" "}
                                    <CBadge color="success">
                                      {getRole.Role}
                                    </CBadge>
                                  </span>
                                </div>
                                <div className="col-3 text-right d-flex align-items-center justify-content-end">
                                  <CDropdown className="m-1">
                                    <CDropdownToggle>Action</CDropdownToggle>
                                    <CDropdownMenu>
                                      <CDropdownItem
                                        onClick={() =>
                                          Roles(item.id, e.id, "admin")
                                        }
                                      >
                                        Make Admin
                                      </CDropdownItem>
                                      <CDropdownItem
                                        onClick={() =>
                                          Roles(item.id, e.id, "member")
                                        }
                                      >
                                        Make Member
                                      </CDropdownItem>
                                      <CDropdownItem
                                        onClick={() =>
                                          Roles(item.id, e.id, "subs")
                                        }
                                      >
                                        Make Subscriber
                                      </CDropdownItem>
                                      <CDropdownDivider />
                                      <CDropdownItem
                                        onClick={() =>
                                          deleteUser(item.id, e.id)
                                        }
                                      >
                                        Delete
                                      </CDropdownItem>
                                    </CDropdownMenu>
                                  </CDropdown>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      ))}
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="danger" size="sm" onClick={() => setLarge(!large)}>
                        Close
                      </CButton>
                    </CModalFooter>
                  </CModal>
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
