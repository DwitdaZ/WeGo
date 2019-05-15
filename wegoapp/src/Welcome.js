import React, { Component, Fragment } from 'react';


class Welcome extends Component {
    render() {

        const { user } = this.props;

        return (
            <Fragment>
                <div className="text-center mt-4">
                    <span className="text-secondary font-weight-bold pl-1">
                        Welcome {user}
                    </span>
                    {', '}
                    <a href="/" className="text-primary font-weight-bold pl-1">logout</a>
                </div>
            </Fragment>
        );
    }
}

export default Welcome;