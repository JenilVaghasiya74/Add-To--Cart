import React, { useEffect, useState } from 'react';
import { Button, Col, Offcanvas, Pagination, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addtoCart, increment } from '../slice/counterSlice';

function Categories() {
    const [arr, setArr] = useState([]);
    const [items, setItems] = useState([]);
    const [category, setCategory] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9); 
    const display = useSelector((state) => state.counter.search);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('https://dummyjson.com/products/category-list')
            .then(res => res.json())
            .then(data => setArr(data));

        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => setItems(data.products));
    }, []);

    useEffect(() => {
        if (category) {
            fetch(`https://dummyjson.com/products/category/${category}`)
                .then(response => response.json())
                .then(data => setItems(data.products));
        }
    }, [category]);

    useEffect(() => {
        if (display !== '') {
            fetch(`https://dummyjson.com/products/search?q=${display}`)
                .then(response => response.json())
                .then(data => setItems(data.products));
        }
    }, [display]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleAddToCart = (item) => {
        dispatch(addtoCart(item));
        dispatch(increment());
    };

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    return (
        <div className='p-3'>
            <Row>
                <Col lg={3} md={3} className='border-end'>
                    <div className="d-none d-lg-block d-md-block positione">
                        {arr.map((item) => (
                            <div id="example-fade-text" key={item}>
                                
                                <Link
                                    className='d-block text-decoration-none text-white p-2 fw-bold fs-5'
                                    onClick={() => setCategory(item)}
                                >
                                    {item}
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="d-block d-lg-none">
                        <Button variant="primary" onClick={handleShow}>
                            Categories
                        </Button>

                        <Offcanvas show={show} onHide={handleClose}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                {arr.map((item) => (
                                    <div id="example-fade-text" key={item}>
                                        <Link
                                            href="#"
                                            className='d-block text-decoration-none text-dark p-2 fw-bold fs-5'
                                            onClick={() => setCategory(item)}
                                        >
                                            {item}
                                        </Link>
                                    </div>
                                ))}
                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                </Col>
                <Col lg={9} md={9}>
                    <Row>
                        {currentItems.map((item) => (
                            <Col lg={4} md={6} key={item.id} className='g-3'>
                                <div className="main shadow w-100 h-100">
                                    <div className="image">
                                        <Link to={`/data/${item.id}`}>
                                            <img src={item.thumbnail} alt="" />
                                        </Link>
                                    </div>
                                    <div className="text px-2">
                                        <h5>{item.title}</h5>
                                        <div className='d-flex justify-content-between mt-1'>
                                            <h5>Rating {item.rating}</h5>
                                            <h4>₹{item.price}<span className='fs-6 text-danger'>{item.discountPercentage}</span></h4>
                                        </div>
                                        <div className='d-flex cart justify-content-between'>
                                            <p className='mt-2'>{item.category}</p>
                                            <button
                                                className='bg-danger border-0 text-white'
                                                style={{ padding: "5px 20px", margin: '5px' }}
                                                onClick={() => handleAddToCart(item)}
                                            >
                                                Add Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    <div className='d-flex justify-content-center mt-3'>
                        <Pagination>
                            <Pagination.Prev
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            />
                            {[...Array(totalPages)].map((_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index + 1 === currentPage}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            />
                        </Pagination>
                    </div>

                </Col>
            </Row>
        </div>
    );
}

export default Categories;