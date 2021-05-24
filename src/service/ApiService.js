import axios from 'axios';

const API_URL = "https://basilio-mongo-api.herokuapp.com/api/";

class ApiService {
    login(name, password) {
        return axios
            .post(API_URL + "login", {
                name,
                password
            })
            .then(response => {
                if (response.data.token) {
                    sessionStorage.setItem("user", JSON.stringify(response.data.token));
                }
                console.log(response);
                return response;
            });
    }

    logout() {
        sessionStorage.removeItem("user");
    }

    register(name, pass, pass_confirm) {
        return axios.post(API_URL + "signup", {
          name,
          pass,
          pass_confirm
        });
    }

    getCurrentUser() {
        return JSON.parse(sessionStorage.getItem('user'));;
    }

}

export default new ApiService();
