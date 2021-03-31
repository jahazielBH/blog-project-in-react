import React, {Component} from 'react';
import {Container} from 'reactstrap';
import firebase from '../../../config/firebase';
import Article from '../../../component/article/Article';

const db = firebase.firestore()

class Main extends Component {
    constructor(props){
        super(props);
        this.state={
            isLoaded: false,
            articulos: []
        }
    }

    componentDidMount(){
        this.getArticulo();
    }

    getArticulo = () => {
        db
        .collection('Articulo')
        .limit(8).get()
        .then(docs => {
            if(!docs.empty){
                let allArticulos = []
                docs.forEach(function(doc){
                    const articulo = {
                        id: doc.id,
                        ...doc.data()
                    }
                    allArticulos.push(articulo)
                })
                this.setState({
                    articulos: allArticulos
                }, () => {
                    this.setState(
                       { 
                           isLoaded: true
                    })
                })
            }
        })
    }

    render(){
        return(
            <div>
                <Container>
                    {
                        this.state.isLoaded?
                            this.state.articulos.map((articulo, index) => {
                                return(
                                    <Article
                                        key={index}
                                        data={articulo}
                                    />
                                )
                            }): ''
                    }
                </Container>
                
            </div>
        );
    }
}

export default Main;