import React, { Component } from "react";
import PostsService from "../../service/PostsService";
import { Container } from 'reactstrap';
import classes from './Posts.module.css';

class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            currentPosts: null,
            currentIndex: -1,
        }
        this.retrievePosts = this.retrievePosts.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActivePosts = this.setActivePosts.bind(this);
    }

    componentDidMount() {
        this.retrievePosts();
    }

    retrievePosts() {
        PostsService.getPosts()
            .then(response => {
                this.setState({
                    posts: response
                });
                console.log(response);
            })
            .catch(e => {
                console.log(e);
            });
    }

    setActivePosts(posts, index) {
        this.setState({
            currentPosts: posts,
            currentIndex: index
        });
    }

    refreshList() {
        this.retrievePosts();
        this.setState({
            currentPosts: null,
            currentIndex: -1
        });
    }

    render() {
        const { posts, currentPosts, currentIndex } = this.state;

        return (
            <Container className={classes.FormBody}>
                <div className="list row">

                    <div className="col-md-6">
                        <h4>Lista de Publicaciones</h4>

                        <ul className="list-group">
                            {posts &&
                                posts.map((posts, index) => (
                                    <li
                                        className={
                                            "list-group-item " +
                                            (index === currentIndex ? "active" : "")
                                        }
                                        onClick={() => this.setActivePosts(posts, index)}
                                        key={index}
                                    >
                                        {posts.name}
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className="col-md-6">
                        {currentPosts ? (
                            <div>
                                <h4>Publicacion</h4>
                                <div>
                                    <label>
                                        <strong>Nombre:</strong>
                                    </label>{" "}
                                    {currentPosts.name}
                                </div>
                                <div>
                                    <label>
                                        <strong>Descripcion:</strong>
                                    </label>{" "}
                                    {currentPosts.description}
                                </div>
                                <div>
                                    <label>
                                        <strong>Dueño:</strong>
                                    </label>{" "}
                                    {currentPosts.owner}
                                </div>
                            </div>
                        ) : (
                                <div>
                                    <br />
                                    <p>Please click on a Posts...</p>
                                </div>
                            )}
                    </div>
                </div>
            </Container>

        );
    }

}

export default Posts; 