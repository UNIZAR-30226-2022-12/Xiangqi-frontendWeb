import http from './http';

class RankingService {

    constructor () {}

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

export default new RankingService();