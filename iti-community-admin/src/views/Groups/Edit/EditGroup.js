import React, { useEffect, useState } from "react";
import {
  CButton,
  CCardFooter,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CTextarea,
} from "@coreui/react";
import { useHistory, useParams } from "react-router";
import { getGroupData } from "src/Services/GroupServices";

const EditGroup = () => {
  const history = useHistory();
  if (localStorage.getItem("adminToken") == undefined) history.push("/login");
  const { id } = useParams();
  console.log(id)
  const [Group, setGroup] = useState({
    Name: "",
    Description: "",
    Img: "",
    Specialty: "",

  });

  useEffect(() => {
    const ref = getGroupData().doc(id).get();
    ref.then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        setGroup({
          Name: data.Name,
          Description: data.Description,
          Img: data.Img,
          Specialty: data.Specialty
        });
      } else {
        console.log("Not Founded");
      }
    });
  }, []);

  const handleForm = (e) => {
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
          About: e.target.value,
        });
        break;
      case "Specialty":
        setGroup({
          ...Group,
          Specialty: e.target.value,
        });
        break;
      case "URL":
        setGroup({
          ...Group,
          Img: e.target.value,
        });
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
        Specialty: Group.Specialty
      })
      .then(
        (document.getElementById("name").value = ""),
        (document.getElementById("textarea-input").value = ""),
        (document.getElementById("img").value = ""),
        (document.getElementById("Specialty").value = ""),
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
            <CLabel htmlFor="Specialty" className="pt-2">
              Specialty:
            </CLabel>
            <CInput
              id="Specialty"
              name="Specialty"
              placeholder="Enter Group Specialty"
              required
              onChange={handleForm}
              value={Group.Specialty}
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
            <CLabel htmlFor="img" className="pt-2">
              Img:
            </CLabel>
            <CInput
              id="img"
              name="URL"
              placeholder="Enter Group Img URL"
              required
              onChange={handleForm}
              value={Group.Img}
            />
            <CCardFooter className="mt-3 rounded">
              <div className="text-center">
                <CButton
                  type="submit"
                  color="info"
                  size="sm"
                  className="w-25 mx-1"
                >
                  Edit
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
