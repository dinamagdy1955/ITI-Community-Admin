
import React from 'react'
import { Form, Button } from "react-bootstrap";

export default function AddBranch() {
  //EditBranch()


  return (
    <>
      <h1>Branches</h1>
      <h4>Add New One</h4><br></br>
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
          {/* <Form.Group controlId="formGridCity">
      <Form.Label>City</Form.Label>
      <Form.Control />
    </Form.Group>

    <Form.Group controlId="formGridState">
      <Form.Label>State</Form.Label>
      <Form.Control as="select" defaultValue="Choose...">
        <option>Choose...</option>
        <option>...</option>
      </Form.Control>
    </Form.Group>

    <Form.Group controlId="formGridZip">
      <Form.Label>Zip</Form.Label>
      <Form.Control />
    </Form.Group> */}

        </Form.Row>

        <Button variant="primary" type="submit" style={{ margin: "10px" }}>
          Add
  </Button>
      </Form>

    </>
  )


}
