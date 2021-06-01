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
  CCollapse,
  CImg,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const ShowUsers = () => {
  const history = useHistory();
  if (localStorage.getItem("adminToken") == undefined) history.push("/login");
  const [users, setUsers] = useState([]);
  const [large, setLarge] = useState(false);
  let sub1, sub2, sub3;
  useEffect(() => {
    var arr = [];
    var l = [];
    sub1 = db.collection("users-details").onSnapshot((res) => {
      arr = [];
      l = [];
      setUsers([]);
      res.forEach((e) => {
        let d = {
          id: e.id,
          nationalID: e.data().nationalID,
          name: e.data().firstName + " " + e.data().lastName,
          avatar: e.data().avatar,
          avatarCover: e.data().avatarCover,
          jobTitle: e.data().jobTitle,
          about: e.data().about,
          experiences: e.data().experiences,
        };
        sub2 = db
          .collection("Branches")
          .doc(e.data().branch)
          .onSnapshot((bran) => {
            if (bran.data() != undefined) d.branch = bran.data().name;
            else d.branch = "";
            sub3 = db
              .collection("Tracks")
              .doc(e.data().track)
              .onSnapshot((tra) => {
                if (tra.data() != undefined) d.track = tra.data().name;
                else d.track = "";
                arr.push(d);
                l = [...arr];
                setUsers(l);
              });
          });
      });
    });
    return () => {
      sub1();
      sub2();
      sub3();
    };
  }, []);
  const [details, setDetails] = useState([]);
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

  function DeleteUser(userId) {
    db.collection("users-basics").doc(userId).delete();
    db.collection("users-details").doc(userId).delete();
  }

  const fields = [
    {
      key: "nationalID",
      label: "National ID",
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: "jobTitle",
      label: "Job Title",
    },
    {
      key: "branch",
      label: "Branch",
    },
    {
      key: "track",
      label: "Track",
    },
    ,
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];
  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>Users</CCardHeader>
            <CCardBody>
              <CDataTable
                items={users}
                fields={fields}
                itemsPerPage={5}
                sorter
                columnFilter
                tableFilter
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
                      <CCollapse key={item.id} show={details.includes(index)}>
                        <CCardBody className="container text-left">
                          <div className="row">
                            <div className="col-3">
                              <h6>Name</h6>
                              <p>{item.name}</p>
                              <h6>Job Title</h6>
                              <>
                                {item.jobTitle == "" ? (
                                  <>
                                    <CImg
                                      src="https://firebasestorage.googleapis.com/v0/b/iti-community.appspot.com/o/job-clipart-clipart-transparent-background-4.png?alt=media&token=49c86152-f3c0-4bbb-bc03-524c9315e62c"
                                      width="100"
                                      style={{
                                        borderRadius: "50%",
                                        display: "block",
                                        margin: "auto",
                                      }}
                                    />
                                    <p>
                                      He/She don't specify Job Title field !!!
                                    </p>
                                  </>
                                ) : (
                                  item.jobTitle
                                )}
                              </>
                              <h6>About</h6>
                              <div>
                                {item.about == "" ? (
                                  <>
                                    <CImg
                                      src="https://firebasestorage.googleapis.com/v0/b/iti-community.appspot.com/o/UsersProfileImages%2F112-1120219_goal-clipart-know-yourself-myself-clipart.png?alt=media&token=a494f378-3770-4ac8-8b31-c33fac8ca15d"
                                      width="100"
                                      style={{
                                        borderRadius: "50%",
                                        display: "block",
                                        margin: "auto",
                                      }}
                                    />
                                    <p>He/She don't specify about field !!!</p>
                                  </>
                                ) : (
                                  item.about
                                )}
                              </div>
                            </div>
                            <div className="col-1"></div>
                            <div className="col-3 text-center">
                              <h6>Avatar</h6>
                              <CImg
                                src={item.avatar}
                                width="200"
                                height="200"
                                className="mt-1 mb-4"
                                style={{ borderRadius: "50%" }}
                              />
                              <div>
                                {/* <Link to={`/users/${item.id}`}>
                                  <CButton
                                    type="button"
                                    color="success"
                                    size="sm"
                                    className="w-25 mx-1"
                                  >
                                    Edit
                                  </CButton>
                                </Link> */}
                                <CButton
                                  type="button"
                                  size="sm"
                                  color="danger"
                                  className="w-50 mx-1"
                                  onClick={() => DeleteUser(item.id)}
                                >
                                  Delete User Account
                                </CButton>
                              </div>
                            </div>
                            <div className="col-1"></div>
                            <div className="col-3 text-center">
                              <h6>Avatar Cover</h6>
                              <CImg
                                src={item.avatarCover}
                                width="200"
                                height="200"
                                className="mt-1 mb-4"
                                style={{ borderRadius: "50%" }}
                              />
                              <CButton
                                type="button"
                                size="sm"
                                color="dark"
                                className="w-50 mx-1"
                                onClick={() => setLarge(!large)}
                              >
                                Show Experiences
                              </CButton>
                            </div>
                          </div>
                        </CCardBody>
                        <CModal
                          show={large}
                          onClose={() => setLarge(!large)}
                          size="lg"
                        >
                          <CModalHeader closeButton>
                            <CModalTitle>{item.name} Data</CModalTitle>
                          </CModalHeader>
                          <CModalBody className="text-left">
                            {item.experiences.length <= 0 ? (
                              <>
                                <CImg
                                  src="https://firebasestorage.googleapis.com/v0/b/iti-community.appspot.com/o/UsersProfileImages%2F221-2211998_contract-clipart-hired-experience-vector.png?alt=media&token=e5b75d3a-93d3-4b12-a3a9-da883f1836f7"
                                  width="200"
                                  style={{
                                    borderRadius: "50%",
                                    display: "block",
                                    margin: "auto",
                                  }}
                                />
                                <p
                                  style={{
                                    fontSize: "20px",
                                    textAlign: "center",
                                  }}
                                >
                                  He/She don't have any experiences !!!
                                </p>
                              </>
                            ) : (
                              item.experiences.map((e, key) => {
                                return (
                                  <div key={e.id}>
                                    <div className="d-flex">
                                      <div>
                                        <CImg
                                          src="https://firebasestorage.googleapis.com/v0/b/iti-community.appspot.com/o/UsersProfileImages%2Fistockphoto-915109728-612x612.jpg?alt=media&token=211eb9bc-9146-40a7-9778-c1da2b7758e9"
                                          width="100"
                                        />
                                      </div>
                                      <div>
                                        <h6>Company Name</h6>
                                        <p>{e.companyName}</p>
                                        <h6>Location</h6>
                                        <p>{e.location}</p>
                                        <h6>Degree</h6>
                                        <p>{e.degree}</p>
                                        <h6>Period of Time</h6>
                                        <p>
                                          from {e.from} to {e.to}
                                        </p>
                                        <h6>Description</h6>
                                        <p>e.description</p>
                                      </div>
                                    </div>

                                    <hr />
                                  </div>
                                );
                              })
                            )}
                          </CModalBody>
                          <CModalFooter>
                            <CButton
                              color="dark"
                              onClick={() => setLarge(!large)}
                            >
                              Close
                            </CButton>
                          </CModalFooter>
                        </CModal>
                      </CCollapse>
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
export default ShowUsers;
