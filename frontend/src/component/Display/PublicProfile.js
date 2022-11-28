import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import ListGroup from 'react-bootstrap/ListGroup'
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import Image from 'react-bootstrap/Image'

import { BaseLayout } from "../Layouts/BaseLayout"
import User from "../../api/User"
import { Meta } from "../Meta"
import Container from "react-bootstrap/esm/Container"
import { ProjectCardLayout } from "../Layouts/ProjectCardLayout"
import { ProjectCard } from "../Cards/ProjectCard"

export const PublicProfile = () => {
  const { id } = useLocation().state
  const navigate = useNavigate()

  const [ student, setStudent ] = useState();


  const getStudent = async () => {
    const student = await User.user.getSingleUser(id);
    setStudent(student.data)
  }

  useEffect(() => {
    getStudent()
  }, [])

  if(student){
    return (
      <BaseLayout>
        <Meta
          title={`Hi, I am ${student.name}`}
          description={`The student self descrition`}
          keywords='Web developer, React, Javascript, DotNet, Java'
          url={window.location.href}
        />
        <Container>
        <span 
          className="btn btn-secondary my-3 ml-5"
          onClick={() => navigate(-1)}
        >
          Go Back
        </span>
      </Container>
      <Container fluid className="border rounded shadow my-3">
        <Row>
          <Col md={6} className="py-4">
            <Image src="https://picsum.photos/id/237/300/300" className="rounded"/>
          </Col>
          <Col md={6} className="d-flex justify-content-center">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <p>{ student.name }</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>Email: { student.email }</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>Total Projects: { student.projects.length }</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>Joined: { student.createdAt }</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
      <ProjectCardLayout
        title={`${student.name}'s Projects`}
      >
        {
          student.projects.map(itm => (
            <ProjectCard
              key={itm._id} 
              itm={itm}
            />
          ))
        }
      </ProjectCardLayout>
      </BaseLayout>
    )
  }else{
    return <p>Loading</p>
  }
  
}