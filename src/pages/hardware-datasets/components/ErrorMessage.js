import React, { Component } from 'react'
import "../Hardware-Datasets"

class ErrorMessage extends Component {

    render() {
        return (
            <div class="modal-dialog">
                <div class="modal-content dark-background">
                    <div class="modal-header">
                        <h4 class="mx-auto">Error</h4>
                    </div>
                    <div class="modal-body">
                        <p>There is an issue with your input: </p>
                        <p id="hwSet1Error" style={{ whiteSpace: 'break-spaces' }}>{this.props.errorString}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ErrorMessage