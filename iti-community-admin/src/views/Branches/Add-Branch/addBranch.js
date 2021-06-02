import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
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
    db.collection("Branches").add(Branch);
    history.push("/branches/Show-All");
  };

  return (
    <>
      <Card style={{ width: "75%" }}>
        <Card.Header>Add new Branch</Card.Header>
        <div className="m-4" style={{ width: "75%" }}>
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
              <Form.Group
                className="col"
                controlId="formGridBTN"
                style={{ margin: "5px" }}
              >
                <Form.Label>NO.Tracks</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="NO.Tracks"
                  name="no_tracks"
                  onChange={handleForm}
                  value={Branch.no_tracks}
                />
              </Form.Group>

              <Form.Group
                className="col"
                controlId="formGridBSN"
                style={{ margin: "5px" }}
              >
                <Form.Label>NO.Students</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="NO.Students"
                  name="no_students"
                  onChange={handleForm}
                  value={Branch.no_students}
                />
              </Form.Group>

              <Form.Group
                className="col"
                controlId="formGridBIN"
                style={{ margin: "5px" }}
              >
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
              variant="success"
              type="button"
              onClick={addNew}
              className="w-25 mx-2 mb-2 mt-2"
            >
              Add
            </Button>
          </Form>
        </div>
      </Card>
    </>
  );
}
