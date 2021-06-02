import React, { useEffect, useState } from "react";
import {
  CButton,
  CCardFooter,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputFile,
  CLabel,
  CSelect,
  CTextarea,
} from "@coreui/react";
import { useHistory, useParams } from "react-router";
import { getGroupData } from "src/Services/GroupServices";
import { upload } from "src/firebase";
import { getTracks } from "src/Services/TrackService";

const EditGroup = () => {
  const history = useHistory();
  if (localStorage.getItem("adminToken") === undefined) history.push("/login");
  const { id } = useParams();
  const [Group, setGroup] = useState({
    Name: "",
    Description: "",
    Img: "",
    Specialty: "",
  });
  const [progress, setprogress] = useState(100);
  const [track, setTrack] = useState([]);

  useEffect(() => {
    const ref = getGroupData().doc(id).get();
    ref.then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        setGroup({
          Name: data.Name,
          Description: data.Description,
          Img: data.Img,
          Specialty: data.Specialty,
        });
      } else {
      }
    });
    var arr = [];
    getTracks().onSnapshot((res) => {
      res.forEach((e) => {
        arr.push({
          id: e.id,
          ...e.data(),
        });
      });
      setTrack(arr);
    });
  }, []);

  const handleForm = async (e) => {
    switch (e.target.name) {
      case "Name":
        setGroup({
          ...Group,
          Name: e.target.value,
        });
        break;

      case "Description":
        setGroup({
          ...Group,
          Description: e.target.value,
        });
        break;
      case "Specialty":
        setGroup({
          ...Group,
          Specialty: e.target.value,
        });
        break;
      case "URL":
        if (e.target.files.length > 0) {
          setprogress({
            pro: 0,
            msg: "Wait To Upload Your Image",
          });
          const file = e.target.files[0];
          const storageRef = await upload.ref(`GroupImg/${file.name}`);
          const prog = storageRef.put(file);
          const pro =
            ((await prog).bytesTransferred / (await prog).totalBytes) * 100;
          setprogress({
            pro: pro,
            msg: "Wait To Upload Your Image",
          });
          prog.then((e) => {
            e.ref.getDownloadURL().then((url) => {
              setGroup({
                ...Group,
                Img: url,
              });
            });
          });
        } else {
          setGroup({
            ...Group,
            Img: Group.Img,
          });
        }
        break;
      default:
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getGroupData()
      .doc(id)
      .update({
        Name: Group.Name,
        Description: Group.Description,
        Img: Group.Img,
        Specialty: Group.Specialty,
      })
      .then(
        (document.getElementById("name").value = ""),
        (document.getElementById("textarea-input").value = ""),
        (document.getElementById("img").value = ""),
        history.push("/Groups/All")
      );
  };

  return (
    <>
      <div className="container">
        <CForm onSubmit={onSubmit}>
          <CFormGroup className="mx-auto w-50">
            <CLabel htmlFor="name" className="pt-2">
              Group Name:
            </CLabel>
            <CInput
              id="name"
              name="Name"
              onChange={handleForm}
              value={Group.Name}
              placeholder="Enter Group name"
              required
            />

            <CLabel htmlFor="textarea-input" className="pt-2">
              Description:
            </CLabel>
            <CTextarea
              name="Description"
              id="textarea-input"
              rows="9"
              placeholder="Content..."
              onChange={handleForm}
              value={Group.Description}
            />
            <CLabel htmlFor="track" className="pt-2">
              Group Specialty :
            </CLabel>
            <CSelect
              custom
              name="Specialty"
              id="track"
              onChange={handleForm}
              value={Group.Specialty}
            >
              <option value="No Track">Choose...</option>
              {track.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </CSelect>

            <img src={Group.Img} width="400" className="py-4 w-100" />
            <CFormGroup row>
              <CLabel col md="3" htmlFor="file-input">
                Change Group Image
              </CLabel>
              <CCol xs="12" md="9">

                <CInputFile id="file-input" name="file-input" id="img" name="URL" onChange={handleForm} className="pt-3" />

              </CCol>
            </CFormGroup>
            <CCardFooter className="mt-3 rounded">
              <div className="text-center">
                <CButton
                  type="submit"
                  color="info"
                  disabled={progress.pro < 100 ? true : false}
                  size="sm"
                  className="w-25 mx-1"
                >
                  {progress.pro < 100 ? progress.msg : "Edit"}
                </CButton>
                <CButton
                  type="reset"
                  size="sm"
                  color="danger"
                  className="w-25 mx-1"
                >
                  Reset
                </CButton>
              </div>
            </CCardFooter>
          </CFormGroup>
        </CForm>
      </div>
    </>
  );
};

export default EditGroup;
