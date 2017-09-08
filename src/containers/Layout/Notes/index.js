import React from "react"
import NoteComponent from "../Note"
import PropTypes from "prop-types"

export default class NotesContainer extends React.PureComponent {
  state = {
    notesView: []
  }

  constructor(props) {
    super(props)
  }

  componentWillReceiveProps({ notesView }) {
    this.setState({
      notesView: notesView
    })
  }
	static propTypes = {
		notesView: PropTypes.arrayOf(PropTypes.object)
	}
  render() {
    const { notesView } = this.state
    
    
    return (
      <ul>
        {
          notesView.map((note, index) => 
						<NoteComponent 
							note={note}
							key={index}
						/>)
        }
      </ul>
    )
  }
}