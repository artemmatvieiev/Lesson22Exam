import React from "react"
import NotesContainer from "./Notes"
import { getNotesApi } from "./Notes/api"
import "./index.scss"


export default class LayoutContainer extends React.PureComponent {
  state = {
    notes: [],
    notesView: []
  }
  
  constructor(props) {
    super(props)
		document.addEventListener("scroll",this.handleScroll)
  }
  async componentDidMount() {
    const notes = await getNotesApi()
		const notesView = notes.slice(0,30)
    this.setState({
      notes: notes,
			notesView: notesView
    })
  }
	handleScroll = () => {
    const { body: { scrollHeight, scrollTop, clientHeight } } = document
		console.log(scrollHeight, scrollTop, clientHeight)
    if (scrollHeight - Math.ceil(scrollTop) === 735) {
			const { notes, notesView } = this.state
			const newNotesView = notes.slice(0, notesView.length + 20)
			this.setState({
				notesView: newNotesView
    	})
		} 
  }

  render() {
    const { notesView } = this.state

    return (
      
        <NotesContainer
          notesView={notesView}
        />
    )
  }
}