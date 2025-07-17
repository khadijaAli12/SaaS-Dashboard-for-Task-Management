import React from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'

const SearchBox = ({ placeholder = 'Search...', value, onChange }) => {
  return (
    <InputGroup>
      <InputGroup.Text>
        <FaSearch />
      </InputGroup.Text>
      <FormControl
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </InputGroup>
  )
}

export default SearchBox
