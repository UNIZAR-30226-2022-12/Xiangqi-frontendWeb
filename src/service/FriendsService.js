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
        const headers = {'headers': {'x-access-token': localStorage.getItem('token')}}
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
        const headers = {'headers': {'x-access-token': localStorage.getItem('token')}}
        return http
            .post('/do-getFriendRequests/', headers)
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
        const headers = {'headers': {'x-access-token': localStorage.getItem('token')}}
        return http
            .post('/do-getFriends/', headers)
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