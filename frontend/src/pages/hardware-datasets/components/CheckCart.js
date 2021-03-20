import React, { Component } from 'react'
import "../Hardware-Datasets"

class CheckCart extends Component {
    // {/* TODO: add script here to get the values from the different input boxes to finalize the user's cart */}
    constructor() {
        super();
        this.state = {
        }
        this.fixString = this.fixString.bind(this);
    }
    
    // TODO: learn how to use this to more accurately define how many of each hardware set are requested
    fixString(hardware) {
        if(hardware.value.length == 0){
            return 0;
        }
    }

    render() {
        return (
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="mx-auto">Finalize your Cart</h4>
                    </div>
                    <div className="modal-body">
                        <p>Are these all the hardware sets that you require?</p>
                        <p id="hwSet1Info">{this.props.hwSet1} of HWSet1</p>
                        <p id="hwSet2Info">{this.props.hwSet2} of HWSet2</p>
                        <p id="hwSet3Info">{this.props.hwSet3} of HWSet3</p>
                        <p id="hwSet4Info">{this.props.hwSet4} of HWSet4</p>
                        <p id="hwSet5Info">{this.props.hwSet5} of HWSet5</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-dismiss="modal">Checkout</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CheckCart