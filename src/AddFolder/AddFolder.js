import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import config from '../config'
import PropTypes from 'prop-types'

class AddFolder extends Component{

    static contextType = ApiContext;

    static defaultProps = {
        history: {
          push: () => { }
        },
      }

      handleSubmit = e => {
        e.preventDefault()
        const folder = {
          name: e.target['folder-name'].value
        }
        fetch(`${config.API_ENDPOINT}/folders`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(folder),
        })
          .then(response => {
            if (!response.ok)
              throw new Error(response.error);
            return response.json()
          })
          .then(response => {
            this.context.addFolder(response)
            this.props.history.push(`/folder/${response.id}`)
          })
          .catch(error => {
            console.error({ error })
          })
      }

    render(){
        return(
            <div className="AddFolder">
                <h2>Add a folder</h2>
                <form className="AddFolderForm" onSubmit={this.handleSubmit}>
                    <label htmlFor="folder-name">Folder Title</label>
                    <input type="text" id="folder-name" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default AddFolder;

AddFolder.propTypes = {
    history: PropTypes.object
}