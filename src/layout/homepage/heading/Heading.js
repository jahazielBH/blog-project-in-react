import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu, Collapse, NavbarToggler, Button } from 'reactstrap';
import Image from 'react-bootstrap/Image'
import {connect} from 'react-redux';
import firebase from '../../../config/firebase';
import {Link} from 'react-router-dom';
import classes from './Heading.module.css'

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

    componentWillReceiveProps(nextProps, nextContext){
        if(!nextProps.auth.isEmpty) {
            firebase.auth().currentUser.getIdTokenResult()
                .then(claim => {
                    console.log(claim)
                })
        }
    }

    render() {
        return (
        <Navbar color="light" light expand="md">
            <NavbarBrand href='/'>Blog</NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/nuevo-articulo">Nuevo Artículo</NavLink>
                    </NavItem>
                </Nav>
                <Image src={this.props.auth.photoURL} roundedCircle className={classes.Profile}/>
                {
                    this.props.auth.isEmpty ?
                    '' :
                    this.props.auth.displayName
                }
                <UncontrolledDropdown>
                    <DropdownToggle nav caret>
                        Acceder
                    </DropdownToggle>
                    <DropdownMenu right>
                        {
                            this.props.auth.isEmpty ?
                                <DropdownItem>
                                    <Link to={{pathname: '/login'}}>
                                        Iniciar sesión
                                    </Link> 
                                </DropdownItem>
                                :
                                <DropdownItem>
                                    <Button onClick={() => firebase.auth().signOut()}>
                                    Cerrar sesión
                                    </Button>
                                </DropdownItem>
                        }
                        
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Collapse>
        </Navbar>);
    }
}

const enhance = connect(
    ({firebase: {auth, profile}}) => ({
        auth,
        profile
    })
);

export default enhance(Heading);