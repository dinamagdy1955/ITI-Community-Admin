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
} from "@coreui/react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Showjobs = () => {
  const history = useHistory();
  if (localStorage.getItem("adminToken") == undefined) history.push("/login");
  const [jobs, setJobs] = useState([]);
  let sub1;
  useEffect(() => {
    var arr = [];
    var l = [];
    sub1 = db.collection("jobs").onSnapshot((res) => {
      arr = [];
      l = [];
      setJobs([]);
      res.forEach((e) => {
        var dayPosted = new Date(e.data().postedDate * 1000).getDate();
        var monthPosted = new Date(e.data().postedDate * 1000).getMonth() + 1;
        var yearPosted =
          new Date(e.data().postedDate * 1000).getFullYear() - 1969;
        let d = {
          id: e.id,
          company_ar: e.data().company.ar,
          company_en: e.data().company.en,
          position_ar: e.data().position.ar,
          position_en: e.data().position.en,
          seniorityLevel_en: e.data().seniorityLevel.en,
          seniorityLevel_ar: e.data().seniorityLevel.ar,
          description: {
            en: e.data().description.en,
            ar: e.data().description.ar,
          },
          location: {
            en: e.data().location.en,
            ar: e.data().location.ar,
          },
          employmentType: {
            en: e.data().employmentType.en,
            ar: e.data().employmentType.ar,
          },
          worksFrom: {
            en: e.data().worksFrom.en,
            ar: e.data().worksFrom.ar,
          },
          companyLogoAvatar: e.data().companyLogoAvatar,
          postedDate: dayPosted + "-" + monthPosted + "-" + yearPosted,
        };
        if (e.closingDate != null) {
          var dayClosing = new Date(e.data().closingDate * 1000).getDate();
          var monthClosing =
            new Date(e.data().closingDate * 1000).getMonth() + 1;
          var yearClosing =
            new Date(e.data().closingDate * 1000).getFullYear() - 1969;
          d.closingDate = dayClosing + "-" + monthClosing + "-" + yearClosing;
        }
        arr.push(d);
        l = [...arr];
        setJobs(l);
      });
    });
    return () => {
      sub1();
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

  function DeleteJob(jobId) {
    db.collection("jobs").doc(jobId).delete();
  }

  const fields = [
    {
      key: "company_en",
      label: "Company Name",
    },
    {
      key: "position_en",
      label: "Position",
    },
    {
      key: "seniorityLevel_en",
      label: "Seniority Level",
    },
    { key: "postedDate", label: "Posted Date" },
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
            <CCardHeader>Jobs</CCardHeader>
            <CCardBody>
              <CDataTable
                items={jobs}
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
                      <CCollapse show={details.includes(index)}>
                        <CCardBody className="container text-left">
                          <div className="row">
                            <div className="col-3">
                              <h6>Company Name</h6>
                              <p>{item.company_en}</p>
                              <h6>Position</h6>
                              <p>{item.position_en}</p>
                              <h6>Seniority Level</h6>
                              <p>{item.seniorityLevel_en}</p>
                              <h6>Works From</h6>
                              <p>{item.worksFrom.en}</p>
                              <h6>employmentType</h6>
                              <p>{item.employmentType.en}</p>
                              <h6>Requirment Description</h6>
                              <p>{item.description.en}</p>
                            </div>
                            <div className="col-1"></div>
                            <div className="col-3 text-center">
                              {item.companyLogoAvatar === "" ? (
                                <CImg
                                  src="http://via.placeholder.com/400x400/"
                                  width="200"
                                  className="mt-1 mb-4"
                                />
                              ) : (
                                <CImg
                                  src={item.companyLogoAvatar}
                                  width="200"
                                  className="mt-1 mb-4"
                                />
                              )}
                              <h6>Posted Date</h6>
                              <p>{item.postedDate}</p>
                              <h6>Closing Date</h6>
                              <p>
                                {item.closingDate == null
                                  ? "Not specified yet ..."
                                  : item.closingDate}
                              </p>
                              <div>
                                <Link to={`/jobs/${item.id}`}>
                                  <CButton
                                    type="button"
                                    color="info"
                                    size="sm"
                                    className="w-25 mx-1"
                                  >
                                    Edit
                                  </CButton>
                                </Link>
                                <CButton
                                  type="button"
                                  size="sm"
                                  color="danger"
                                  className="w-25 mx-1"
                                  onClick={() => DeleteJob(item.id)}
                                >
                                  Delete
                                </CButton>
                              </div>
                            </div>
                            <div className="col-1"></div>
                            <div className="col-3 text-right">
                              <h6>اسم الشركة</h6>
                              <p>{item.company_ar}</p>
                              <h6>المركز الوظيفي</h6>
                              <p>{item.position_ar}</p>
                              <h6>المستوى الوظيفي</h6>
                              <p>{item.seniorityLevel_ar}</p>
                              <h6>موقع العمل</h6>
                              <p>{item.worksFrom.ar}</p>
                              <h6>نوع الدوام</h6>
                              <p>{item.employmentType.ar}</p>
                              <h6>وصف المتطلبات</h6>
                              <p>{item.description.ar}</p>
                            </div>
                          </div>
                        </CCardBody>
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
export default Showjobs;
