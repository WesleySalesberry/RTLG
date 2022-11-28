import { useEffect, useState } from "react";
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { BaseLayout } from "../Layouts/BaseLayout";
import { useLogin } from '../../Hooks/useAuth';
import { useTokenContext } from "../../Hooks/useTokenContext";
import { STUDENT, PROFILE } from "../../utils/paths";

export const Login = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useTokenContext();

  useEffect(() => {
    if(isAuthenticated){
      redirect(`/${STUDENT}/${PROFILE}`)
    }
  }, [isAuthenticated])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    await login(email, password)
    setEmail('')
    setPassword('')
  }
  

  return (
    <BaseLayout>
      <Form onSubmit={handleSubmit} className="justify-content-md-center">
        {
          error ? 
            
              <Alert 
                variant="danger" 
                className="text-center"
              >
                <p>{ error }</p>
              </Alert>
            
          :
            ""
        }
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          ></Form.Control>

        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Enter password"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
            ></Form.Control>
        </Form.Group>
        <Button 
          variant="primary" 
          type="submit" 
          className="w-100" 
          disabled={isLoading}
        >
          Submit
        </Button>
      </Form>
      <div className="text-center">
        <p>Need an account?
          Sign up 
          <Link to='/register'> Here!</Link>
        </p>
      </div>
    </BaseLayout>
  )
}