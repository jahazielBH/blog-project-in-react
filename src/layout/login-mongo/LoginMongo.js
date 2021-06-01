import React, { Component } from 'react';
import { Container, Col, FormGroup } from 'reactstrap';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import classes from './LoginMongo.module.css';

import ApiService from "../../service/ApiService";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                ¡Este campo es obligatorio!
            </div>
        );
    }
};

class LoginMongo extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            name: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            ApiService.login(this.state.name, this.state.password).then(
                (response) => {
                    this.setState({
                        loading: response.data.success,
                        message: response.data.message
                    });
                    window.location = '/';
                },
                error => {
                    this.setState({
                        loading: error.response.data.success,
                        message: error.response.data.message
                    });
                }
            );
        }
    }

    render() {
        return (
            <Container className={classes.FormBody}>
                <div className="container">
                    <div className="card col-md-6 offset-md-3 offset-md-3">

                        <Form
                            onSubmit={this.handleLogin}
                            ref={c => {
                                this.form = c;
                            }}
                        >
                            <h2>Iniciar sesión</h2>
                            <Col>
                                <FormGroup>
                                    <div className="form-group">
                                        <label htmlFor="username">Nombre</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.onChangeUsername}
                                            validations={[required]}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <div className="form-group">
                                        <label htmlFor="password">Contraseña</label>
                                        <Input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.onChangePassword}
                                            validations={[required]}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>

                            <Col>
                                <FormGroup>
                                    <div className="form-group">
                                        <button
                                            className="btn btn-primary btn-block"
                                            disabled={this.state.loading}
                                        >
                                            {this.state.loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                            )}
                                            <span>Enviar</span>
                                        </button>
                                    </div>
                                </FormGroup>
                            </Col>

                            {this.state.message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.message}
                                    </div>
                                </div>
                            )}
                            <CheckButton
                                style={{ display: "none" }}
                                ref={c => {
                                    this.checkBtn = c;
                                }}
                            />
                        </Form>
                    </div>
                </div>
            </Container>

        );
    }
}

export default LoginMongo;