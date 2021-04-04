import React, { Component } from 'react';
import classes from './NewArticle.module.css';
import { Container, Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button } from 'reactstrap';
import Image from 'react-bootstrap/Image'
import ReactQuill from 'react-quill';
import firebase from '../../config/firebase';
import 'react-quill/dist/quill.snow.css';
import { v4 as uuidv4 } from 'uuid';

import swal from 'sweetalert';

const db = firebase.firestore()
const storage = firebase.storage()

class NewArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {
                title: '',
                content: '',
                createDate: new Date(),
                urlImageFile: '',
                published: false,
                lastModified: new Date(),
                createUserID: '',
                author: ''
            },
        }
    }


    modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }, { 'font': [] }],
            [{ 'size': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean'], ['code-block']
        ],
    }

    formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video', 'code-block',
    ]

    onChangeArticleTitle = (value) => {
        this.setState({
            article: {
                ...this.state.article,
                title: value
            }
        })
    }

    onChangeArticleContent = (value) => {
        this.setState({
            article: {
                ...this.state.article,
                content: value
            }
        })
    }

    onChangePublish = (value) => {
        this.setState({
            article: {
                ...this.state.article,
                published: value === 'True'
            }
        })
    }

    saveArticle = () => {
        swal({
            title: "Guardar Articulo",
            text: "Estas seguro que deseas guardar el contenido Actual!",
            icon: "warning",
            buttons: ["No", "Sí"]
        }).then((res) => {
            if (res) {
                const article = this.state.article
                article.createUserID = this.props.auth.uid
                article.author = this.props.auth.displayName
                db.collection('Articulo')
                    .add(article)
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err =>
                        console.log(err)
                    );
                swal({
                    title: this.state.article.title,
                    text: "Guardado con éxito",
                    icon: "success",
                }).then(() => {
                    window.location = "/";
                });
            } else {
                swal({ text: "Seguir Editando" });
            }
        });
    }

    uploadImage = (e) => {
        return new Promise(async (resolve, reject) => {
            const file = e.target.files[0]
            const fileName = uuidv4()
            storage.ref().child("Articulos/" + fileName)
                .put(file)
                .then(async snapshot => {
                    const downloadURL = await storage.ref().child("Articulos/" + fileName).getDownloadURL()
                    console.log(downloadURL)
                    resolve({
                        success: true,
                        data: { link: downloadURL }
                    })
                })
        })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col xl={9} lg={9} md={8} sm={12} xs={12}>
                        <h2 className={classes.SectionTitle}>Nuevo Artículo</h2>
                        <FormGroup>
                            <Label className={classes.Label}>Titulo</Label>
                            <Input type='text' name='articleTitle' id='articleTitle' placeholder=''
                                onChange={(e) => this.onChangeArticleTitle(e.target.value)}
                                value={this.state.article.title}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ReactQuill
                                ref={(e1) => this.quill = e1}
                                value={this.state.article.content}
                                onChange={(e) => this.onChangeArticleContent(e)}
                                theme="snow"
                                modules={this.modules}
                                formats={this.formats}
                            />
                        </FormGroup>
                    </Col>
                    <Col xl={3} lg={3} md={4} sm={12} xs={12}>
                        <Card className={classes.Card}>

                            <CardHeader>
                                Configuración del artículo
                            </CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <Label className={classes.Label}>Publicar</Label>
                                    <Input type='select' name='publish' id='publish' onChange={(e) => { this.onChangePublish(e.target.value) }}>
                                        <option>False</option>
                                        <option>True</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label className={classes.Label}>Subir Imagen</Label>
                                    <Input type="file" accept="image/*" className={classes.ImageUploader}
                                        onChange={async (e) => {
                                            const uploadState = await this.uploadImage(e)
                                            if (uploadState.success) {
                                                this.setState({
                                                    hasFeactureImage: true,
                                                    article: {
                                                        ...this.state.article,
                                                        urlImageFile: uploadState.data.link
                                                    }
                                                })
                                            }
                                        }}>
                                    </Input>
                                    {
                                        this.state.hasFeactureImage ?
                                            <Image src={this.state.article.urlImageFile} className={classes.Image} /> : ''
                                    }
                                </FormGroup>
                                <FormGroup>
                                    <Button color='success' onClick={(e) => this.saveArticle()}>
                                        Enviar
                                    </Button>
                                </FormGroup>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default NewArticle;