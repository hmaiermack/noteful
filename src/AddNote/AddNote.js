import React, { Component } from 'react';
import config from '../config';
import ApiContext from '../ApiContext';
import PropTypes from 'prop-types';


class AddNote extends Component{

    static contextType = ApiContext;

    static defaultProps = {
        history: {
          push: () => { }
        },
        name: ''
      }
    
      handleSubmit = e => {
        e.preventDefault()
        const note = {
          name: e.target['NoteName'].value,
          content: e.target['NoteContent'].value,
          folderId: e.target['folder'].value,
          modified: new Date(),
        }

        this.setState({
            name: note.name
        })
        AddNote.propTypes = {
            name: (props, name, AddNote) => {
                const prop = this.state.name;
                if(prop.length === 0) {
                    throw new Error(`${name} is required in ${AddNote}. Validation Failed`);
                }     
            }
       }
       if(note.name.length > 0){
       fetch(`${config.API_ENDPOINT}/notes`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(note),
      })
        .then(response => {
          if (!response.ok)
            throw new Error(response.error);
          return response.json()
        })
        .then(note => {
          this.context.addNote(note)
          this.props.history.push(`/folder/${note.folderId}`)
        })
        .catch(error => {
          console.error({ error })
        })    
      }
      return new Error("Needs a name!")
    }



    render(){

        const folders = this.context.folders;

        return(
            <div className="AddNote">
                <p>Make a new Note</p>
                <form className="NoteForm" onSubmit={this.handleSubmit}>
                    <label htmlFor="NoteName">Title</label>
                    <input type="text" id="NoteName" />
                    <label htmlFor="NoteContent">Content</label>
                    <textarea id="NoteContent" />
                    <label htmlFor="folder">Which folder should this be in?</label>
                    <select id="folder">
                        {folders.map(folder =>
                            <option key={folder.id} value={folder.id}>
                                {folder.name}
                            </option>)}
                    </select>
                    <button type="submit">
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default AddNote;

AddNote.propTypes = {
    history: PropTypes.object,
    name: PropTypes.string
}