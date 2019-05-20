import React, { Component, Fragment } from 'react';

import { Link } from '@reach/router';

class Welcome extends Component {
    render() {

        const { userName, logOutUser } = this.props;

        return (
            <Fragment>
                <div className="text-center mt-4">
                    <span className="text-secondary font-weight-bold pl-1">
                        Welcome {userName}
                    </span>
                    {', '}
                    <Link to="/login" className="text-primary font-weight-bold pl-1" onClick={(e) => logOutUser(e)}>
                        logout
                    </Link>
                </div>
            </Fragment>
        );
    }
}

export default Welcome;