import React, { Component } from 'react'

class CheckModal extends Component {

    render() {
        return (
            <div id="check-modal" className="modal">
                {this.props.content}
            </div>
        )
    }
}

export default CheckModal