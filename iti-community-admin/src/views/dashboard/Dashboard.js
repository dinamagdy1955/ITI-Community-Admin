import React, { useState, useEffect } from "react";
import { db } from "src/firebase";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { useHistory } from "react-router";
const Dashboard = () => {
  const history = useHistory();
  if (localStorage.getItem("adminToken") == undefined) history.push("/login");
  const [users, setUsers] = useState(0);
  const [groups, setGroups] = useState(0);
  const [tracks, setTracks] = useState(0);
  const [branches, setBranches] = useState(0);
  const [jobs, setJobs] = useState(0);
  useEffect(() => {
    db.collection("users-basics").onSnapshot((res) => {
      setUsers(res.size);
    });
    db.collection("Groups").onSnapshot((res) => {
      setGroups(res.size);
    });
    db.collection("Tracks").onSnapshot((res) => {
      setTracks(res.size);
    });
    db.collection("Branches").onSnapshot((res) => {
      setBranches(res.size);
    });
    db.collection("jobs").onSnapshot((res) => {
      setJobs(res.size);
    });
  }, []);
  return (
    <>
      <CRow>
        <CCol xs="12" sm="6" md="4">
          <CCard color="gradient-success" className="text-white text-center">
            <CCardHeader className="font-weight-bolder">
              <h2>Users</h2>
            </CCardHeader>
            <CCardBody className="fs-6">
              <h3>{users}</h3>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
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
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard color="gradient-warning" className="text-black text-center">
            <CCardHeader className="font-weight-bolder">
              <h2>Tracks</h2>
            </CCardHeader>
            <CCardBody className="fs-6">
              <h3>{tracks}</h3>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard color="gradient-danger" className="text-white text-center">
            <CCardHeader className="font-weight-bolder">
              <h2>Branches</h2>
            </CCardHeader>
            <CCardBody className="fs-6">
              <h3>{branches}</h3>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6" md="4">
          <CCard color="gradient-primary" className="text-white text-center">
            <CCardHeader className="font-weight-bolder">
              <h2>Jobs</h2>
            </CCardHeader>
            <CCardBody className="fs-6">
              <h3>{jobs}</h3>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
