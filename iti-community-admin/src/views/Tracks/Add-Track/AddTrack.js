import { Form, Button, Card } from "react-bootstrap";
import React, { useState } from "react";
import { db } from "src/firebase";
import { useHistory } from "react-router";
export default function AddTrack() {
  const history = useHistory();
  if (localStorage.getItem("adminToken") == undefined) history.push("/login");
  const [Track, setTrack] = useState({
    name: "",
    branch: "",
    manager: "",
    specilization: "",
    no_students: 0,
    totalTime: "",

    createdDate: new Date(),
  });

  const handleForm = (e) => {
    switch (e.target.name) {
      case "name":
        setTrack({
          ...Track,
          name: e.target.value,
        });
        break;

      case "branch":
        setTrack({
          ...Track,
          branch: e.target.value,
        });
        break;
      case "manager":
        setTrack({
          ...Track,
          manager: e.target.value,
        });
        break;

      case "specilization":
        setTrack({
          ...Track,
          specilization: e.target.value,
        });
        break;
      //
      case "no_students":
        setTrack({
          ...Track,
          no_students: e.target.value,
        });
        break;
      //
      case "totalTime":
        setTrack({
          ...Track,
          totalTime: e.target.value,
        });
        break;
    }
  };
  function addNew() {
    db.collection("Tracks").add(Track);
    history.push("/tracks/Show-Tracks");
  }

  return (
    <>
      <Card style={{ width: "75%" }}>
        <Card.Header>Add new Track</Card.Header>
        <div className="m-1" style={{ width: "75%" }}>
          <Form>
            <Card.Body>
              <Form.Group controlId="formGridTN">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Track Name"
                  name="name"
                  onChange={handleForm}
                  value={Track.name}
                />
              </Form.Group>

              <Form.Group controlId="formGridTB">
                <Form.Label>Branch</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Branch name "
                  name="branch"
                  onChange={handleForm}
                  value={Track.branch}
                />
              </Form.Group>

              <Form.Group controlId="formGridTS">
                <Form.Label>Specialization</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter track Specialization"
                  name="specilization"
                  onChange={handleForm}
                  value={Track.specilization}
                />
              </Form.Group>

              <Form.Group controlId="formGridTM">
                <Form.Label>Manager</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter track Manager"
                  name="manager"
                  onChange={handleForm}
                  value={Track.manager}
                />
              </Form.Group>

              <Form.Row>
                <Form.Group
                  className="col"
                  controlId="formGridTSN"
                  style={{ margin: "5px" }}
                >
                  <Form.Label>NO.Students</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="NO.Students"
                    name="no_students"
                    onChange={handleForm}
                    value={Track.no_students}
                  />
                </Form.Group>

                <Form.Group
                  className="col"
                  controlId="formGridTTT"
                  style={{ margin: "5px" }}
                >
                  <Form.Label>Track Total Time</Form.Label>

                  <select
                    className="form-control"
                    name="totalTime"
                    onChange={handleForm}
                    value={Track.totalTime}
                  >
                    <option></option>
                    <option>9 Monthes</option>
                    <option>6 Monthes</option>
                    <option>3 Monthes</option>
                  </select>
                </Form.Group>
              </Form.Row>
            </Card.Body>
            <Button
              className="w-25 mx-2 mb-2"
              variant="success"
              type="button"
              onClick={() => addNew()}
            >
              Add
            </Button>
          </Form>
        </div>
      </Card>
    </>
  );
}
