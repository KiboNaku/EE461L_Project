import { Component } from "react";
import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;


class DefaultLoader extends Component() {

    render() {
        const override = css`
            display: block;
            margin: 0 auto;
            border-color: #53c6af;
        `;
        return (
            <PuffLoader color={color} loading={loading} css={override} size={150} />
        );

    }
}

export default DefaultLoader;