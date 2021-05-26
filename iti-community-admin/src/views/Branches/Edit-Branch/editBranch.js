import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Form, Button, Card } from "react-bootstrap";
import { db } from "src/firebase";
export default function EditBranch() {
  const history = useHistory();

  if (localStorage.getItem("adminToken") == undefined) history.push("/login");

  const getBranchData = () => {
    return db.collection("Branches");
  };

  const { id } = useParams();
  const [Branch, setBranch] = useState({
    name: "",
    location: "",
    no_tracks: 0,
    no_students: 0,
    no_instructors: 0,
    manager: "",
  });

  useEffect(() => {
    const ref = getBranchData().doc(id).get();
    ref.then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        setBranch({
          name: data.name,
          location: data.location,
          no_tracks: data.no_tracks,
          no_students: data.no_students,
          no_instructors: data.no_instructors,
          manager: data.manager,
        });
      } else {
        throw "Not Founded";
      }
    });
  }, []);

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
      case "no_students":
        setBranch({
          ...Branch,
          no_students: e.target.value,
        });
        break;
      case "no_instructors":
        setBranch({
          ...Branch,
          no_instructors: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getBranchData()
      .doc(id)
      .update({
        name: Branch.name,
        location: Branch.location,
        no_tracks: Branch.no_tracks,
        no_students: Branch.no_students,
        no_instructors: Branch.no_instructors,
        manager: Branch.manager,
      })
      .then(
        (document.getElementById("Name").value = ""),
        (document.getElementById("adress").value = ""),
        (document.getElementById("Manager").value = ""),
        (document.getElementById("Tnum").value = 0),
        (document.getElementById("Snum").value = 0),
        (document.getElementById("Inum").value = 0),
        history.push("/branches/Show-All")
      );
  };

  return (
    <>
      <Card style={{ width: "75%" }}>
        <Card.Header>Edit Branch</Card.Header>
        <div className="m-4" style={{ width: "75%" }}>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Branch Name"
                id="Name"
                name="name"
                onChange={handleForm}
                value={Branch.name}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Branch Adress"
                id="adress"
                name="location"
                onChange={handleForm}
                value={Branch.location}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Manager</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Branch manager"
                id="Manager"
                name="manager"
                onChange={handleForm}
                value={Branch.manager}
              />
            </Form.Group>

            <Form.Row>
              <Form.Group style={{ margin: "5px" }}>
                <Form.Label>NO.Tracks</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="NO.Tracks"
                  id="Tnum"
                  name="no_tracks"
                  onChange={handleForm}
                  value={Branch.no_tracks}
                />
              </Form.Group>

              <Form.Group style={{ margin: "5px" }}>
                <Form.Label>NO.Students</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="NO.Students"
                  id="Snum"
                  name="no_students"
                  onChange={handleForm}
                  value={Branch.no_students}
                />
              </Form.Group>

              <Form.Group style={{ margin: "5px" }}>
                <Form.Label>NO.Instructors</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Instructors"
                  id="Inum"
                  name="no_instructors"
                  onChange={handleForm}
                  value={Branch.no_instructors}
                />
              </Form.Group>
            </Form.Row>
            <Button variant="success" type="submit" className="w-25 mx-2 mb-2">
              Edit
            </Button>
          </Form>
        </div>
      </Card>
    </>
  );
}
