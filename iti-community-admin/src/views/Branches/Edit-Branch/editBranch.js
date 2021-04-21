import React, { Suspense, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router";
export default function EditBranch() {
  //EditBranch()
  const history = useHistory();
  if (localStorage.getItem("adminToken") == undefined) history.push("/login");
  return (
    <>
      <h1>Branches</h1>
      <h4>Edit Branch</h4>
      <br></br>
      <Form>
        <Form.Group controlId="formGridBName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Branch Name" />
        </Form.Group>

        <Form.Group controlId="formGridBAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Enter Branch Adress" />
        </Form.Group>

        <Form.Row>
          <Form.Group controlId="formGridBTN" style={{ margin: "5px" }}>
            <Form.Label>NO.Tracks</Form.Label>
            <Form.Control type="number" placeholder="NO.Tracks" />
          </Form.Group>

          <Form.Group controlId="formGridBSN" style={{ margin: "5px" }}>
            <Form.Label>NO.Students</Form.Label>
            <Form.Control type="number" placeholder="NO.Students" />
          </Form.Group>

          <Form.Group controlId="formGridBIN" style={{ margin: "5px" }}>
            <Form.Label>NO.Instructors</Form.Label>
            <Form.Control type="number" placeholder="Instructors" />
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit" style={{ margin: "10px" }}>
          Edit
        </Button>
      </Form>
    </>
  );
}
