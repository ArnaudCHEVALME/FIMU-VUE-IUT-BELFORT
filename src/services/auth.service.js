import axios from 'axios';

class AuthService {
    login(user) {
        return axios
            .post('/api/auth/signin', {
                login: user.login,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post('/api/auth/signup', {
            username: user.username,
            email: user.email,
            password: user.password,
            roleId:user.roleId
        });
    }
}

export default new AuthService();
