import Alert from 'react-bootstrap/Alert';

export const AlertCard = (error) => {
  return setTimeout(() => {
    <Alert
      variant="danger" 
      className="text-center"
    >
      { error }
    </Alert>
  }, 5000)
}