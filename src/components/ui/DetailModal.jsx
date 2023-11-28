import Modal from 'react-bootstrap/Modal'
import Button from './Button'
const DetailModal = ({ handleClose, contactDetails }) => {
  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Contact Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table>
          <tbody>
            <tr>
              <td>ID</td>
              <td>{contactDetails.id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{contactDetails.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{contactDetails.email}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{contactDetails.phone}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{contactDetails.address}</td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DetailModal
