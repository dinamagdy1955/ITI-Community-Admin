import React, { useState } from "react";
import { db, auth } from "src/firebase";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const Register = () => {
  const [admin, setAdmin] = useState({
    firstName: "",
    lastName: "",
    branch: "",
    userName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const handleForm = (e) => {
    switch (e.target.name) {
      case "firstName":
        setAdmin({
          ...admin,
          firstName: e.target.value,
        });
        break;

      case "lastName":
        setAdmin({
          ...admin,
          lastName: e.target.value,
        });
        break;
      case "branch":
        setAdmin({
          ...admin,
          branch: e.target.value,
        });
        break;
      case "userName":
        setAdmin({
          ...admin,
          userName: e.target.value,
        });
        break;
      case "email":
        setAdmin({
          ...admin,
          email: e.target.value,
        });
        break;
      case "password":
        setAdmin({
          ...admin,
          password: e.target.value,
        });
        break;
      case "re-Password":
        setAdmin({
          ...admin,
          repeatPassword: e.target.value,
        });
        break;
    }
  };
  const createAdmin = async (event) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        admin.email,
        admin.password
      );
      db.collection("admins").doc(user.uid).set({
        firstName: admin.firstName,
        lastName: admin.lastName,
        branch: admin.branch,
        userName: admin.userName,
        email: admin.email,
        password: admin.password,
        isAccepted: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={admin.firstName}
                      onChange={handleForm}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={admin.lastName}
                      onChange={handleForm}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Branch"
                      name="branch"
                      value={admin.branch}
                      onChange={handleForm}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Username"
                      name="userName"
                      value={admin.userName}
                      onChange={handleForm}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={admin.email}
                      onChange={handleForm}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={admin.password}
                      onChange={handleForm}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Repeat password"
                      name="re-Password"
                      value={admin.repeatPassword}
                      onChange={handleForm}
                    />
                  </CInputGroup>
                  <CButton color="success" block onClick={() => createAdmin()}>
                    Create Account
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
