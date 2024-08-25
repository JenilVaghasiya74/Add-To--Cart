import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CiDeliveryTruck } from "react-icons/ci";
import { MdFindReplace } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { GiAutoRepair, GiHandTruck } from "react-icons/gi";
import { addtoCart, increment } from '../slice/counterSlice';

function Data() {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data));

  }, [id]);

  const handleImageChange = (imageUrl) => {
    setSelectedImage(imageUrl);
  }

  const handleAddToCart = () => {
    if (product) {
      dispatch(addtoCart(product));
      dispatch(increment());
    }
  }

  if (product) {
    return (
      <Container>
        <Row className='mt-3'>
          <Col lg={5} sm={12} className=''>
            <div className="image-main  position-sticky top-0">
              <div className="img border">
                <img src={selectedImage || product.thumbnail} alt={product.title} />
              </div>
              <div className="images d-flex justify-content-center w-100">
                {product.images.map((image, index) => (
                  <Link key={index}>
                    <img src={image} alt='Product' onClick={() => handleImageChange(image)} />
                  </Link>
                ))}
              </div>
              <div className='d-md-flex justify-content-center w-100'>
                <button onClick={handleAddToCart} className='addcart text-decoration-none'>Add To Cart</button>
                <button className='addcart cart-red'>BUY NOW</button>
              </div>
            </div>
          </Col>
          <Col lg={7} sm={12
          }>
            <div className="box-main">
              <h3>{product.title} ({product.tags.join(', ')}) {product.brand}</h3>
              <p className='d-inline-block text-white px-1 m-0 rounded'
                style={{
                  backgroundColor: product.rating > 5 ? 'green' : product.rating > 4 ? 'red' : product.rating > 3 ? 'orange' : product.rating > 2 ? 'yellow' : 'greenyellow',
                }}
              >{product.rating}⭐ </p>
              <span> 377 Ratings & 38 Reviews</span>
              <p className='fs-6'>Brand: {product.brand}</p>
              <p className='m-0'>Special price</p>
              <div className="price d-flex gap-3 align-items-center">
                <h2>${product.price}</h2>
                <span className='fs-5 text-danger text-decoration-line-through'>₹2,999</span>
                <span className='fs-5 fw-bold'>{product.discountPercentage}% Discount</span>
              </div>
              <p>Inclusive of all taxes</p>
              <ul>
                <p className='fw-bold'>Product Details:</p>
                <li><h6 className='fw-bold'>Brand: <span className='fs-6 fw-lighter'>{product.brand}</span></h6></li>
                <li><h6 className='fw-bold'>Category: <span className='fs-6 fw-lighter'>{product.category}</span></h6></li>
                <li><h6 className='fw-bold'>Item Weight: <span className='fs-6 fw-lighter'>{product.weight}</span></h6></li>
                <li><h6 className='fw-bold'>Product Dimensions: <span className='fs-6 fw-lighter'>{product.dimensions.width}w X {product.dimensions.height}L</span></h6></li>
              </ul>

              <div className="delivery-area d-flex justify-content-around border-top border-bottom">
                <div className="box-1">
                  <CiDeliveryTruck className='fs-1' />
                  <p>Free Delivery</p>
                </div>

                <div className="box-1">
                  <MdFindReplace className='fs-1' />
                  <p>10 days <br /> Replacement</p>
                </div>

                <div className="box-1">
                  <GiAutoRepair className='fs-1' />
                  <p>{product.warrantyInformation}</p>
                </div>

                <div className="box-1">
                  <FaShippingFast className='fs-1' />
                  <p>{product.shippingInformation}</p>
                </div>

                <div className="box-1">
                  <GiHandTruck className='fs-1' />
                  <p>{product.availabilityStatus}</p>
                </div>
              </div>

              <div className="description">
                <p>Description</p>
                <p>{product.description}</p>
              </div>

              <div className="reviews">
                <h3>Ratings & Reviews</h3>
                <div className="ratings">
                  {product.reviews.map((review, index) => (
                    <div key={index} className='   w-100 gap-3'>
                      <h6 className='d-inline-block p-1 text-white rounded-1'
                        style={{ backgroundColor: review.rating > 5 ? 'black' : review.rating > 4 ? 'red' : review.rating > 3 ? 'orange' : review.rating > 2 ? 'green' : 'greenyellow', }}>
                        {review.rating}⭐
                      </h6>
                      <div className=" d-flex align-items-center gap-3 w-100">
                        <div className='img-user'>
                          <img src={require('../img/user.png')} alt="User" />
                        </div>
                        <div className='mt-3'>
                          <h5 className='w-100'>{review.reviewerName}</h5>
                          <p className='m-0'>{review.comment}</p>
                          <p className='m-0'> {review.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    )
  } else {
    return (
      <div className="load"><span className="loader"></span></div>
    )
  }
}

export default Data;
