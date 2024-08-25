import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { searchtocart } from '../slice/counterSlice';
function Header() {

    const count = useSelector((state) => state.counter.cart)
    console.log(count);
    const dispatch = useDispatch();
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary p-2 border-bottom">
                <Container>
                    <Link to="/" className='fs-4 fw-bold'>Dummy Api </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto navbar">
                            <Link to='/'>Home</Link>
                            <Nav.Link href="blog">Blog</Nav.Link>
                            <Nav.Link href="services">Services</Nav.Link>
                            <Nav.Link href="product">Products</Nav.Link>
                            <Nav.Link href="contect">Contect</Nav.Link>


                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    onChange={(e) => dispatch(searchtocart(e.target.value))}
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                            <Link to='cart'><i className='fs-4 text-black position-relative'><FaCartShopping /> <Badge bg="secondary position-absolute top-0">{count.length}</Badge></i></Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    )
}

export default Header
