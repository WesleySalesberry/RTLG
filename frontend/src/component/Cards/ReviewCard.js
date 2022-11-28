import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Rating } from '../Rating';

export const ReviewCard = ({ review }) => {
  return (
    <Card>
      <Row className="g-0">
        <Col md={12}>
          <Card.Body>
            <Card.Title>
              { review.name }
            </Card.Title>
            <Card.Text>
              { review.comment }
            </Card.Text>
            <Card.Text>
              <Rating
                value={3}
              />
            </Card.Text>
            <Card.Text>
              <small className="text-muted">{ review.updatedAt }</small>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
}