import React, { useState, useEffect } from "react";
import { db } from "src/firebase";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";
import { useHistory } from "react-router";
const fields = [
  "company",
  "position",
  "postedDate",
  "level",
  "description",
  "status",
];

const Showjobs = () => {
  const history = useHistory();
  if (localStorage.getItem("adminToken") == undefined) history.push("/login");
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    var arr = [];
    var l = [];
    db.collection("jobs").onSnapshot((res) => {
      arr = [];
      l = [];
      setJobs([]);
      res.forEach((e) => {
        var day = new Date(e.data().postedDate * 1000).getDate();
        var month = new Date(e.data().postedDate * 1000).getMonth() + 1;
        var year = new Date(e.data().postedDate * 1000).getFullYear() - 1969;
        let d = {
          id: e.id,
          company: e.data().company,
          position: e.data().position,
          postedDate: day + "-" + month + "-" + year,
          level: e.data().level,
          description: e.data().description,
          status: e.data().status,
        };
        arr.push(d);
        l = [...arr];
        setJobs(l);
      });
    });
  }, []);
  const fields = [
    "company",
    "position",
    "postedDate",
    "level",
    "description",
    "status",
  ];
  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>Jobs</CCardHeader>
            <CCardBody>
              <CDataTable
                items={jobs}
                fields={fields}
                itemsPerPage={5}
                pagination
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};
export default Showjobs;
