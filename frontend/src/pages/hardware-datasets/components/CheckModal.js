import React, { Component } from 'react'

class CheckModal extends Component {
    // {/* TODO: add script here to get the values from the different input boxes to finalize the user's cart */}

    render() {
        return (
            <div id="check-modal" className="modal">
                {this.props.content}
            </div>
        )
    }
}

export default CheckModal