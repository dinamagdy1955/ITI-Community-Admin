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
  CInputFile,
  CModal,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import { FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router";
import { upload } from "src/firebase";
const Register = () => {
  const history = useHistory();
  const [progress, setprogress] = useState(100);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [admin, setAdmin] = useState({
    firstName: "",
    lastName: "",
    branch: "",
    userName: "",
    email: "",
    password: "",
    repeatPassword: "",
    avatar: "",
  });
  const handleForm = async (e) => {
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
      case "avatar":
        if (e.target.files.length > 0) {
          setprogress({
            pro: 0,
            msg: "Wait To Upload Your Image",
          });
          const file = e.target.files[0];
          const storageRef = await upload.ref(`AdminsAvatar/${file.name}`);
          const prog = storageRef.put(file);
          const pro =
            ((await prog).bytesTransferred / (await prog).totalBytes) * 100;
          setprogress({
            pro: pro,
            msg: "Wait To Upload Your Image",
          });
          prog.then((e) => {
            e.ref.getDownloadURL().then((url) => {
              setAdmin({
                ...admin,
                avatar: url,
              });
            });
          });
        } else {
          setAdmin({
            ...admin,
            avatar: "",
          });
        }
        break;
    }
  };
  const createAdmin = async (event) => {
    if (admin.password == admin.repeatPassword) {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          admin.email,
          admin.password
        );
        await db.collection("admins").doc(user.uid).set({
          firstName: admin.firstName,
          lastName: admin.lastName,
          branch: admin.branch,
          userName: admin.userName,
          email: admin.email,
          password: admin.password,
          avatar: admin.avatar,
        });
        setDone(!done);
      } catch (error) {
        console.log(error);
        setError(!error);
      }
    } else {
      setError(!error);
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
                      // value={admin.firstName}
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
                      // value={admin.lastName}
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
                      // value={admin.branch}
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
                      // value={admin.userName}
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
                      // value={admin.email}
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
                      // value={admin.password}
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
                      // value={admin.repeatPassword}
                      onChange={handleForm}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputFile
                      name="avatar"
                      className="pt-2"
                      onChange={handleForm}
                    />
                  </CInputGroup>
                  <CButton
                    color="success"
                    disabled={progress.pro < 100 ? true : false}
                    block
                    onClick={() => createAdmin()}
                  >
                    {progress.pro < 100 ? progress.msg : "Create Admin Account"}
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CModal show={done} onClose={() => setDone(!done)} size="">
          <CModalBody className="text-center">
            <FaCheckCircle
              className="mt-5 mb-5"
              style={{ color: "green", fontSize: "75px" }}
            />
            <p style={{ fontSize: "20px" }}>Admin registered successfully</p>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="dark"
              onClick={() => {
                setDone(!done);
                history.push("/");
              }}
            >
              Close
            </CButton>
          </CModalFooter>
        </CModal>
        <CModal show={error} onClose={() => setError(!error)} size="">
          <CModalBody className="text-center" style={{ fontSize: "40px" }}>
            <FaTimesCircle style={{ color: "red" }} />
            <p style={{ fontSize: "20px" }}>Admin registeration occurs error</p>
            <ul
              className="ml-2"
              style={{ listStyle: "none", fontSize: "16px", textAlign: "left" }}
            >
              <li>May be email already registered.</li>
              <li>May be password you entered is weak.</li>
            </ul>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="dark"
              onClick={() => {
                setError(!error);
              }}
            >
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      </CContainer>
    </div>
  );
};

export default Register;
