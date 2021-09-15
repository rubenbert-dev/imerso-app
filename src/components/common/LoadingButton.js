import React from 'react';
import RenderIf from 'render-if';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

function LoadingButton(props) {
    return (
        <Button type={props.type} disabled={props.loading}>
            {RenderIf(props.loading)(<i className={`fa fa-fw ${props.icon} fa-spin`}></i>)}
            {(props.loading) ? ` ${props.text}` : props.children}
        </Button>
    );
}

LoadingButton.defaultProps = {
    type: "button",
    loading: false,
    text: "Loading . . .",
    icon: "fa-spinner"
};

LoadingButton.propTypes = {
    type: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    text: PropTypes.string,
    icon: PropTypes.string
};

export default LoadingButton;