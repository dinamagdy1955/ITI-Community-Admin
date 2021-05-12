import {
  CButton,
  CCardFooter,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputFile,
  CLabel,
  CTextarea,
} from "@coreui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addNewGroup } from "src/Services/GroupServices";
import { useHistory } from "react-router";
import { upload } from "src/firebase";


const AddGroup = () => {
  const history = useHistory();
  if (localStorage.getItem("adminToken") == undefined) history.push("/login");
  const [Group, setGroup] = useState({
    Name: "",
    About: "",
    ImgURL: "",
    admin: [""],
    members: [""],
    subscriber: [""],
    createdDate: new Date(),
  });
  let flag = false
  const [progress, setprogress] = useState(100)
  if (progress >= 100) {
    flag = true
  }
  const [files, setfiles] = useState('')
  // const [Img, setImg] = useState('')

  const handleForm = async (e) => {
    switch (e.target.name) {
      case "Name":
        setGroup({
          ...Group,
          Name: e.target.value,
        });
        break;

      case "About":
        setGroup({
          ...Group,
          About: e.target.value,
        });
        break;
      case "URL":
        if (e.target.files.length > 0) {
          const file = e.target.files[0]
          const storageRef = await upload.ref(`GroupImg/${file.name}`)
          // .child((Math.random() * 1024 * 1024).toString(36).substring(2) + file.name).put(file).then()
          storageRef.put(file).on("state_changed", await ((e) => {
            upload.ref('GroupImg').child(file.name).getDownloadURL().then((url) => {
              const pro = (e.bytesTransferred / e.totalBytes) * 100
              setprogress({
                pro: pro,
                msg: 'Wait To Upload Your Image'
              })

              if (flag) {
                setGroup({
                  ...Group,
                  ImgURL: url,
                })
              }
            })
          }))

        } else {
          setGroup({
            ...Group,
            ImgURL: '',
          })
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
              name="About"
              id="textarea-input"
              rows="9"
              placeholder="Content..."
              onChange={handleForm}
              value={Group.About}
            />
            {/* <CLabel htmlFor="img" className="pt-2">
              Img URL:
            </CLabel>
            <CInput
              id="img"
              placeholder="Enter Group Img URL"
              required
              type="file"
              className="pb-5"
              name="URL"
              onChange={handleForm}
              value={Group.ImgURL}
            /> */}
            <CFormGroup row>
              <CLabel col md="3" htmlFor="file-input">Group Image</CLabel>
              <CCol xs="12" md="9">
                <CInputFile id="file-input" name="file-input" id="img" name="URL" onChange={handleForm} />
              </CCol>
            </CFormGroup>
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
                    {progress.pro < 100 ? progress.msg : 'Add'}
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
