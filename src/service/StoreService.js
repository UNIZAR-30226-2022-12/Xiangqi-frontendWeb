import axios from 'axios';

var http = null;

class StoreService {

    constructor ({url}) {
        console.log(url);
        http = axios.create({baseURL: url});
    }

    /*
     * Obtiene la lista de tableros y de piezas que tiene la tienda
     */
    getStoreItems(){
        const headers = {'headers': {'x-access-token': sessionStorage.getItem('token')}}
        return http
            .get('/do-getStoreItems/', headers)
            .then(response => {
                return response.data;
            }, () => {
                return false;
            });
    }

    /*
     * Obtiene los puntos del usuario
     */
    getPoints() {
        const headers = {'headers': {'x-access-token': sessionStorage.getItem('token')}}
        return http
        .get('/do-getPoints/', headers)
        .then(response => {
            return response.data;
        }, () => {
            return false;
        });
    }

    /*
     * Envia al back los puntos que ha de restar al usuario
     */
    updatePoints(price) {
        const headers = {'headers': {'x-access-token': sessionStorage.getItem('token')}}
        return http
            .post('/do-updatePoints/', {'price': price}, headers);
    }

    /*
     * Envia al back el tablero que ha comprado el usuario para poner su campo 'purchased' a true
     */
    purchaseBoard(boardId) {
        const headers = {'headers': {'x-access-token': sessionStorage.getItem('token')}}
        return http
            .post('/do-purchaseBoard/', {'id': boardId}, headers);
    }

    /*
     * Envia al back el set de piezas que ha comprado el usuario para poner su campo 'purchased' a true
     */
    purchasePiece(pieceId) {
        const headers = {'headers': {'x-access-token': sessionStorage.getItem('token')}}
        return http
            .post('/do-purchasePiece/', {'id': pieceId}, headers);
    }
}

export default new StoreService({
    url: "http://ec2-3-82-235-243.compute-1.amazonaws.com:3000"
});