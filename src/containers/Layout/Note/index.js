import React from "react"
import PropTypes from "prop-types"

const NoteComponent = ({note}) => {
  
  const { id, title } = note

  return (
    <li>
      <a href="#">
        <h2>Note {id}</h2>
        <p>{title}</p>
      </a>
    </li>
  )
}

NoteComponent.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string
  })
}

export default NoteComponent