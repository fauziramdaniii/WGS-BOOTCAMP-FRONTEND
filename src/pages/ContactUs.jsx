import React, { useEffect, useState } from 'react'
import Button from '../components/ui/Button'
import apiService from '../services/api/apiService'
import ModalExport from '../components/ui/Modal'

const ContactUs = () => {
  const [contacts, setContacts] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    fetchContact()
  }, [])

  const fetchContact = async () => {
    try {
      const response = await apiService.byGetData('/contacts')
      setContacts(response.data)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
  }

  const handleDelete = async id => {
    try {
      await apiService.byDeleteData(`/contacts/${id}`)
      fetchContact()
    } catch (error) {
      console.error('Error deleting contact:', error)
    }
  }

  const handleAdd = () => {
    setShowAddModal(true)
  }

  const handleAddClose = () => {
    setShowAddModal(false)
  }

  return (
    <div>
      <h2>Contact List</h2>
      <Button onClick={handleAdd}>Add Contact</Button>
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

      {/* Add Contact Modal */}
      <ModalExport
        show={showAddModal}
        handleClose={handleAddClose}
        title='Add Contact'
        body={
          <form>
            {/* Add your form fields here for adding a new contact */}
            <label>Name:</label>
            <input type='text' name='name' />
            <label>Email:</label>
            <input type='email' name='email' />
            <label>Phone:</label>
            <input type='tel' name='phone' />
            <label>Address:</label>
            <textarea name='address'></textarea>
          </form>
        }
        footer={
          <Button variant='primary' onClick={handleAddClose}>
            Save Contact
          </Button>
        }
      />
    </div>
  )
}

export default ContactUs
