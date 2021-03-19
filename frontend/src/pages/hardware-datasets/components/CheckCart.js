import React, { Component } from 'react'
import "../Hardware-Datasets"
import "./Modal.css"

class CheckCart extends Component {
    // {/* TODO: add script here to get the values from the different input boxes to finalize the user's cart */}

    render() {
        return (
            <div>
                <body>
                    <div id="CheckCart" className="modal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="mx-auto">Finalize your Cart</h4>
                                </div>
                                <div className="modal-body">
                                    <p>Are these all the hardware sets that you require?</p>
                                    <p id="hwSet1Info"></p>
                                    <p id="hwSet2Info"></p>
                                    <p id="hwSet3Info"></p>
                                    <p id="hwSet4Info"></p>
                                    <p id="hwSet5Info"></p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" data-dismiss="modal">Checkout</button>
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