import apiService from '../../utils/apiService'
import { useState, useEffect } from 'react'
import swal from 'sweetalert'

const useContactServices = () => {
  // search and pagination
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // modal
  const [showModal, setShowModal] = useState(false)

  // show data
  const [contacts, setContacts] = useState([])
  const [totalItems, setTotalItems] = useState(0)

  // function get data
  const fetchContact = async () => {
    try {
      const response = await apiService.byGetData(
        `/contacts?search=${searchTerm}&page=${currentPage}&limit=${pageSize}`
      )

      setCurrentPage(response.data.current_page)
      setContacts(response.data.data)
      setTotalItems(response.data.total)
    } catch (error) {
      console.error(error)
    }
  }

  // hooks
  useEffect(() => {
    fetchContact()
  }, [searchTerm, currentPage, pageSize])

  const handlePageChange = page => {
    setCurrentPage(page)
  }

  const handleSizeChange = (current, size) => {
    setPageSize(size)
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

  const handleAddContact = async newContactData => {
    try {
      const response = await apiService.byPostData('/contacts', newContactData)
      console.log(response)

      if (response.status === 201) {
        fetchContact() // Fetch contacts again after adding or updating
        swal({
          title: 'Added!',
          text: 'Contact Added',
          icon: 'success',
          timer: 2000,
          button: false // Optional: hide the "OK" button
        })
        handleCloseModal(true)
      } else {
        const responseData = response.response?.data

        if (responseData) {
          const errors = responseData.errors

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
          handleCloseModal(false)
        } else {
          console.error('Unexpected response format:', response)
        }
      }
    } catch (error) {
      console.error('Error adding contact:', error.response?.data?.message)
    }
  }
  const handleCloseModal = shouldClose => {
    if (shouldClose) {
      setShowModal(false)
    }
  }

  const handleDetail = async contactId => {
    try {
      const response = await apiService.byGetData('contacts', contactId)

      console.log(response)
    } catch (error) {}
  }
  return {
    contacts,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    setPageSize,
    totalItems,
    handlePageChange,
    handleSizeChange,
    handleDelete,
    handleAddContact,
    showModal,
    setShowModal,
    handleCloseModal
  }
}

export default useContactServices
