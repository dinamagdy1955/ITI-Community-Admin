import { Form, Button } from "react-bootstrap";
import React from "react";

export default function AddTrack() {
  //EditTrack()

  return (
    <>
      <h1>Tracks</h1>
      <h4>Add New One</h4>
      <br></br>
      <Form>
        <Form.Group controlId="formGridTN">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Track Name" />
        </Form.Group>

        <Form.Group controlId="formGridTB">
          <Form.Label>Branch</Form.Label>
          <Form.Control type="text" placeholder="Enter Branch name " />
        </Form.Group>

        <Form.Group controlId="formGridTS">
          <Form.Label>Specialization</Form.Label>
          <Form.Control type="text" placeholder="Enter track Specialization" />
        </Form.Group>

        <Form.Row>
          <Form.Group controlId="formGridTTT" style={{ margin: "5px" }}>
            <Form.Label>Track Total Time</Form.Label>

            <select className="form-control">
              <option></option>
              <option>9 Monthes</option>
              <option>6 Monthes</option>
              <option>3 Monthes</option>
            </select>
          </Form.Group>

          <Form.Group controlId="formGridTSN" style={{ margin: "5px" }}>
            <Form.Label>NO.Students</Form.Label>
            <Form.Control type="number" placeholder="NO.Students" />
          </Form.Group>

          <Form.Group controlId="formGridTCN" style={{ margin: "5px" }}>
            <Form.Label>NO.Coursess</Form.Label>
            <Form.Control type="number" placeholder="NO.Coursess" />
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit" style={{ margin: "10px" }}>
          Add
        </Button>
      </Form>
    </>
  );
}
