import React, { Component, Fragment } from 'react';

import firebase from './Firebase';

import FormError from './ErrorMessage';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            passOne: '',
            passTwo: '',
            errorMsg: null,
            isValid: false
        }
    }

    handleChange = ({ target }) => {
        const { name: key, value: val } = target;
        this.setState({ [key]: val }, () => {
            if (this.state.passOne !== this.state.passTwo) {
                this.setState({
                    errorMsg: 'The passwords do not match',
                    isValid: false
                });
            } else {
                this.setState({ errorMsg: null, isValid: true });
            }
        });
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        const { displayName, email, passOne } = this.state;
        let registerInfo = {
            displayName: displayName,
            email: email,
            passOne: passOne
        }

        firebase.auth().createUserWithEmailAndPassword(
            registerInfo.email,
            registerInfo.passOne
        )
        .then(() => {
            this.props.registerUser(registerInfo.displayName);
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
        const { displayName, email, passOne, passTwo, errorMsg, isValid } = this.state;
        return (
            <Fragment>
                    <form className="mt-3" onSubmit={this.handleSubmit}>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-8">
                                    <div className="card bg-light">
                                        <div className="card-body">
                                            <h3 className="font-weight-light mb-3 text-center">Register</h3>
                                            <div className="form-row">
                                                <section className="col-sm-12 form-group">
                                                    <label
                                                        className="form-control-label sr-only"
                                                        htmlFor="displayName"
                                                    >
                                                        Display Name
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        id="displayName"
                                                        placeholder="Display Name"
                                                        name="displayName"
                                                        required
                                                        onChange={this.handleChange}
                                                        value={displayName}
                                                    />
                                                </section>
                                            </div>
                                            <section className="form-group">
                                                <label
                                                    className="form-control-label sr-only"
                                                    htmlFor="email"
                                                    >
                                                    Email
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="email"
                                                    id="email"
                                                    placeholder="Email Address"
                                                    required
                                                    name="email"
                                                    onChange={this.handleChange}
                                                    value={email}
                                                />
                                            </section>
                                            <div className="form-row">
                                                <section className="col-sm-6 form-group">
                                                    <input
                                                        className="form-control"
                                                        type="password"
                                                        name="passOne"
                                                        placeholder="Password"
                                                        onChange={this.handleChange}
                                                        value={passOne}
                                                    />
                                                </section>
                                                <section className="col-sm-6 form-group">
                                                    <input
                                                        className="form-control"
                                                        type="password"
                                                        required
                                                        name="passTwo"
                                                        placeholder="Repeat Password"
                                                        onChange={this.handleChange}
                                                        value={passTwo}
                                                    />
                                                </section>
                                            </div>
                                            { errorMsg !== null 
                                                ? (
                                                    <FormError theMessage={errorMsg} />
                                                )
                                                : null 
                                            }
                                            <div className="form-group text-right mb-0">
                                                <button className="btn btn-primary" disabled={!isValid} type="submit">
                                                    Register
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

export default Register;