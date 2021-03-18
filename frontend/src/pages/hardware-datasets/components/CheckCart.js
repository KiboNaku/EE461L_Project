import React, { Component } from 'react'
import "../Hardware-Datasets"

class CheckCart extends Component {
    render() {
        return (
            <div>
                <head>
                    <script>
                    {/* TODO: add script here to get the values from the different input boxes to finalize the user's cart */}
                    </script>
                </head>
                <body>
                    <button type="button" class="btn btn-primary btn-md"
                        data-toggle="modal" data-target="#CheckCart">
                        Checkout
                </button>
                    <div id="CheckCart" class="modal fade" role="dialog">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="mx-auto">Finalize your Cart</h4>
                                </div>
                                <div class="modal-body">
                                    <p>Are these all the hardware sets that you require?</p>
                                    {/* TODO: add the text received from the above script which describes the hw sets that the user
                                    is checking out, asking if this is accurate */}
                                    <p></p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" data-dismiss="modal">Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
            </div >
        )
    }
}

export default CheckCart