import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function NavigationBar() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#">
                        <img
                            alt=""
                            src="https://cdn.icon-icons.com/icons2/2699/PNG/512/atlassian_jira_logo_icon_170511.png"
                            width="35"
                            height="35"
                            className="d-inline-block align-top"
                        />{' '}
                        <h2 style={{ display: 'inline' }}>Your List</h2>
                    </Navbar.Brand>
                    <Nav className='mx-auto'>
                        <Link to="/" className="nav-link text-light" >Products</Link>
                        <Link to="/course" className="nav-link text-light" >Courses</Link>
                        <Link to="/student" className="nav-link text-light" >Students</Link>
                    </Nav>

                </Container>
            </Navbar>

        </>
    )
}
