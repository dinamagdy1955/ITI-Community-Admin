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
  CInputFile,
  CTextarea,
  CSelect,
  CSwitch,
} from "@coreui/react";
import { db } from "src/firebase";
import { upload } from "src/firebase";

const BasicForms = () => {
  const history = useHistory();
  if (localStorage.getItem("adminToken") == undefined) history.push("/login");
  const [notspec, setNotSpec] = useState(false);
  const [progress, setprogress] = useState(100);
  const [job, setJob] = useState({
    company: {
      en: "",
      ar: "",
    },
    position: {
      en: "",
      ar: "",
    },
    seniorityLevel: {
      en: "",
      ar: "",
    },
    description: {
      en: "",
      ar: "",
    },
    location: {
      en: "",
      ar: "",
    },
    employmentType: {
      en: "fulltime",
      ar: "دوام كامل",
    },
    worksFrom: {
      en: "onsite",
      ar: "من موقع الشركة",
    },
    companyLogoAvatar: "",
    postedDate: new Date(),
    closingDate: null,
  });

  const handleForm = async (e) => {
    switch (e.target.name) {
      case "companyEn":
        setJob({
          ...job,
          company: { ...job.company, en: e.target.value },
        });
        break;
      case "positionEn":
        setJob({
          ...job,
          position: { ...job.position, en: e.target.value },
        });
        break;
      case "levelEn":
        setJob({
          ...job,
          seniorityLevel: { ...job.seniorityLevel, en: e.target.value },
        });
        break;
      case "descriptionEn":
        setJob({
          ...job,
          description: { ...job.description, en: e.target.value },
        });
        break;
      case "locationEn":
        setJob({
          ...job,
          location: { ...job.location, en: e.target.value },
        });
        break;
      case "companyAr":
        setJob({
          ...job,
          company: { ...job.company, ar: e.target.value },
        });
        break;
      case "positionAr":
        setJob({
          ...job,
          position: { ...job.position, ar: e.target.value },
        });
        break;
      case "levelAr":
        setJob({
          ...job,
          seniorityLevel: { ...job.seniorityLevel, ar: e.target.value },
        });
        break;
      case "descriptionAr":
        setJob({
          ...job,
          description: { ...job.description, ar: e.target.value },
        });
        break;
      case "locationAr":
        setJob({
          ...job,
          location: { ...job.location, ar: e.target.value },
        });
        break;
      case "employmentType":
        if (e.target.value == "fulltime")
          setJob({
            ...job,
            employmentType: { en: e.target.value, ar: "دوام كامل" },
          });
        else if (e.target.value == "parttime")
          setJob({
            ...job,
            employmentType: { en: e.target.value, ar: "دوام جزئى" },
          });
        break;
      case "worksFrom":
        if (e.target.value == "onsite")
          setJob({
            ...job,
            worksFrom: { en: e.target.value, ar: "من موقع الشركة" },
          });
        else if (e.target.value == "remotly")
          setJob({
            ...job,
            worksFrom: { en: e.target.value, ar: "عن بعد" },
          });
        break;
      case "companyLogoAvatar":
        if (e.target.files.length > 0) {
          setprogress({
            pro: 0,
            msg: "Wait To Upload Your Image",
          });
          const file = e.target.files[0];
          const storageRef = await upload.ref(`CompanyLogo/${file.name}`);
          const prog = storageRef.put(file);
          const pro =
            ((await prog).bytesTransferred / (await prog).totalBytes) * 100;
          setprogress({
            pro: pro,
            msg: "Wait To Upload Your Image",
          });
          prog.then((e) => {
            e.ref.getDownloadURL().then((url) => {
              setJob({
                ...job,
                companyLogoAvatar: url,
              });
            });
          });
        } else {
          setJob({
            ...job,
            companyLogoAvatar: "",
          });
        }
        break;
      case "closingDate":
        setJob({
          ...job,
          closingDate: e.target.value,
        });
        break;
      case "notSpecifiedYet":
        setNotSpec(notspec);
        setJob({
          ...job,
          closingDate: null,
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
        <CCol xs="12">
          <CCard>
            <CForm action="" method="post" className="form-horizontal">
              <CCardHeader className="d-flex">
                <span className="w-75">Add new Job</span>
                <span className="w-50" style={{ textAlign: "right" }}>
                  إضافة وظيفة جديدة
                </span>
              </CCardHeader>
              <CFormGroup>
                <CCardBody>
                  <CRow>
                    <CCol xs="5">
                      <CFormGroup>
                        <CLabel>Company Name</CLabel>
                        <CInput
                          name="companyEn"
                          placeholder="Enter Company Name"
                          onChange={handleForm}
                          required
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Job Position</CLabel>
                        <CInput
                          name="positionEn"
                          placeholder="Enter the position of the annonounced job"
                          onChange={handleForm}
                          required
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Seniority Level</CLabel>
                        <CInput
                          name="levelEn"
                          placeholder="Enter the seniority level of job"
                          onChange={handleForm}
                          required
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Description</CLabel>
                        <CTextarea
                          name="descriptionEn"
                          placeholder="Enter the description of job requirment"
                          rows="5"
                          onChange={handleForm}
                          required
                        ></CTextarea>
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Location</CLabel>
                        <CInput
                          name="locationEn"
                          placeholder="Enter the location of company"
                          onChange={handleForm}
                          required
                        />
                      </CFormGroup>
                    </CCol>
                    <CCol xs="2"></CCol>
                    <CCol xs="5" style={{ textAlign: "right" }}>
                      <CFormGroup>
                        <CLabel>اسم الشركة</CLabel>
                        <CInput
                          name="companyAr"
                          placeholder="ادخل اسم الشركة"
                          onChange={handleForm}
                          style={{ textAlign: "right" }}
                          required
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>المركز الوظيفي</CLabel>
                        <CInput
                          name="positionAr"
                          placeholder="ادخل المركز الوظيفي للوظيفة المتاحة"
                          onChange={handleForm}
                          style={{ textAlign: "right" }}
                          required
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>المستوى الوظيفي</CLabel>
                        <CInput
                          name="levelAr"
                          placeholder="ادخل المستوى الوظيفي للوظيفة المتاحة"
                          onChange={handleForm}
                          style={{ textAlign: "right" }}
                          required
                        />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>وصف متطلبات الوظيفة</CLabel>
                        <CTextarea
                          name="descriptionAr"
                          placeholder="ادخل متطلبات الوظيفة"
                          rows="5"
                          onChange={handleForm}
                          style={{ textAlign: "right" }}
                          required
                        ></CTextarea>
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>موقع مقر الشركة</CLabel>
                        <CInput
                          name="locationAr"
                          placeholder="ادخل موقع مقر الشركة"
                          onChange={handleForm}
                          style={{ textAlign: "right" }}
                          required
                        />
                      </CFormGroup>
                    </CCol>
                  </CRow>
                </CCardBody>
                <CCardFooter>
                  <CRow>
                    <CCol>
                      <CFormGroup>
                        <CLabel>Employment Type</CLabel>
                        <CSelect
                          custom
                          size="md"
                          name="employmentType"
                          onChange={handleForm}
                        >
                          <option value="fulltime">FullTime</option>
                          <option value="parttime">PartTime</option>
                        </CSelect>
                      </CFormGroup>
                    </CCol>
                    <CCol xs="2"></CCol>
                    <CCol>
                      <CFormGroup>
                        <CLabel>Works From</CLabel>
                        <CSelect
                          custom
                          size="md"
                          name="worksFrom"
                          onChange={handleForm}
                        >
                          <option value="onsite">On site</option>
                          <option value="remotly">Remotly</option>
                        </CSelect>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol>
                      <CFormGroup>
                        <CLabel>Company Logo Avatar</CLabel>
                        <CInputFile
                          id="img"
                          name="companyLogoAvatar"
                          onChange={handleForm}
                        />
                      </CFormGroup>
                    </CCol>
                    <CCol xs="2"></CCol>
                    <CCol>
                      <CLabel>Closing Date</CLabel>
                      <CRow>
                        <CCol>
                          <CInput
                            type="date"
                            name="closingDate"
                            placeholder="date"
                            disabled={notspec}
                            onChange={handleForm}
                          />
                        </CCol>
                        <CCol>
                          <CSwitch
                            name="notSpecifiedYet"
                            className="mr-2 mt-2"
                            color="primary"
                            onChange={handleForm}
                          />
                          <CLabel>Not specified yet</CLabel>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                </CCardFooter>
                <CCardFooter className="d-flex justify-content-center">
                  <CButton
                    id="addRow"
                    type="button"
                    color="info"
                    size="sm"
                    disabled={progress.pro < 100 ? true : false}
                    className="w-25 mx-1"
                    onClick={AddJob}
                  >
                    {progress.pro < 100 ? progress.msg : "Add"}
                  </CButton>
                  <CButton
                    type="reset"
                    size="sm"
                    color="danger"
                    className="w-25 mx-1"
                  >
                    Reset
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
