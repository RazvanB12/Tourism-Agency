import axios from "axios";

const USERS_URL = "http://localhost:8000/users";
const LOGIN_URL = "http://localhost:8000/login";

class UserService {

    saveUser(user) {
        return axios.post(USERS_URL, user);
    }

    login(user) {
        return axios.post(LOGIN_URL, user);
    }

    getUser(id) {
        return axios.get(USERS_URL + "/" + id);
    }

}

export default new UserService;