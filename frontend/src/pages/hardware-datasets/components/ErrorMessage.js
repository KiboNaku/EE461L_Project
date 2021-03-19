import React, { Component } from 'react'
import "../Hardware-Datasets"
import "./Modal.css"

class ErrorMessage extends Component {
    // {/* TODO: add script here to get the values from the different input boxes to finalize the user's cart */}

    render() {
        return (
            <div>
                <body>
                    <div id="ErrorMessage" class="modal">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="mx-auto">Error</h4>
                                </div>
                                <div class="modal-body">
                                    <p>There is an issue with your input: </p>
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
                    </div>
                </body>
            </div>
        )
    }
}

export default CheckCart