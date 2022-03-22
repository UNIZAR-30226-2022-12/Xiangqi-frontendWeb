import axios from 'axios';

var http = null;

class AccountService {

    authenticated = false;

    constructor ({url}) {
        console.log(url);
        http = axios.create({baseURL: url});
    }

    // CREAR UNA CUENTA
    // Pasarle al back por post los parámetros que el front te da
    createAccount(nickname, name, email, date, country, password){
        return http
            .post('/do-create', {'nickname': nickname, 'name': name, 'email': email, 'date': date, 'country': country, 'pwd': password})
            //la respuesta que da el backend
            .then(response => {
                //le pido al back, ¿hay cambios? ¿hay cambios?
                //setTimeout(this.authenticate, 1000);
                return response.data;
            //Si no hay respuesta del backend, espera 1 segundo y vuelve a intentarlo
            }, () => {
                //setTimeout(this.authenticate, 1000);
                return false;
            });
    }

    // AUTENTICAR AL USUARIO
    login(email, password){
        return http
            .post('/do-login', {'email': email, 'pwd': password})
            .then(response => {
                console.log(response.data)
                if (response.data.ok) {
                    localStorage.setItem('email', email);
                    this.authenticated = true;
                    return true;
                }
                return false;
            }, () => {
                return false;
            });
    }

    isAuthenticated(){
        return this.authenticated;
    }

    logout() {
        localStorage.removeItem('email');
    }
    profile(email){
        return http
            .post('/do-profile', {'email': email})
            .then(response => {
                console.log(response.data)
                return response.data;
            }, () => {
                return false;
            });
    }
}

export default new AccountService({
    //url: "http://" + window.location.hostname + ":8000"
    url: "http://ec2-3-82-235-243.compute-1.amazonaws.com:3000"
});
