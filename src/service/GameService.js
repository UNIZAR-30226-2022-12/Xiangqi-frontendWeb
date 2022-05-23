import io from 'socket.io-client';
class GameService {
    constructor(){
        this.socket = io("http://ec2-3-82-235-243.compute-1.amazonaws.com:3005")
        //console.log("creado")
    }
}

    

export default new GameService();