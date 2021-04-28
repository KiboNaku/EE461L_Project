import { Component } from "react";
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";

class DefaultLoader extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const color = "#53c6af";
        const override = css`
            display: block;
            margin: 0 auto;
            border-color: #ffffff;
        `;
        return (
            <PuffLoader color={color} loading={this.props.loading} css={override} size={150} />
        );

    }
}

export default DefaultLoader;