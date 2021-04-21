import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import { db, auth } from "src/firebase";
import CIcon from "@coreui/icons-react";

const Login = () => {
  const history = useHistory();
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const handleForm = (e) => {
    console.log(e.target.value, e.target.name);
    switch (e.target.name) {
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
    }
  };
  const Login = async (event) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(
        admin.email,
        admin.password
      );
      db.collection("admins")
        .doc(user.uid)
        .get()
        .then((res) => {
          if (res.data() != undefined) {
            if (res.data().isAccepted) {
              localStorage.setItem("adminUid", user.uid);
              localStorage.setItem("adminToken", user.refreshToken);
              history.push("/");
            } else {
              alert("Your account is not accepted to login");
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={admin.email}
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
                        placeholder="Password"
                        name="password"
                        value={admin.password}
                        onChange={handleForm}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={() => Login()}
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        {/* <CButton color="link" className="px-0">Forgot password?</CButton> */}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    {/* <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link> */}
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
