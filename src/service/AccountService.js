import axios from 'axios';

var http = null;

class AccountService {

    authenticated = false;

    constructor ({url}) {
        console.log(url);
        http = axios.create({baseURL: url});
    }

    // CREAR UNA CUENTA
    createAccount(nickname, name, email, date, country, password, image){
        console.log(image)
        return http
            .post('/do-create', {'nickname': nickname, 'name': name, 'email': email, 'date': date, 'country': country, 'pwd': password, 'image': image})
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
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('id', response.data.id);
                    localStorage.setItem('email', email);
                    console.log('id', response.data.id);
                    this.authenticated = true;
                    return response.data;
                }
                return {'ok': false};
            }, () => {
                return  {'ok': false};
            });
    }

    isAuthenticated(){
        return this.authenticated;
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
    }

    validate(email){
        return http
            .post('/do-validate', {'email': email})
            .then(response => {
                console.log(response.data)
                return response.data;
            }, () => {
                return false;
            });
    }

    forgotPwd(email){
        return http
            .post('/do-forgotPwd', {'email': email})
            .then(response => {
                console.log(response.data)
                return response.data;
            }, () => {
                return false;
            });
    }

    getCountries(){
        return http
            .get('/do-getCountries')
            .then(response => {
                return response.data;
            }, () => {
                return false;
            });
    }

    // PERFIL DE USUARIO
    getProfile(){
        return http
            .get('/do-getProfile/' + String(localStorage.getItem("email")))
            .then(response => {
                response.data.perfil.foto = "data:image/png;base64," + String(response.data.perfil.foto)
                return response.data;
            }, () => {
                return false;
            });
    }

    getProfileImage() {
        const headers = {'headers': {'x-access-token': localStorage.getItem('token')}, 'responseType': 'blob'};

        let id = localStorage.getItem('id');
        return http
            .get('/do-getProfileImage/' + id, headers)
            .then(response => {
                return URL.createObjectURL(response.data);
            }, () => {
                return false;
            });
    }
    getPartidas(){
        return http
            .get('/do-getPartidas/' + String(localStorage.getItem("id")))
            .then(response => {
                response.data.perfil.foto = "data:image/png;base64," + String(response.data.perfil.foto)
                return true;
            }, () => {
                return [{image: 'images/profilePlaceholder.svg', nickname: 'Pikanachi', flag: 'flag-es', country: 'Spain', startDate:'01/01/2020', lastMovDate:'01/01/2021', myTurn: false}];
            });
    }
    changePwd(email, pwd){
        return http
            .post('/do-changePwd', {'email': email, 'pwd': pwd})
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