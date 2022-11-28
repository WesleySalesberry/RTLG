import { useState } from "react"
import { useNavigate } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import { Link } from 'react-router-dom';

import { BaseLayout } from "../Layouts/BaseLayout";
import User from "../../api/User";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [student, setStudent] = useState('user');
  const [error, setError] = useState('');

  const postRegister = async () => {
    const data = {
      name: username,
      email: email,
      hash: password,
      role: student
    }

    const isEmpty = Object.values(data).every(x => x.student === 'user' || x === '');
    if(isEmpty){
      setError('All fields need to be filled out!')
      setTimeout(() => {
        setError('')
      }, 5000)
      return 
    }

    const user = await User.user.register(data)

    if(user.success){
      navigate('/login');
    }
  }

  const handleChange = (evt) => {
    setStudent(evt.target.checked ? 'student' : 'user')
  }

  const handleSubmit =(evt) => {
    evt.preventDefault();
    if(error.length > 0){
      return
    }
    postRegister()
    setName('');
    setEmail('')
    setPassword('')
    setStudent('')
    
  }
  
  return (
    <BaseLayout>
      <Form
        className="my-3"
        onSubmit={handleSubmit}
      >
        {
          error ? 
            <Alert
              variant="danger" 
              className="text-center"
            >
               { error }
            </Alert>
          :
            ''
        }
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text" 
            placeholder="Enter Your Name"
            value={username}
            onChange={(evt) => setName(evt.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter An Email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Enter password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Check
          className="mb-3"
          inline
          label="Are you a student or self taught"
          name="student"
          type="checkbox"
          onChange={handleChange}
        /> 
        <Button variant="secondary" type="submit" className="w-100">
          Submit
        </Button>       
      </Form>
      <div className="text-center">
        <p>Already have an account?
          Sign In
          <Link to='/login'> Here!</Link>
        </p>
      </div>
    </BaseLayout>
  )
}