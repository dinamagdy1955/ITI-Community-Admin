import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { db } from "src/firebase";
import { useHistory } from "react-router";
export default function AddBranch() {
  const history = useHistory();
  if (localStorage.getItem("adminToken") == undefined) history.push("/login");
  const [Branch, setBranch] = useState({
    name: "",
    location: "",
    manager: "",
    no_tracks: 0,
    no_students: 0,
    no_instructors: 0,

    createdDate: new Date(),
  });

  const handleForm = (e) => {
    console.log(e.target.value, e.target.name);
    switch (e.target.name) {
      case "name":
        setBranch({
          ...Branch,
          name: e.target.value,
        });
        break;

      case "location":
        setBranch({
          ...Branch,
          location: e.target.value,
        });
        break;
      case "manager":
        setBranch({
          ...Branch,
          manager: e.target.value,
        });
        break;

      case "no_tracks":
        setBranch({
          ...Branch,
          no_tracks: e.target.value,
        });
        break;
      //
      case "no_students":
        setBranch({
          ...Branch,
          no_students: e.target.value,
        });
        break;
      //
      case "no_instructors":
        setBranch({
          ...Branch,
          no_instructors: e.target.value,
        });
        break;
    }
  };

  const addNew = () => {
    console.log(Branch);
    return db.collection("Branches").add(Branch);
  };

  return (
    <>
      <h1>Branches</h1>
      <h4>Add New One</h4>
      <br></br>
      <Form>
        <Form.Group controlId="formGridBName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Branch Name"
            name="name"
            onChange={handleForm}
            value={Branch.name}
          />
        </Form.Group>

        <Form.Group controlId="formGridBAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Branch Adress"
            name="location"
            onChange={handleForm}
            value={Branch.location}
          />
        </Form.Group>

        <Form.Group controlId="formGridBmanager">
          <Form.Label>Manager</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Branch manager"
            name="manager"
            onChange={handleForm}
            value={Branch.manager}
          />
        </Form.Group>

        <Form.Row>
          <Form.Group controlId="formGridBTN" style={{ margin: "5px" }}>
            <Form.Label>NO.Tracks</Form.Label>
            <Form.Control
              type="number"
              placeholder="NO.Tracks"
              name="no_tracks"
              onChange={handleForm}
              value={Branch.no_tracks}
            />
          </Form.Group>

          <Form.Group controlId="formGridBSN" style={{ margin: "5px" }}>
            <Form.Label>NO.Students</Form.Label>
            <Form.Control
              type="number"
              placeholder="NO.Students"
              name="no_students"
              onChange={handleForm}
              value={Branch.no_students}
            />
          </Form.Group>

          <Form.Group controlId="formGridBIN" style={{ margin: "5px" }}>
            <Form.Label>NO.Instructors</Form.Label>
            <Form.Control
              type="number"
              placeholder="Instructors"
              name="no_instructors"
              onChange={handleForm}
              value={Branch.no_instructors}
            />
          </Form.Group>
        </Form.Row>

        <Button
          variant="primary"
          type="button"
          style={{ margin: "10px" }}
          onClick={addNew}
        >
          Add
        </Button>
      </Form>
    </>
  );
}
