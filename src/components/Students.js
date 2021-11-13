import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap';
const client = axios.create({
    baseURL: "http://localhost:3001/courses"
})
export default function Students() {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        client.get()
            .then(res => { setCourses(res.data) })
    }, [])
    return (
        <>
            {
                courses.map((val) =>
                    <>
                        <h1>Enrolled Course : {val.cname}</h1>
                        <Table hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone No.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    val.enrolled.map(((obj, i) =>
                                        <tr key={`${val.cname}${i}`}>
                                            <td>{obj.name}</td>
                                            <td>{obj.email}</td>
                                            <td>{obj.phone}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </>
                )

            }
        </>
    )
}
