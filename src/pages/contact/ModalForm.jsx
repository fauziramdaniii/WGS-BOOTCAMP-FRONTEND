import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'

const ModalForm = ({
  handleClose,
  handleSaveChanges,
  handleAddContact,
  formData
}) => {
  const [name, setName] = useState(formData.name || '')
  const [email, setEmail] = useState(formData.email || '')
  const [phone, setPhone] = useState(formData.phone || '')
  const [address, setAddress] = useState(formData.address || '')

  const handleCloseModal = shouldClose => {
    if (shouldClose) {
      handleClose()
    }
  }

  const handleSave = () => {
    handleSaveChanges({ name, email, phone, address })
    handleCloseModal()
  }

  const handleAddNewContact = () => {
    handleAddContact({ name, email, phone, address })
    handleCloseModal()
  }

  return (
    <Modal show={true} onHide={handleCloseModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Contact Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormGroup>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type='text'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Phone:</Form.Label>
            <Form.Control
              type='text'
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type='text'
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleCloseModal(true)}>
          Close
        </Button>
        <Button variant='primary' onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalForm
