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
                    localStorage.setItem("user", JSON.stringify(response.data.token));
                }

                return response;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(name, pass, pass_confirm) {
        return axios.post(API_URL + "signup", {
          name,
          pass,
          pass_confirm
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }

}

export default new ApiService();
