import axios from 'axios';

var http = null;

class AccountService {

    authenticated = false;

    constructor ({url}) {
        console.log(url);
        http = axios.create({baseURL: url});
    }

    // CREAR UNA CUENTA
    //------------------------------------------------------------------------------------------------------------------
    /*
     * Crea una cuenta a partir del nickname, name, email, birthDay, country, password, image
     * proporcionados en la form de login.
     */
    createAccount(nickname, name, email, date, country, password, image){
        return http
            .post('/do-create', {'nickname': nickname, 'name': name, 'email': email, 'date': date, 'country': country, 'pwd': password, 'image': image})
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
    //------------------------------------------------------------------------------------------------------------------
    /*
     * Autentica al usuario con el email y la contraseña dadas llamando al método
     * /do-login del backend.
     */
    login(email, password){
        return http
            .post('/do-login', {'email': email, 'pwd': password})
            .then(response => {
                if (response.data.ok) {
                    sessionStorage.setItem('token', response.data.token);
                    sessionStorage.setItem('id', response.data.id);
                    this.authenticated = true;
                    return response.data;
                }
                return {'ok': false};
            }, () => {
                return  {'ok': false};
            });
    }

    /*
     * Si existe un token en el sessionStorage pone authenticated a true.
     * Pone authenticated a false en caso contrario.
     */
    isAuthenticated(){
        if(sessionStorage.getItem('token') != null){
            this.authenticated = true;
        } else {
            this.authenticated = false;
        }
        return this.authenticated;
    }

    /*
     * Función para desloguear al usuario. Retira del local storage el token, el id y
     * pone authenticated a false.
     */
    logout() {
        this.authenticated = false;
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('id');
    }

    /*
     * Valida el usuario registrado dado su email.
     */
    validate(email){
        return http
            .post('/do-validate', {'email': email})
            .then(response => {
                return response.data;
            }, () => {
                return false;
            });
    }

    /*
     * Si el usuario olvida su contraseña llama a do-forgotPwd del backend con
     * el email dado.
     */
    forgotPwd(email){
        return http
            .post('/do-forgotPwd', {'email': email})
            .then(response => {
                return response.data;
            }, () => {
                return false;
            });
    }

    /*
     * Obtiene la lista de paises del backend. 
     */
    getCountries(){
        return http
            .get('/do-getCountries')
            .then(response => {
                return response.data;
            }, () => {
                return false;
            });
    }

    //CAMBIAR CONTRASEÑA
    //------------------------------------------------------------------------------------------------------------------
    /*
     * Permite el cambio de contraseña de un usuario dado su email y su nueva contraseña.
     */
    changePwd(email, pwd){
        return http
            .post('/do-changePwd', {'email': email, 'pwd': pwd})
            .then(response => {
                return response.data;
            }, () => {
                return false;
            });
    }

    // PERFIL DE USUARIO
    //------------------------------------------------------------------------------------------------------------------
    /*
     * Obtiene el perfil del usuario (mail, nickname, name, birthday, country, range, points y registerDate) dado su id.
     */
    getProfile(id){
        const headers = {'headers': {'x-access-token': sessionStorage.getItem('token')}};
        return http
            .get('/do-getProfile/' + id, headers)
            .then(response => {
                return response.data;
            }, () => {
                return false;
            });
    }
    getNickname(id){
        return http
            .get('/do-getNickname/' + id)
            .then(response => {
                return response.data;
            }, () => {
                return false;
            });
    }

    /*
     * Obtiene la URL de la imagen del perfil del usuario dado su id.
     */
    getProfileImage(id) {
        const headers = {'headers': {'x-access-token': sessionStorage.getItem('token')}, 'responseType': 'blob'};

        return http
            .get('/do-getProfileImage/' + id, headers)
            .then(response => {
                return URL.createObjectURL(response.data);
            }, () => {
                return false;
            });
    }

    /*
     * Obtiene la lista de partidas asincronas asociadas al usuario dado su id.
     */
    getGames(id){
        return http
            .get('/do-getPartidas/' + id)
            .then(response => {
                response.data.perfil.foto = "data:image/png;base64," + String(response.data.perfil.foto)
                return true;
            }, () => {
                return [{id:20, image: 'images/profilePlaceholder.svg', nickname: 'Pikanachi', flag: 'flag-es', country: 'Spain', startDate:'01/01/2020', lastMovDate:'01/01/2021', myTurn: false}];
            });
    }
    // MODIFICAR PERFIL DE USUARIO
    //------------------------------------------------------------------------------------------------------------------
    /*
     * Envia los datos a modificar del perfil al backend
     */
    changeProfile(nickname, name, date, country, password, image){
        const headers = {'headers': {'x-access-token': sessionStorage.getItem('token')}}
        if(password.length == 0){
            return http
            .post('/do-changeProfile/' + nickname + '/' + name + '/' + date + '/' + country + '/' + 'a', {'image': image}, headers)
            .then(response => {
                return response.data;
            }, () => {
                return false;
            });
        } else {
            return http
            .post('/do-changeProfile/' + nickname + '/' + name + '/' + date + '/' + country + '/' + password, {'image': image}, headers)
            .then(response => {
                return response.data;
            }, () => {
                return false;
            });
        }
    }
    // ELIMINAR PERFIL DE USUARIO
    //------------------------------------------------------------------------------------------------------------------
    /*
     * Elimina el perfil
     */
    deleteAccount(){
        const headers = {'headers': {'x-access-token': sessionStorage.getItem('token')}}
        return http
            .get('/do-deleteAccount/', headers)
            .then(response => {
                return response.data;
            }, () => {
                return false;
            });
    }

    // LOAD GAME
    //------------------------------------------------------------------------------------------------------------------
    /*
     * CARGAR PARTIDA
     */
    loadGame(id){
        const headers = {'headers': {'x-access-token': sessionStorage.getItem('token')}}


        // ----------------> en vd ya tienes el token y de ahi se puede sacar el id del usuario por lo q no hace ni falta el id


        return http
            .post('/do-loadGame/', {'id': id}, headers)
            .then(response => {
                console.log(response.data)
                return response.data;
            }, () => {
                return false;
            });
    }

    // HISTORIAL
    //------------------------------------------------------------------------------------------------------------------
    /*
     * Devuelve el historial de movimientos del usuario a partir del id en el token.
     */
    getHistorial(){
        const headers = {'headers': {'x-access-token': sessionStorage.getItem('token')}}
        return http
            .get('/do-getHistorial/', headers)
            .then(response => {
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