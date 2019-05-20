import React, { Component, Fragment } from 'react';

class FormError extends Component {
    render() {
        const { theMessage } = this.props;

        return (
            <Fragment>
                <section className="alert alert-danger py-0" role="alert">
                    <small>{theMessage}</small>
                </section>
            </Fragment>
        );
    }
}

export default FormError;