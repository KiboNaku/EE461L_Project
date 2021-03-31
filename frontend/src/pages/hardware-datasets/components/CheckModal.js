import React, { Component } from 'react'
import "./Modal.css"

class CheckModal extends Component {

    render() {
        return (
            <div id="check-modal" className="modal dark-modal">
                {this.props.content}
            </div>
        )
    }
}

export default CheckModal