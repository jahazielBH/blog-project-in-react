import React, { Component } from 'react';
import { Container, Col, FormGroup } from 'reactstrap';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import ApiService from '../../service/ApiService';
import classes from './Register.module.css';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        ¡Este campo es obligatorio!
      </div>
    );
  }
};


const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        El nombre de usuario debe tener entre 3 y 20 caracteres.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        La contraseña debe tener entre 6 y 40 caracteres.
      </div>
    );
  }
};

const vpasswordconfirm = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        La contraseña debe tener entre 6 y 40 caracteres.
      </div>
    );
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      pass: "",
      pass_confirm: "",
      successful: false,
      message: ""
    }
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      pass: e.target.value
    });
  }

  onChangeConfirmPassword(e) {
    this.setState({
      pass_confirm: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
      message: ""
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      ApiService.register(
        this.state.name,
        this.state.pass,
        this.state.pass_confirm
      ).then(
        response => {
          this.setState({
            successful: response.data.success,
            message: response.data.message
          });
        },
        error => {
          this.setState({
            successful: error.response.data.success,
            message: error.response.data.message
          });
        }
      );
    }
  }

  render() {
    return (
      <Container className={classes.FormBody}>
        <div className="col-md-12">
          <div className="card col-md-6 offset-md-3 offset-md-3">

            <Form
              onSubmit={this.handleRegister}
              ref={c => {
                this.form = c;
              }}
            >
              {!this.state.successful && (
                <div>
                  <h2>Formulario</h2>
                  <Col>
                    <FormGroup>
                      <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <Input
                          type="text"
                          className="form-control"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChangeName}
                          validations={[required, vusername]}
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
                          value={this.state.pass}
                          onChange={this.onChangePassword}
                          validations={[required, vpassword]}
                        />
                      </div>
                    </FormGroup>
                  </Col>

                  <Col>
                    <FormGroup>
                      <div className="form-group">
                        <label htmlFor="passwordC">Confirmar tu contraseña</label>
                        <Input
                          type="password"
                          className="form-control"
                          name="passwordC"
                          value={this.state.pass_confirm}
                          onChange={this.onChangeConfirmPassword}
                          validations={[required, vpasswordconfirm]}
                        />
                      </div>
                    </FormGroup>
                  </Col>

                  <Col>
                    <FormGroup>
                      <div className="form-group">
                        <button className="btn btn-primary btn-block">
                          {
                            this.state.successful && (
                              <span className="spinner-border spinner-border-sm"></span>
                            )
                          }
                          <span>Enviar</span>
                        </button>
                      </div>
                    </FormGroup>
                  </Col>

                </div>
              )}

              {this.state.message && (
                <Col>
                  <FormGroup>
                    <div>

                    </div>
                    <div className="form-group">
                      <div className={
                        this.state.successful
                          ? "alert alert-success"
                          : "alert alert-danger"
                      } role="alert">
                        {this.state.message}
                      </div>
                    </div>
                    <div >

                    </div>
                  </FormGroup>
                </Col>
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


export default Register;