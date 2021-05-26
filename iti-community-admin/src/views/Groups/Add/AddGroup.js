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
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addNewGroup } from "src/Services/GroupServices";
import { useHistory } from "react-router";
import { upload } from "src/firebase";
import { getTracks } from "src/Services/TrackService";

const AddGroup = () => {
  const history = useHistory();
  if (localStorage.getItem("adminToken") === undefined) history.push("/login");
  const [Group, setGroup] = useState({
    Name: "",
    Description: "",
    Img: "",
    Specialty: "",
    CreatedDate: new Date(),
  });

  const [imgPrev, setImgPrev] = useState('');
  const [track, setTrack] = useState([])
  var arr = []

  useEffect(() => {
    getTracks().onSnapshot((res) => {
      res.forEach((e) => {
        arr.push({
          id: e.id,
          ...(e.data())
        })
      })
      setTrack(arr)
    })
  }, [])
  const [progress, setprogress] = useState(100)

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
              setImgPrev(url);

              setGroup({
                ...Group,
                Img: url,
              });
            });
          });
        } else {
          setGroup({
            ...Group,
            Img: "",
          });
        }
        break;
      default:
        break;
    }
  };
  const addNew = () => {
    addNewGroup(Group);
  };
  return (
    <>
      <div className="container">
        <CForm>
          <CFormGroup className="mx-auto w-50">
            <CLabel htmlFor="name" className="pt-2">
              Group Name:
            </CLabel>
            <CInput
              id="name"
              placeholder="Enter Group name"
              name="Name"
              onChange={handleForm}
              value={Group.Name}
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
            <CSelect custom name="Specialty" id="track" onChange={handleForm}>
              <option value="No Track">Choose...</option>
              {track.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </CSelect>
            <CFormGroup row>
              <CLabel col md="3" htmlFor="file-input" className="pt-2">
                Group Image
              </CLabel>
              <CCol xs="12" md="9">
                <CInputFile
                  id="file-input"
                  name="file-input"
                  id="img"
                  name="URL"
                  onChange={handleForm}
                  className="pt-2"
                />
              </CCol>
            </CFormGroup>
            <img src={imgPrev} width="400" className="py-4 w-100" />

            <CCardFooter className="mt-3 rounded">
              <div className="text-center">
                <Link to="/Groups/All">
                  <CButton
                    id="addRow"
                    type="button"
                    color="info"
                    size="sm"
                    disabled={progress.pro < 100 ? true : false}
                    className="w-25 mx-1"
                    onClick={addNew}
                  >
                    {progress.pro < 100 ? progress.msg : "Add"}
                  </CButton>
                </Link>
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

export default AddGroup;
