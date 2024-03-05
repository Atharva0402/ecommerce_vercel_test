import { useParams, useNavigate } from 'react-router-dom'
import { useState } from "react"
// import products from '../products';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating';
// import axios from 'axios'
import React from 'react';
import Loader from '../components/loader';
import { useDispatch } from 'react-redux';
import { useGetProductDetailsQuery } from '../slices/productApiSlice';
import Message from '../components/Message';
import { addToCart } from '../slices/cartSlice'





const ProductScreen = () => {
    const { id: productId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

    const [qty, setQty] = useState(1);
    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }))
        navigate('/cart')
    }









    // const [product, setProducts] = useState([]);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const { data } = await axios.get(`/api/products/${productId}`);
    //         setProducts(data);
    //     };
    //     fetchProducts();
    // }, [productId])

    // const product = products.find((p) => p._id === productId)

    // console.log([...Array(product.countInStock).keys()])
    return (
        <>
            <Link className='btn btn-light my-3' to="/" >Go back</Link>


            {isLoading ? (<Loader />) : error ? (<Message variant='danger'>

                {error?.data?.message || error.error}
            </Message>) :
                (<>
                    <Row>
                        <Col md={5}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>
                        <Col md={4}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price:${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description:{product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>


                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>
                                                    ${product.price}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                <strong>
                                                    {product.countInStock > 0 ? " In Stock" : "out of Stock"}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {/* // list group item */}

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control

                                                        as='select'
                                                        value={qty}
                                                        onChange={(e) => setQty(Number(e.target.value))}>
                                                        {[...Array(product.countInStock).keys()].map((x) => (
                                                            <option key={x + 1}
                                                                value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item>
                                        <Button
                                            className="btn-block"
                                            type='button'
                                            disabled={product.countInStock === 0}
                                            onClick={addToCartHandler}>
                                            Add to cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>

                        </Col>

                    </Row>
                </>

                )
            }



        </>
    )
}

export default ProductScreen;
