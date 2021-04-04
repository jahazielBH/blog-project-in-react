import React, { Component } from 'react';
import {Switch, Route, withRouter } from 'react-router-dom';
import Main from '../homepage/main/Main';
import Heading from '../homepage/heading/Heading';
import Login from '../login/Login';
import ViewArticle from '../view-article/ViewArticle';
import NewArticle from '../new-article/NewArticle';
import { connect } from 'react-redux';
import firebase from 'firebase';
import 'firebase/auth';

const AdminOnly = (ComposedComponent, auth) => {
    class AdminOnly extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isPass: false
            }
        }

        componentDidMount() {
            if (!auth.isEmpty) {
                firebase.auth().currentUser.getIdTokenResult()
                    .then((idTokenResult) => {
                        if (idTokenResult.claims.type === 'administrator') {
                            this.setState({
                                isPass: true
                            })
                        } else {
                            this.props.history.push('/login')
                        }
                    })
            } else {
                this.props.history.push('/login')
            }
        }

        render() {
            if (this.state.isPass) {
                return <ComposedComponent location={this.props.location} 
                                            history={this.props.history} 
                                            auth={auth} />
            } else {
                return (
                    <div>
                        Checking...
                    </div>
                )
            }
        }
    }

    return AdminOnly
}

class RouterManager extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        console.log(this.props.auth)
        return (
            <div>
                <Heading />
                {
                    this.props.auth.isLoaded ?
                        <Switch>
                            <Route path="/" exact>
                                <Main />
                            </Route>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/articulo/:id">
                                <ViewArticle />
                            </Route>
                            <Route path="/nuevo-articulo" component={AdminOnly(NewArticle, this.props.auth)}>
                            </Route>
                        </Switch>
                        : ''
                }
            </div>
        )
    }
}

const enhance = connect(
    ({ firebase: { auth, profile } }) => ({
        auth,
        profile
    })
);

export default enhance(withRouter(RouterManager));