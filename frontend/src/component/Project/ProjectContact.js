import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import ListGroup from "react-bootstrap/esm/ListGroup"
import { Link } from 'react-router-dom';

export const ProjectContact = ({ student }) => {
  if(student){
    return (
      <Container fluid className="bg-primary rounded">
        <Row>
          <Col>
            <img className="rounded mx-auto my-3" src={student.image} alt=""/>
          </Col>
          <Col className="mx-auto my-3">
            <ListGroup>
              <ListGroup.Item>Student:
                <Link
                    to={`/profile/${student.slug}`}
                    className=""
                    state={{ id: student._id }}
                  >
                      {student.name}
                  </Link> 
              </ListGroup.Item>
              <ListGroup.Item>Email: {student.email}</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  }else{
    return <p>Loading</p>
  }
  
}