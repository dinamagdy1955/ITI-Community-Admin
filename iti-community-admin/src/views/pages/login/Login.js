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
  CImg,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import { auth } from "src/firebase";
import CIcon from "@coreui/icons-react";
const Login = () => {
  const history = useHistory();
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const handleForm = (e) => {
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
      await auth
        .signInWithEmailAndPassword(admin.email, admin.password)
        .then((res) => {
          localStorage.setItem("adminToken", res.user.refreshToken);
          history.push("/dashboard");
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
                    <CImg
                      src="https://firebasestorage.googleapis.com/v0/b/iti-community.appspot.com/o/368-3682543_data-security-icon-emblem-clipart.png?alt=media&token=76162551-5360-4f69-a9f5-e4cdaea0d505"
                      width="150"
                    />
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
