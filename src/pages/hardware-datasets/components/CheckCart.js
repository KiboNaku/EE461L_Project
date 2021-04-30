import React, { Component } from 'react'
import "../Hardware-Datasets"
import * as handleHardware from '../../../api_calls/handleHardware'

class CheckCart extends Component {
    constructor() {
        super();
        this.state = {
        }
        this.fixString = this.fixString.bind(this);
        this.getElement = this.getElement.bind(this);
    }
    
    fixString(hardware) {
        if(!hardware){
            return "0";
        }
        else {
            return hardware
        }
    }

    getElement(hwList, index){
        hwList.map((value, i) => {
            if(i == index){
                return value;
            }
        });
    }

    render() {
        return (
            <div className="modal-dialog">
                <div className="modal-content dark-background">
                    <div className="modal-header">
                        <h4 className="mx-auto">Finalize your Cart</h4>
                    </div>
                    <div className="modal-body">
                        <p>Are these all the hardware sets that you require?</p>
                        {
                            Object.entries(this.props.hw)
                            .map( ([key, value]) => <p>{value} of {key}</p> )
                        }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn button-primary" data-dismiss="modal" onClick={this.props.checkOut}>Checkout</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CheckCart