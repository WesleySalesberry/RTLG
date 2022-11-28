import Table from 'react-bootstrap/Table';
import Container from "react-bootstrap/esm/Container"

export const UserTable = ({ children }) => {
  return (
    <Container>
      <Table striped hover>
        <thead className="text-center">
          <tr>
            <th>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Role</th>
            <th scope='col'>Join Date</th>
          </tr>
        </thead>
        <tbody>
          { children }
        </tbody>
      </Table>
    </Container>
    
  )
}