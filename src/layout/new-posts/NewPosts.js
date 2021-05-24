import React, { Component } from "react";
import PostsService from "../../service/PostsService";
import { Container, Form, Col, FormGroup } from 'reactstrap';
import classes from './NewPosts.module.css';

class NewPosts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            desc: "",
            submitted: false
        }
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.savePosts = this.savePosts.bind(this);
        this.newPosts = this.newPosts.bind(this);
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            desc: e.target.value
        });
    }

    savePosts() {
        var data = {
            name: this.state.name,
            desc: this.state.desc
        };

        PostsService.createPosts(data)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    desc: response.data.desc,
                    submitted: true
                });
                console.log(response);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newPosts() {
        this.setState({
            name: "",
            desc: "",
            submitted: true
        });
    }

    render() {
        return (
            <Container className={classes.FormBody}>
                <Form >
                    <div className="submit-form">
                        {this.state.submitted ? (
                            <div>
                                <h4>¡Envió con éxito!</h4>
                                <button className="btn btn-success" onClick={this.newPosts}>
                                    Nueva Publicacion
                        </button>
                            </div>
                        ) : (
                                <div className="card col-md-6 offset-md-3 offset-md-3">
                                    <h2>Nueva Publicacion</h2>
                                    <Col>
                                        <FormGroup>
                                            <div className="form-group">
                                                <label htmlFor="name">Nombre</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    required
                                                    value={this.state.name}
                                                    onChange={this.onChangeName}
                                                    name="name"
                                                />
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <div className="form-group">
                                                <label htmlFor="description">Descripcion</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="description"
                                                    required
                                                    value={this.state.description}
                                                    onChange={this.onChangeDescription}
                                                    name="description"
                                                />
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <button onClick={this.savePosts} className="btn btn-success">
                                                Enviar
                                            </button>
                                        </FormGroup>
                                    </Col>
                                </div>
                            )}
                    </div>
                </Form>

            </Container>
        );
    }

}

export default NewPosts;