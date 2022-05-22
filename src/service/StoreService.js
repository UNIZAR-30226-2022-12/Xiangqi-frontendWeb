import http from './http';

class StoreService {

    constructor () {}

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
     * Envia al back el item que ha comprado el usuario para poner su campo 'purchased' a true y actualizar el saldo
     */
    purchaseItem(id, tipo, price) {
        const headers = {'headers': {'x-access-token': sessionStorage.getItem('token')}}
        return http
            .post('/do-purchaseItem/', {'id': id, 'tipo': tipo, 'price': price}, headers);
    }
}

export default new StoreService();