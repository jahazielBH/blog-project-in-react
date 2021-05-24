import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Collapse, NavbarToggler, Button } from 'reactstrap';
import Image from 'react-bootstrap/Image'
import { connect } from 'react-redux';
import firebase from '../../../config/firebase';
import { Link } from 'react-router-dom';
import classes from './Heading.module.css';
import ApiService from '../../../service/ApiService';

class Heading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
}

componentWillReceiveProps(nextProps, nextContext) {
    if (!nextProps.auth.isEmpty) {
        firebase.auth().currentUser.getIdTokenResult()
            .then(claim => {
                console.log(claim)
            })
    }
}

render() {
    return (
        <Navbar color="light" light expand="md" className={classes.NavBar}>
            <NavbarBrand href='/'>Blog</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/nuevo-articulo">Nuevo Artículo</NavLink>
                    </NavItem>
                    {sessionStorage.getItem('user') ?
                        <NavItem>
                            <NavLink href="/posts">Publicaciones</NavLink>
                        </NavItem>:''
                    }
                    {sessionStorage.getItem('user') ?
                        <NavItem>
                            <NavLink href="/nueva-publicacion">Nueva Publicacion</NavLink>
                        </NavItem>:''
                    }
                </Nav>
                <Image src={this.props.auth.photoURL} roundedCircle className={classes.Profile} />
                <Nav navbar className={classes.Fix}>
                    {
                        this.props.auth.isEmpty ?
                            '' :
                            this.props.auth.displayName
                    }
                </Nav>
                <Nav navbar>
                    {
                        this.props.auth.isEmpty ?
                            <Link to={{ pathname: '/login-mongo' }} className={classes.Button}>
                                <Button color="success">Iniciar sesión</Button>
                            </Link>
                            :
                            <Button color="danger" onClick={() => firebase.auth().signOut()} >
                                Cerrar sesión
                            </Button>
                    }
                    
                    {
                        sessionStorage.getItem('user') ?

                            <Button color="danger" onClick={() => ApiService.logout()} >
                                Cerrar sesión
                            </Button>
                            :
                            <Link to={{ pathname: '/signup' }} className={classes.Button}>
                                <Button color="warning">Registrarse</Button>
                            </Link>
                    }
                </Nav>
            </Collapse>
        </Navbar>);
    }
}

const enhance = connect(
    ({ firebase: { auth, profile } }) => ({
        auth,
        profile
    })
);

export default enhance(Heading);