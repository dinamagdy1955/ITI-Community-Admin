import React, { useState, useEffect } from "react";
import { db } from "src/firebase";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const history = useHistory();
  if (localStorage.getItem("adminToken") == undefined) history.push("/login");
  const [users, setUsers] = useState(0);
  const [groups, setGroups] = useState(0);
  const [tracks, setTracks] = useState(0);
  const [branches, setBranches] = useState(0);
  const [jobs, setJobs] = useState(0);
  const [admins, setAdmins] = useState(0);
  let sub1, sub2, sub3, sub4, sub5, sub6;
  useEffect(() => {
    sub1 = db.collection("users-basics").onSnapshot((res) => {
      setUsers(res.size);
    });
    sub2 = db.collection("Groups2").onSnapshot((res) => {
      setGroups(res.size);
    });
    sub3 = db.collection("Tracks").onSnapshot((res) => {
      setTracks(res.size);
    });
    sub4 = db.collection("Branches").onSnapshot((res) => {
      setBranches(res.size);
    });
    sub5 = db.collection("jobs").onSnapshot((res) => {
      setJobs(res.size);
    });
    sub6 = db.collection("admins").onSnapshot((res) => {
      setAdmins(res.size);
    });
    return () => {
      sub1();
      sub2();
      sub3();
      sub4();
      sub5();
      sub6();
    };
  }, []);
  return (
    <>
      <CRow>
        <CCol xs="12" sm="6" md="4">
          <Link
            to="/users/show"
            style={{ textDecorationLine: "none", color: "black" }}
          >
            <CCard color="gradient-success" className="text-white text-center">
              <CCardHeader className="font-weight-bolder">
                <h2>Users</h2>
              </CCardHeader>
              <CCardBody className="fs-6">
                <h3>{users}</h3>
              </CCardBody>
            </CCard>
          </Link>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <Link
            to="/groups/All"
            style={{ textDecorationLine: "none", color: "black" }}
          >
            <CCard
              color="gradient-secondary"
              className="text-black text-center fs-2"
            >
              <CCardHeader className="font-weight-bolder">
                <h2>Groups</h2>
              </CCardHeader>
              <CCardBody className="fs-6">
                <h3>{groups}</h3>
              </CCardBody>
            </CCard>
          </Link>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <Link
            to="/tracks/Show-Tracks"
            style={{ textDecorationLine: "none", color: "black" }}
          >
            <CCard color="gradient-warning" className="text-black text-center">
              <CCardHeader className="font-weight-bolder">
                <h2>Tracks</h2>
              </CCardHeader>
              <CCardBody className="fs-6">
                <h3>{tracks}</h3>
              </CCardBody>
            </CCard>
          </Link>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <Link
            to="/branches/Show-All"
            style={{ textDecorationLine: "none", color: "white" }}
          >
            <CCard color="gradient-danger" className="text-white text-center">
              <CCardHeader className="font-weight-bolder">
                <h2>Branches</h2>
              </CCardHeader>
              <CCardBody className="fs-6">
                <h3>{branches}</h3>
              </CCardBody>
            </CCard>
          </Link>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <Link
            to="/jobs/showjobs"
            style={{ textDecorationLine: "none", color: "white" }}
          >
            <CCard color="gradient-dark" className="text-white text-center">
              <CCardHeader className="font-weight-bolder">
                <h2>Jobs</h2>
              </CCardHeader>
              <CCardBody className="fs-6">
                <h3>{jobs}</h3>
              </CCardBody>
            </CCard>
          </Link>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <Link
            to="/admins/All"
            style={{ textDecorationLine: "none", color: "white" }}
          >
            <CCard color="gradient-info" className="text-white text-center">
              <CCardHeader className="font-weight-bolder">
                <h2>Admins</h2>
              </CCardHeader>
              <CCardBody className="fs-6">
                <h3>{admins}</h3>
              </CCardBody>
            </CCard>
          </Link>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
