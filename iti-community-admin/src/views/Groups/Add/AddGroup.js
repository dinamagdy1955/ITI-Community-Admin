import {
  CButton,
  CCardFooter,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CTextarea,
} from "@coreui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addNewGroup } from "src/Services/GroupServices";
import { useHistory } from "react-router";
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

  const handleForm = (e) => {
    console.log(e.target.value, e.target.name);
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
        setGroup({
          ...Group,
          ImgURL: e.target.value,
        });
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
            <CLabel htmlFor="img" className="pt-2">
              Img URL:
            </CLabel>
            <CInput
              id="img"
              placeholder="Enter Group Img URL"
              required
              name="URL"
              onChange={handleForm}
              value={Group.ImgURL}
            />
            <CCardFooter className="mt-3 rounded">
              <div className="text-center">
                <Link to="/Groups/All">
                  <CButton
                    type="button"
                    color="info"
                    size="sm"
                    className="w-25 mx-1"
                    onClick={addNew}
                  >
                    Add
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
