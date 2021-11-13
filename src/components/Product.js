import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Col, Row, Card, Button } from 'react-bootstrap';
import Starts from './Starts';
const coolor = ['warning', 'danger', 'light', 'dark', 'danger', 'warning', 'primary', 'success', 'light', 'warning', 'light', 'warning',];
const client = axios.create({
    baseURL: " http://localhost:3001/product"
})
export default function Product() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        client.get()
            .then(res => { setProducts(res.data) })
    }, [])
    return (
        <>
            <Row className='g-3 mt-1 container-fluid bg-light'>
                {products.map((val, i) =>
                    <>
                        <Col md={4} xs={12} className={`border border-${coolor[i]} `}>
                            <img src={val.images} height='250' width="100%" />
                        </Col>
                        <Col md={4} xs={12}>
                            <Card
                                className='shadow-lg'
                                bg={coolor[i]}
                                key={val.id}
                                text={coolor[i] === 'light' ? 'dark' : 'white'}
                                style={{ width: '100%', textAlign: 'center' }}
                            >
                                <Card.Header><h2>$ {val.price}</h2>
                                    <strike className="text-danger">$ 9999</strike> </Card.Header>
                                <Card.Body>
                                    <Card.Title>{val.pname}</Card.Title>
                                    <Card.Text>
                                        Top Speed : 200 km/h <br />
                                        Engine : V8<br />
                                        Type : Super Car<br />
                                        Rating : <Starts />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} xs={12} className="d-grid p-0 shadow">
                            <Button variant={coolor[i]} size="lg" >Click Here To Buy</Button>
                        </Col>
                    </>
                )}
            </Row>
        </>
    )
}
