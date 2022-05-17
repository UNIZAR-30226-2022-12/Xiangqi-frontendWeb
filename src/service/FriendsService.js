import axios from 'axios';

var http = null;

class FriendsService {

    constructor ({url}) {
        console.log(url);
        http = axios.create({baseURL: url});
    }

    // SEARCH USER
    //------------------------------------------------------------------------------------------------------------------
    /*
     * Obtiene la lista de usuarios a partir del nickname puesto en el campo de busqueda
     */
    searchUser(nickname) {
        const headers = {'headers': {'x-access-token': sessionStorage.getItem('token')}}
        return http
            .post('/do-searchUsers/', {'nickname': nickname}, headers)
            .then(response => {
                return response.data;
            }, () => {
                return false;
            });
    }

    // GET FRIEND REQUESTS
    //------------------------------------------------------------------------------------------------------------------
    /*
     * Obtiene la lista de solicitudes de amistad
     */
    getFriendRequests() {
        const headers = {'headers': {'x-access-token': sessionStorage.getItem('token')}}
        return http
            .get('/do-getFriendRequests/', headers)
            .then(response => {
                return response.data;
            }, () => {
                return false;
            });
    }

    // GET FRIENDS
    //------------------------------------------------------------------------------------------------------------------
    /*
     * Obtiene la lista de amigos
     */
    getFriends() {
        const headers = {'headers': {'x-access-token': sessionStorage.getItem('token')}}
        return http
            .get('/do-getFriends/', headers)
            .then(response => {
                return response.data;
            }, () => {
                return false;
            });
    }

    /*
     * Envia al al back que el usuario ha rechazado la solicitud de amistad
     */
    rejectRequest(id) {
        const headers = {'headers': {'x-access-token': sessionStorage.getItem('token')}}
        return http
            .post('/do-rejectRequest/', {'id': id}, headers)
            .then(response => {
                return response.data;
            }, () => {
                return false;
            });
    }

    /*
     * Envia al al back que el usuario ha aceptado la solicitud de amistad
     */
    acceptRequest(id) {
        const headers = {'headers': {'x-access-token': sessionStorage.getItem('token')}}
        return http
            .post('/do-acceptRequest/', {'id': id}, headers)
            .then(response => {
                return response.data;
            }, () => {
                return false;
            });
    }
}

export default new FriendsService({
    url: "http://ec2-3-82-235-243.compute-1.amazonaws.com:3000"
});