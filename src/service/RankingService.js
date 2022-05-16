import axios from 'axios';

var http = null;

class RankingService {

    constructor ({url}) {
        console.log(url);
        http = axios.create({baseURL: url});
    }

    // SEARCH USER
    //------------------------------------------------------------------------------------------------------------------
    /*
     * Obtiene la lista de tableros y de piezas que tiene la tienda
     */
    getRanking(){
        const headers = {'headers': {'x-access-token': sessionStorage.getItem('token')}}
        return http
            .get('/do-getRanking/', headers)
            .then(response => {
                return response.data;
            }, () => {
                return false;
            });
    }
}

export default new RankingService({
    url: "http://ec2-3-82-235-243.compute-1.amazonaws.com:3000"
});