import React, { Component } from 'react'
import "../Hardware-Datasets"

class CheckCart extends Component {
    constructor() {
        super();
        this.state = {
        }
        this.fixString = this.fixString.bind(this);
    }
    
    fixString(hardware) {
        if(!hardware){
            return "0";
        }
        else {
            return hardware
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
                        <p id="hwSet1Info">{this.fixString(this.props.hwSet1)} of HWSet1</p>
                        <p id="hwSet2Info">{this.fixString(this.props.hwSet2)} of HWSet2</p>
                        <p id="hwSet3Info">{this.fixString(this.props.hwSet3)} of HWSet3</p>
                        <p id="hwSet4Info">{this.fixString(this.props.hwSet4)} of HWSet4</p>
                        <p id="hwSet5Info">{this.fixString(this.props.hwSet5)} of HWSet5</p>
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