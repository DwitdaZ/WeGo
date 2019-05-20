import React, { Component, Fragment } from 'react';

import firebase from './Firebase';
import FormError from './ErrorMessage';
import { navigate } from '@reach/router';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMsg: null
        }
    }

    handleChange = ({ target }) => {
        const { name: key, value: val } = target;
        this.setState({ [key]: val });
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        const { email, password } = this.state;
        let registerInfo = {
            email: email,
            password: password
        }

        firebase.auth().signInWithEmailAndPassword(
            registerInfo.email,
            registerInfo.password
        )
        .then(() => {
            navigate('/meetings');
        })
        .catch( ({ message: errorMsg }) => {
            if (errorMsg !== null) {
                this.setState({ errorMsg });
            } else {
                this.setState({ errorMsg: null });
            }
        })
    }

    render() {
        const { email, password, errorMsg } = this.state;
        return (
            <Fragment>
                    <form className="mt-3" onSubmit={this.handleSubmit}>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-6">
                                    <div className="card bg-light">
                                        <div className="card-body">
                                            <h3 className="font-weight-light mb-3 text-center">Log In</h3>
                                            
                                            <section className="form-group">
                                                <label
                                                    className="form-control-label sr-only"
                                                    htmlFor="email"
                                                    >
                                                    Email
                                                </label>
                                                <input
                                                    required
                                                    className="form-control"
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    placeholder="Email Address"
                                                    onChange={this.handleChange}
                                                    value={email}
                                                />
                                            </section>
                                            <section className="form-group">
                                                <label
                                                    className="form-control-label sr-only"
                                                    htmlFor="password"
                                                    >
                                                    Password
                                                </label>
                                                <input
                                                    required
                                                    className="form-control"
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    placeholder="Password"
                                                    onChange={this.handleChange}
                                                    value={password}
                                                />
                                            </section>
                                            { errorMsg !== null 
                                                ? (
                                                    <FormError theMessage={errorMsg} />
                                                )
                                                : null 
                                            }
                                            <div className="form-group text-right mb-0">
                                                <button className="btn btn-primary" type="submit">
                                                    Log In
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
            </Fragment>
        );
    }
}

export default Login;