import React, { Component } from 'react'
import { Navbar, Button, FormControl, Nav, Form} from "react-bootstrap"
import { Link } from "react-router-dom"

class NavBar extends Component {

    state = {
        media: {
         data:[]
     },
        openModal: false
    }
 
    render() {
        return (
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                  <Link className="nav-link" to="/">Home</Link>
                  <Link className="nav-link" to="/backoffice">Backoffice</Link>
                  <Link className="nav-link" to="/createMovie">createMovie</Link>
                {/* <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Back Office</Nav.Link> */}
              </Nav>
                

              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
        )
    }
}

export default NavBar