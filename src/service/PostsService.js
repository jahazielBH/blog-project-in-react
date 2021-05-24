import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = "https://basilio-mongo-api.herokuapp.com/api/posts";

class PostsService {

    getPosts(){
        return axios.get(API_URL, { headers: authHeader() }).then(response =>{return response.data.posts;
        });
    }

    createPosts(posts){
        return axios.post(API_URL, posts, { headers: authHeader() });
    }

}

export default new PostsService();