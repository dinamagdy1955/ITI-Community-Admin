import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Form, Button, Card } from "react-bootstrap";
import { db } from "src/firebase";

export default function EditTrack() {
  //EditTrack()
  const history = useHistory();
  if (localStorage.getItem("adminToken") == undefined) history.push("/login");

  const getTrackData = () => {
    return db.collection("Tracks");
  };

  const { id } = useParams();
  const [Track, setTrack] = useState({
    name: "",
    branch: "",
    manager: "",
    specilization: "",
    no_students: 0,
    totalTime: "",
  });

  useEffect(() => {
    const ref = getTrackData().doc(id).get();
    ref.then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        setTrack({
          name: data.name,
          branch: data.branch,
          manager: data.manager,
          specilization: data.specilization,
          no_students: data.no_students,
          totalTime: data.totalTime,
        });
      } else {
        throw "Not Founded";
      }
    });
  }, []);

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
      default:
        break;
    }
  };
  //
  const onSubmit = (e) => {
    e.preventDefault();
    getTrackData()
      .doc(id)
      .update({
        name: Track.name,
        branch: Track.branch,
        manager: Track.manager,
        specilization: Track.specilization,
        no_students: Track.no_students,
        totalTime: Track.totalTime,
      })
      .then(
        (document.getElementById("Name").value = ""),
        (document.getElementById("Branch").value = ""),
        (document.getElementById("Manager").value = ""),
        (document.getElementById("spec").value = 0),
        (document.getElementById("SN").value = 0),
        (document.getElementById("TTT").value = 0),
        history.push("/tracks/Show-Tracks")
      );
  };

  return (
    <>
      <Card style={{ width: "75%" }}>
        <Card.Header>Edit Track</Card.Header>
        <div className="m-4" style={{ width: "75%" }}>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                id="Name"
                type="text"
                placeholder="Enter Track Name"
                name="name"
                onChange={handleForm}
                value={Track.name}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Branch</Form.Label>
              <Form.Control
                id="Branch"
                type="text"
                placeholder="Enter Branch name "
                name="branch"
                onChange={handleForm}
                value={Track.branch}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                id="spec"
                type="text"
                placeholder="Enter track Specialization"
                name="specilization"
                onChange={handleForm}
                value={Track.specilization}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Manager</Form.Label>
              <Form.Control
                id="Manager"
                type="text"
                placeholder="Enter track Manager"
                name="manager"
                onChange={handleForm}
                value={Track.manager}
              />
            </Form.Group>

            <Form.Row>
              <Form.Group className="col" style={{ margin: "5px" }}>
                <Form.Label>NO.Students</Form.Label>
                <Form.Control
                  id="SN"
                  type="number"
                  placeholder="NO.Students"
                  name="no_students"
                  onChange={handleForm}
                  value={Track.no_students}
                />
              </Form.Group>

              <Form.Group className="col" style={{ margin: "5px" }}>
                <Form.Label>Track Total Time</Form.Label>

                <select
                  id="TTT"
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
            <Button
              variant="success"
              type="submit"
              className="w-25 mx-2 mb-2 mt-2"
            >
              Edit
            </Button>
          </Form>
        </div>
      </Card>
    </>
  );
}
