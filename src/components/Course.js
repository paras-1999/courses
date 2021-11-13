import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Col, Row, Card, Button, Modal, Form, Alert } from 'react-bootstrap';
const client = axios.create({
    baseURL: "http://localhost:3001/courses"
})
const regForName = RegExp(/^[A-Z a-z]{4,29}$/);
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPhone = RegExp(/^[7-9][0-9]{9}$/);
export default function Course() {
    const [courses, setCourses] = useState([]);
    const [nameError, setNameError] = useState({ msg: '', check: false });
    const [emailError, setEmailError] = useState({ msg: '', check: false });
    const [phoneError, setPhoneError] = useState({ msg: '', check: false });
    const [show, setShow] = useState(false);
    const [id, setId] = useState('');
    const name = useRef('');
    const email = useRef('');
    const phone = useRef('');
    const [modalShow, setModalShow] = React.useState(false);
    useEffect(() => {
        client.get()
            .then(res => { setCourses(res.data) })
    }, [])
    const validate = async () => {
        setNameError({ msg: '', check: false })
        setEmailError({ msg: '', check: false })
        setPhoneError({ msg: '', check: false })
        if (name.current.value == '' || email.current.value == '' || phone.current.value == '') {
            setShow(true);
        }
        else if (!regForName.test(name.current.value)) {
            setNameError({ msg: "Enter Valid Name", check: true })

        }
        else if (!regForEmail.test(email.current.value)) {
            setEmailError({ msg: "Enter Valid Email", check: true })

        }
        else if (!regForPhone.test(phone.current.value)) {
            setPhoneError({ msg: "Enter Valid Phone No.", check: true })
        }
        else {
            let newUser = { name: name.current.value, email: email.current.value, phone: phone.current.value };
            let temp = courses[id - 1]
            temp.enrolled.push(newUser)
            console.log(temp)
            await client.put(`${id}`, temp)
            setModalShow(false);
        }
    }
    return (
        <>


            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                centered
            >
                {show ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Fill the missing Field(s)!</Alert.Heading>
                </Alert> : null}
                <Modal.Header closeButton>
                    <Modal.Title>
                        Enroll Form
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Floating className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Paras Saxena"
                            ref={name}
                            isInvalid={nameError.check}
                        />
                        <label >Full Name</label>
                        <Form.Text className="text-muted">{nameError.msg}</Form.Text>
                    </Form.Floating >
                    <Form.Floating className="mb-3">
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            ref={email}
                            isInvalid={emailError.check}
                        />
                        <label>Email</label>
                        <Form.Text className="text-muted">{emailError.msg}</Form.Text>
                    </Form.Floating>
                    <Form.Floating>
                        <Form.Control
                            type="phone"
                            placeholder="9310414915"
                            ref={phone}
                            isInvalid={phone.check}
                        />
                        <label>Phone</label>
                        <Form.Text className="text-muted">{phoneError.msg}</Form.Text>
                    </Form.Floating>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='dark' onClick={validate}>Enroll Now</Button>
                </Modal.Footer>
            </Modal>
            <Row className='g-4 container-fluid bg-light'>
                {courses.map((val =>
                    <Col md={4}>
                        <Card style={{ width: '100%' }} key={val.id} className="shadow">
                            <Card.Img variant="top" src={val.image} height="300px" />
                            <Card.Body>
                                <Card.Title><h2>{val.cname}</h2></Card.Title>
                                <Card.Text>{val.description}</Card.Text>
                                <Button variant="outline-info" onClick={() => { setModalShow(true); setId(val.id) }} >Enquiry</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}
