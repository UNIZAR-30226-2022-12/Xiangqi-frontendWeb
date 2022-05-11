import axios from 'axios';

var http = null;

class StoreService {

    constructor ({url}) {
        console.log(url);
        http = axios.create({baseURL: url});
    }

    // SEARCH USER
    //------------------------------------------------------------------------------------------------------------------
    /*
     * Obtiene la lista de tableros y de piezas que tiene la tienda
     */
     getStoreItems(){
        const headers = {'headers': {'x-access-token': localStorage.getItem('token')}}
        return http
            .post('/do-getStoreItems/', headers)
            .then(response => {
                return response.data;
            }, () => {
                return false;
            });
    }
}

export default new StoreService({
    url: "http://ec2-3-82-235-243.compute-1.amazonaws.com:3000"
});