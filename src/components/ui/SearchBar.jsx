import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchBar = ({ onFormSubmit }) => {
  const [term, setTerm] = useState('')

  const onSubmit = e => {
    e.preventDefault()
    onFormSubmit(term)
  }

  return (
    <form onSubmit={onSubmit} className='search-form'>
      <div className='input-group'>
        <div className='input-group-prepend'>
          <button type='submit'>Search</button>
        </div>
        <input
          type='text'
          id='search'
          name='search'
          value={term}
          onChange={e => setTerm(e.target.value)}
          class='form-control'
          aria-label='Default'
          aria-describedby='inputGroup-sizing-default'
        />
      </div>
    </form>
  )
}

export default SearchBar
