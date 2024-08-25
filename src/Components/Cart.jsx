import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, removeFromCart } from '../slice/counterSlice';

function Cart() {
    const cartData = useSelector((state) => state.counter.cart);
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let totalPrice = 0;
        cartData.forEach(item => {
            totalPrice += item.price * item.quantity;
        });
        setTotal(totalPrice);
    }, [cartData]);

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleIncrement = (productId) => {
        dispatch(increment(productId));
    };

    const handleDecrement = (productId) => {
        dispatch(decrement(productId));
    };

    return (
        <Container>
            <Row>
                <Col lg={12} className='mt-5  border'>
                    <div className="title-cart p-3">
                        <p className='fs-6 m-0'>Cart updated.</p>
                        <p></p>
                    </div>
                </Col>
                <Col lg={9} className='mt-4 border'>
                    {
                        cartData.map((item, index) => (
                            <div className='d-flex flex-md-nowrap gap-3 p-2 flex-wrap justify-content-center w-100'>
                                <div className="image-cart"><img src={item.thumbnail} alt="" /></div>
                                <div className="text-cart w-100">
                                    <h5 className='mt-2'>{item.title} ({item.category})</h5>
                                    <h6 style={{ color: '#878dae' }}>Category : <span   >{item.category}</span> </h6>
                                    <p>{item.price}   {item.discountPercentage}%</p>
                                    <div className='mt-2 d-flex flex-wrap  w-100 justify-content-around'>
                                        <div>
                                            <button onClick={() => handleDecrement(item.id)} style={{ border: '0', padding: '5px 15px ' }}>-</button>
                                            <input type='number' className='mx-auto' value={item.quantity} readOnly style={{ width: '40px', border: '0', textAlign: 'center' }} />
                                            <button onClick={() => handleIncrement(item.id)} style={{ border: '0', padding: '5px 15px ' }}>+</button>
                                        </div>
                                        <div className='d-flex gap-3 align-items-center '>
                                            <h5> Total : {(item.price * item.quantity).toFixed(2)}</h5>
                                            <button className='border-0 bg-danger text-white p-2' onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </Col>
                <Col lg={3} className='mt-4'>
                    <div className="total-cart border p-3">
                        <p className='fs-6 m-0'>Total: ₹ {total.toFixed(2)}</p>

                        {/* <div className="order">
                            <button onClick={()=>{alert('Conform order')}}> Conform Order</button>
                        </div> */}
                    </div>
                </Col>
            </Row>
        </Container >
    )
}

export default Cart;
