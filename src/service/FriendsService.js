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
     * BUSCAR USUARIO
     */
     searchUser(nickname){
        const headers = {'headers': {'x-access-token': localStorage.getItem('token')}}
        console.log(nickname)
        //Cambiar al ID, en el back tbn, el nickname no es unique
        return http
            .post('/do-getSearchUsers/',{'nickname': String(nickname)} ,headers)
            .then(response => {
                console.log("LLEGAN LOS AMIGOS: ", response.data)
                return response.data;
            }, () => {
                return false;
            });
    }
}

export default new FriendsService({
    //url: "http://" + window.location.hostname + ":8000"
    url: "http://ec2-3-82-235-243.compute-1.amazonaws.com:3000"
});