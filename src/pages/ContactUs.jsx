import React, { useState } from 'react'
import Button from '../components/ui/Button'
import DetailModal from '../components/ui/DetailModal'
import { Pagination } from 'antd'
import useContactServices from '../services/contact/contact'
import ModalForm from './contact/ModalForm'

const ContactUs = () => {
  const [formData, setFormData] = useState({})
  const [showDetailModal, setShowDetailModal] = useState(false)

  // Use the custom hook
  const {
    contacts,
    setSearchTerm,
    handlePageChange,
    handleSizeChange,
    currentPage,
    totalItems,
    showTotal,
    searchTerm,
    handleDelete,
    handleAddContact,
    showModal,
    setShowModal,
    handleCloseModal
  } = useContactServices()

  return (
    <div>
      <h2>Contact List</h2>
      <div>
        <Button onClick={() => setShowModal(true)}>Add Contact</Button>
      </div>
      {showModal && (
        <ModalForm
          handleClose={handleCloseModal} // Menggunakan fungsi dari hook useContactServices
          handleSaveChanges={handleAddContact}
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
        onChange={e => setSearchTerm(e.target.value)}
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
      <Pagination
        size='small'
        current={currentPage}
        total={totalItems}
        showTotal={showTotal}
        showSizeChanger
        showQuickJumper
        onChange={handlePageChange}
        onShowSizeChange={handleSizeChange}
      />
    </div>
  )
}

export default ContactUs
