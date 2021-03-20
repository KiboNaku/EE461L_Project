import React, { Component } from 'react'
import "../Hardware-Datasets"

class ErrorMessage extends Component {

    render() {
        return (
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="mx-auto">Error</h4>
                    </div>
                    <div class="modal-body">
                        <p>There is an issue with your input: </p>
                        {/* TODO: implement similar structure to the checkCart modal with dynamic text changes */}
                        <p id="hwSet1Error"></p>
                        <p id="hwSet2Error"></p>
                        <p id="hwSet3Error"></p>
                        <p id="hwSet4Error"></p>
                        <p id="hwSet5Error"></p>
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