import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { db } from "src/firebase";

const BasicForms = () => {
  const history = useHistory();
  if (localStorage.getItem("adminToken") == undefined) history.push("/login");
  const [job, setJob] = useState({
    company: "ITI",
    position: "",
    postedDate: new Date(),
    level: "",
    description: "",
    status: "",
  });

  const handleForm = (e) => {
    switch (e.target.name) {
      case "position":
        setJob({
          ...job,
          position: e.target.value,
        });
        break;

      case "level":
        setJob({
          ...job,
          level: e.target.value,
        });
        break;
      case "description":
        setJob({
          ...job,
          description: e.target.value,
        });
        break;
      case "status":
        setJob({
          ...job,
          status: e.target.value,
        });
        break;
    }
  };
  function AddJob() {
    db.collection("jobs").doc().set(job);
    history.push("/jobs/showjobs");
  }
  return (
    <>
      <CRow>
        <CCol xs="12" sm="6">
          <CCard>
            <CForm action="" method="post" className="form-horizontal">
              <CFormGroup>
                <CCardHeader>Add a Job</CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs="12">
                      <CFormGroup>
                        <CLabel htmlFor="name">Position</CLabel>
                        <CInput
                          name="position"
                          placeholder="Enter the position of the annonounced job"
                          onChange={handleForm}
                          required
                        />
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="12">
                      <CFormGroup>
                        <CLabel htmlFor="name">Level</CLabel>
                        <CInput
                          name="level"
                          placeholder="Enter the position level"
                          onChange={handleForm}
                          required
                        />
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="12">
                      <CFormGroup>
                        <CLabel htmlFor="name">Description</CLabel>
                        <CInput
                          name="description"
                          placeholder="Enter the description"
                          onChange={handleForm}
                          required
                        />
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="12">
                      <CFormGroup>
                        <CLabel htmlFor="name">Status</CLabel>
                        <CInput
                          name="status"
                          placeholder="Enter the job status"
                          onChange={handleForm}
                          required
                        />
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCardBody>
                <CCardFooter>
                  <CButton size="sm" color="success" onClick={() => AddJob()}>
                    <CIcon name="cil-scrubber" /> Submit
                  </CButton>
                  <CButton type="reset" size="sm" color="danger">
                    <CIcon name="cil-ban" /> Reset
                  </CButton>
                </CCardFooter>
              </CFormGroup>
            </CForm>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};
export default BasicForms;
