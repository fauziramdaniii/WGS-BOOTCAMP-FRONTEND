import React, { useEffect, useState } from 'react'
import Button from '../components/ui/Button'
import apiService from '../services/api/apiService'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import swal from 'sweetalert'
import DetailModal from '../components/ui/DetailModal'
import { Pagination } from 'antd'
// import CustomPagination from '../components/ui/pagination/pagination'

const ContactUs = () => {
  const [contacts, setContacts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({})
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    fetchContact(currentPage, pageSize)
  }, [currentPage, searchTerm, pageSize])

  const initializeFormData = contactData => {
    if (contactData) {
      setFormData({
        id: contactData.id,
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        address: contactData.address
      })
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: ''
      })
    }
  }

  const fetchContact = async () => {
    try {
      const response = await apiService.byGetData(
        `/contacts?search=${searchTerm}&page=${currentPage}&limit=${pageSize}`
      )

      setTotalItems(response.data.total)
      console.log(response.data)
      setContacts(response.data.data)

      if (response.data.length === 0) {
        swal('Empty Contact')
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
  }

  const handleAddContact = () => {
    initializeFormData() // Initialize formData for adding a new contact
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleSearch = newSearchTerm => {
    setSearchTerm(newSearchTerm)
  }

  const handleDelete = async contactId => {
    try {
      const willDelete = await swal({
        title: 'Are you sure?',
        text: 'Are you sure that you want to delete this contact?',
        icon: 'warning',
        dangerMode: true
      })
      if (willDelete) {
        await apiService.byDeleteData(`/contacts/${contactId}`)
        fetchContact() // Fetch contacts again after deletion
        swal({
          title: 'Deleted!',
          text: 'Contact Deleted',
          icon: 'success',
          timer: 2000,
          button: false // Optional: hide the "OK" button
        })
      }
    } catch (error) {
      console.error('Error deleting contact:', error)
    }
  }

  const handleUpdate = async contactId => {
    try {
      const contactToUpdate = contacts.find(contact => contact.id === contactId)
      initializeFormData(contactToUpdate) // Initialize formData for updating
      setShowModal(true)
    } catch (error) {
      console.error('Error preparing update:', error)
    }
  }

  const handleDetail = async contactId => {
    try {
      const contactDetails = contacts.find(contact => contact.id === contactId)
      initializeFormData(contactDetails) // Initialize formData for detail view
      setShowDetailModal(true)
    } catch (error) {
      console.error('Error preparing detail:', error)
    }
  }

  const handleAddContactAndUpdateList = async (contactData, isUpdate) => {
    try {
      let response

      if (isUpdate) {
        response = await apiService.byPutData(
          `/contacts/${contactData.id}`,
          contactData
        )
      } else {
        response = await apiService.byPostData('/contacts', contactData)
        console.log(response)
      }

      if (response.status === 201 || response.status === 200) {
        fetchContact() // Fetch contacts again after adding or updating
        handleCloseModal()
        const successMessage = isUpdate
          ? 'Your imaginary contact has been updated!'
          : 'Your imaginary contact has been added!'
        swal({
          title: isUpdate ? 'Updated!' : 'Added!',
          text: successMessage,
          icon: 'success',
          timer: 2000,
          button: false
        })
      } else {
        const errors = response.response.data.errors

        if (Array.isArray(errors) && errors.length > 0) {
          const errorMessage = errors
            .map(error => `${error.msg} (${error.path})`)
            .join('\n')

          swal({
            title: 'Error',
            text: errorMessage,
            icon: 'error'
          })
        }
      }
    } catch (error) {
      console.error(
        `Error ${isUpdate ? 'updating' : 'creating'} contact:`,
        error
      )
    }
  }

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page)
    setPageSize(pageSize)
    fetchContact(page, pageSize)
  }

  const handleSizeChange = (current, size) => {
    setCurrentPage(1)
    setPageSize(size)
    fetchContact(1, size) // Pass the correct size parameter
  }

  const showTotal = total => `Total ${total} items`

  return (
    <div>
      <h2>Contact List</h2>
      <div>
        <Button onClick={handleAddContact}>Add Contact</Button>
      </div>
      {showModal && (
        <ModalForm
          handleClose={handleCloseModal}
          handleSaveChanges={handleAddContactAndUpdateList}
          formData={formData}
        />
      )}
      {showDetailModal && (
        <DetailModal
          handleClose={() => setShowDetailModal(false)}
          contactDetails={formData}
        />
      )}
      <input
        type='text'
        placeholder='Search'
        value={searchTerm}
        onChange={e => handleSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th colSpan='3'>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.address}</td>
              <td>
                <Button onClick={() => handleUpdate(contact.id)}>Update</Button>
              </td>
              <td>
                <Button onClick={() => handleDelete(contact.id)}>Delete</Button>
              </td>
              <td>
                <Button onClick={() => handleDetail(contact.id)}>Detail</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      ;
      <Pagination
        size='small'
        current={currentPage}
        total={totalItems}
        showTotal={showTotal}
        showSizeChanger
        showQuickJumper
        onChange={handlePageChange}
        onShowSizeChange={handleSizeChange} // Add this line to handle size changes
      />
    </div>
  )
}

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

export default ContactUs
