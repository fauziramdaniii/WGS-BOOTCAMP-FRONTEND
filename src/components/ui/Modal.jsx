import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from '../components/ui/Button'

const ModalForm = ({ handleClose, handleSaveChanges, formData }) => {
  const [localFormData, setLocalFormData] = useState(formData)

  const handleChange = e => {
    setLocalFormData({
      ...localFormData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    const isUpdate = !!localFormData.id
    handleSaveChanges(localFormData, isUpdate)
  }

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type='text'
              name='name'
              placeholder='First Name Last Name'
              autoFocus
              value={localFormData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='name@example.com'
              value={localFormData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='phone'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type='tel'
              name='phone'
              placeholder='Phone Number'
              autoFocus
              value={localFormData.phone}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              name='address'
              placeholder='Address'
              autoFocus
              value={localFormData.address}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
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
