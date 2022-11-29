import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import { useUpdateUser } from '../../Hooks/useUpdateUser';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from "../../Hooks/useUserContext"

/**
 * 
 * @returns For Preview 
 * https://www.youtube.com/watch?v=b6Oe2puTdMQ
 */

export const UserUpdateForm = () => {
  const { user } = useUserContext();

  const navigate = useNavigate();
  const [ email, setEmail ] = useState(user.email)
  const [ name, setName ] = useState(user.name)
  const [ file, setFile ] = useState('')
  const [ description, setDescription ] = useState(user.description)

  

  const { updateUser, message, error, isLoading }= useUpdateUser();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    // const body = new FormData(evt.target);
    // body.append('name', name)
    // body.append('email', email)
    // body.append('image', file)
    // body.append('description', description)

    const body = {
      email: email,
      name: name,
      description: description,
      file: file
    }

    await updateUser(body);
  }

  return (
    <Container>
      <div className="my-3">
        <span className="btn btn-secondary" onClick={() => navigate(-1)}>Go Back</span>
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Update Your Name"
                value={name}
                onChange={(evt) => setName(evt.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control 
                type="email"
                name="email"
                placeholder="Update your email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="imageFile" className="mb-3">
          <Form.Label>Choose Your Image: </Form.Label>
          <Form.Control 
            type="file" 
            name="imageFile"
            onChange={(evt) => setFile(evt.target.files[0])}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>About You</Form.Label>
            <Form.Control 
              className="textarea"
              as="textarea"
              type="text" 
              placeholder="Tell the world about yourself"
              value={description}
              onChange={(evt) => setDescription(evt.target.value)}
            ></Form.Control>
        </Form.Group>
        <Button 
          variant="primary" 
          type="submit" 
          className="w-100" 
          disabled={isLoading}
        >
          Update
        </Button>
      </Form>
    </Container>
  )
}