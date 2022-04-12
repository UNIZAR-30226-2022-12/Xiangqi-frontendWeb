class GameService {
    calcMov(indexFil, indexCol, item){
        console.log(indexFil, indexCol);
        this.selectedTile = this.tablero.filas[indexFil][indexCol]
        if(item.moves.length == 0){ //Cada vez que movamos una ficha sus movimientos pasaran a 0, pero si no calculamos sus movimientos y los guardamos hasta el movimiento
            //MOVIMIENTOS POSIBLES DEL GENERAL
            if(item.pieza == "general"){
                if(indexCol != 5){
                    if (this.tablero.filas[indexFil][indexCol + 1].pieza == "" || this.tablero.filas[indexFil][indexCol + 1].color != item.color){
                        //COMPROBAR JAQUE
                        item.moves.push({f: indexFil, c: indexCol + 1})
                    }
                }
                if(indexCol != 3){
                    if (this.tablero.filas[indexFil][indexCol - 1].pieza == "" || this.tablero.filas[indexFil][indexCol - 1].color != item.color){
                        //COMPROBAR JAQUE
                        item.moves.push({f: indexFil, c: indexCol - 1})
                    }
                }
                if(indexFil != 9){
                    if (this.tablero.filas[indexFil + 1][indexCol].pieza == "" || this.tablero.filas[indexFil + 1][indexCol].color != item.color ){
                        //COMPROBAR JAQUE
                        item.moves.push({f: indexFil + 1, c: indexCol})
                    }
                }
                if(indexFil != 7){
                    if (this.tablero.filas[indexFil - 1][indexCol].pieza == "" || this.tablero.filas[indexFil - 1][indexCol].color != item.color ){
                        //COMPROBAR JAQUE
                        item.moves.push({f: indexFil - 1, c: indexCol})
                    }
                }
            }

            // -------------------------------------------------------------------------------------------------
            //MOVIMIENTOS POSIBLES DEL OFICIAL
            else if(item.pieza == "oficial"){
                if(indexCol != 5 && indexFil != 9){
                    if (this.tablero.filas[indexFil + 1][indexCol + 1].pieza == "" || this.tablero.filas[indexFil + 1][indexCol + 1].color != item.color){
                        //COMPROBAR JAQUE
                        item.moves.push({f: indexFil + 1, c: indexCol + 1})
                    }
                }
                if(indexCol != 3 && indexFil != 9){
                    if (this.tablero.filas[indexFil + 1][indexCol - 1].pieza == "" || this.tablero.filas[indexFil + 1][indexCol - 1].color != item.color){
                        //COMPROBAR JAQUE
                        item.moves.push({f: indexFil + 1, c: indexCol - 1})
                    }
                }
                if(indexCol != 5 && indexFil != 3){
                    if (this.tablero.filas[indexFil - 1][indexCol + 1].pieza == "" || this.tablero.filas[indexFil - 1][indexCol + 1].color != item.color){
                        //COMPROBAR JAQUE
                        item.moves.push({f: indexFil - 1, c: indexCol + 1})
                    }
                }
                if(indexCol != 3 && indexFil != 3){
                    if (this.tablero.filas[indexFil - 1][indexCol - 1].pieza == "" || this.tablero.filas[indexFil - 1][indexCol - 1].color != item.color){
                        //COMPROBAR JAQUE
                        item.moves.push({f: indexFil - 1, c: indexCol - 1})
                    }
                }
            }

            // -------------------------------------------------------------------------------------------------
            //MOVIMIENTOS POSIBLES DEL ELEFANTE
            else if(item.pieza == "elefante"){
                if(indexCol != 8 && indexFil != 9){
                    if(this.tablero.filas[indexFil + 1][indexCol + 1].pieza == ""){
                        if (this.tablero.filas[indexFil + 2][indexCol + 2].pieza == "" || this.tablero.filas[indexFil + 2][indexCol + 2].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil + 2, c: indexCol + 2})
                        }
                    }
                }
                if(indexCol != 0 && indexFil != 9){
                    if(this.tablero.filas[indexFil + 1][indexCol - 1].pieza == ""){
                        if (this.tablero.filas[indexFil + 2][indexCol - 2].pieza == "" || this.tablero.filas[indexFil + 2][indexCol - 2].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil + 2, c: indexCol - 2})
                        }
                    }
                }
                if(indexCol != 8 && indexFil != 5){
                    if(this.tablero.filas[indexFil - 1][indexCol + 1].pieza == ""){
                        if (this.tablero.filas[indexFil - 2][indexCol + 2].pieza == "" || this.tablero.filas[indexFil - 2][indexCol + 2].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil - 2, c: indexCol + 2})
                        }
                    }
                }
                if(indexCol != 0 && indexFil != 5){
                    if(this.tablero.filas[indexFil - 1][indexCol - 1].pieza == ""){
                        if (this.tablero.filas[indexFil - 2][indexCol - 2].pieza == "" || this.tablero.filas[indexFil - 2][indexCol - 2].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil - 2, c: indexCol - 2})
                        }
                    }
                }
            }

            // -------------------------------------------------------------------------------------------------
            //MOVIMIENTOS POSIBLES DEL CABALLO
            else if(item.pieza == "caballo"){
                if(indexCol > 1 && indexFil < 9){
                    if(this.tablero.filas[indexFil][indexCol - 1].pieza == ""){
                        if (this.tablero.filas[indexFil + 1][indexCol - 2].pieza == "" || this.tablero.filas[indexFil + 1][indexCol - 2].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil + 1, c: indexCol - 2})
                        }
                    }
                }
                if(indexCol < 7 && indexFil < 9){
                    if(this.tablero.filas[indexFil][indexCol + 1].pieza == ""){
                        if (this.tablero.filas[indexFil + 1][indexCol + 2].pieza == "" || this.tablero.filas[indexFil + 1][indexCol + 2].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil + 1, c: indexCol + 2})
                        }
                    }
                }
                if(indexCol > 1 && indexFil > 0){
                    if(this.tablero.filas[indexFil][indexCol - 1].pieza == ""){
                        if (this.tablero.filas[indexFil - 1][indexCol - 2].pieza == "" || this.tablero.filas[indexFil - 1][indexCol - 2].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil - 1, c: indexCol - 2})
                        }
                    }
                }
                if(indexCol < 7 && indexFil > 0){
                    if(this.tablero.filas[indexFil][indexCol + 1].pieza == ""){
                        if (this.tablero.filas[indexFil + 1][indexCol + 2].pieza == "" || this.tablero.filas[indexFil + 1][indexCol + 2].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil - 1, c: indexCol + 2})
                        }
                    }
                }
                if(indexCol < 8 && indexFil > 1){
                    if(this.tablero.filas[indexFil - 1][indexCol].pieza == ""){
                        if (this.tablero.filas[indexFil - 2][indexCol + 1].pieza == "" || this.tablero.filas[indexFil - 2][indexCol + 1].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil - 2, c: indexCol + 1})
                        }
                    }
                }
                if(indexCol > 0 && indexFil > 1){
                    if(this.tablero.filas[indexFil - 1][indexCol].pieza == ""){
                        if (this.tablero.filas[indexFil - 2][indexCol - 1].pieza == "" || this.tablero.filas[indexFil - 2][indexCol - 1].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil - 2, c: indexCol - 1})
                        }
                    }
                }
                if(indexCol < 8 && indexFil < 8){
                    if(this.tablero.filas[indexFil + 1][indexCol].pieza == ""){
                        if (this.tablero.filas[indexFil + 2][indexCol + 1].pieza == "" || this.tablero.filas[indexFil + 2][indexCol + 1].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil + 2, c: indexCol + 1})
                        }
                    }
                }
                if(indexCol > 0 && indexFil < 8){
                    if(this.tablero.filas[indexFil + 1][indexCol].pieza == ""){
                        if (this.tablero.filas[indexFil + 2][indexCol - 1].pieza == "" || this.tablero.filas[indexFil + 2][indexCol - 1].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil + 2, c: indexCol - 1})
                        }
                    }
                }
            }

            // -------------------------------------------------------------------------------------------------
            //MOVIMIENTOS POSIBLES DE LA TORRE
            else if(item.pieza == "torre"){
                //Iterar al norte
                let it = 1
                for(let i = indexFil; i > 0; i --){
                    if(this.tablero.filas[indexFil - it][indexCol].pieza == ""){
                            item.moves.push({f: indexFil - it, c: indexCol})
                    } else{
                        if(this.tablero.filas[indexFil - it][indexCol].color != item.color){
                            item.moves.push({f: indexFil - it, c: indexCol})
                        }
                        break
                    }
                    it += 1
                }
                //Iterar al sur
                it = 1
                for(let i = indexFil; i < 9; i ++){
                    if(this.tablero.filas[indexFil + it][indexCol].pieza == ""){
                            item.moves.push({f: indexFil + it, c: indexCol})
                    } else{
                        if(this.tablero.filas[indexFil + it][indexCol].color != item.color){
                            item.moves.push({f: indexFil + it, c: indexCol})
                        }
                        break
                    }
                    it += 1
                }
                //Iterar al este
                it = 1
                for(let i = indexCol; i < 8; i ++){
                    if(this.tablero.filas[indexFil][indexCol + it].pieza == ""){
                            item.moves.push({f: indexFil, c: indexCol + it})
                    } else{
                        if(this.tablero.filas[indexFil][indexCol + it].color != item.color){
                            item.moves.push({f: indexFil, c: indexCol + it})
                        }
                        break
                    }
                    it += 1
                }
                //Iterar al oeste
                it = 1
                for(let i = indexCol; i > 0; i --){
                    if(this.tablero.filas[indexFil][indexCol - it].pieza == ""){
                            item.moves.push({f: indexFil, c: indexCol - it})
                    } else{
                        if(this.tablero.filas[indexFil][indexCol - it].color != item.color){
                            item.moves.push({f: indexFil, c: indexCol - it})
                        }
                        break
                    }
                    it += 1
                }
            }

            //MOVIMIENTOS POSIBLES DEL SOLDADO
            else if(item.pieza == "soldado"){
                if(item.color == "rojo"){
                    if(indexFil > 5){ // Solo para arriba
                        if (this.tablero.filas[indexFil - 1][indexCol].pieza == "" || this.tablero.filas[indexFil - 1][indexCol].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil - 1, c: indexCol})
                        }
                    } else{ // Norte, este y oeste
                        if(indexCol != 8){ // Oeste
                            if (this.tablero.filas[indexFil][indexCol + 1].pieza == "" || this.tablero.filas[indexFil][indexCol + 1].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil, c: indexCol + 1})
                            }
                        }
                        if(indexCol != 0){
                            if (this.tablero.filas[indexFil][indexCol - 1].pieza == "" || this.tablero.filas[indexFil][indexCol - 1].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil, c: indexCol - 1})
                            }
                        }
                        if(indexFil != 0){
                            if (this.tablero.filas[indexFil - 1][indexCol].pieza == "" || this.tablero.filas[indexFil - 1][indexCol].color != item.color ){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil - 1, c: indexCol})
                            }
                        }
                    }
                } else{
                    if(indexFil <= 5){ // Solo para abajo
                        if (this.tablero.filas[indexFil + 1][indexCol].pieza == "" || this.tablero.filas[indexFil + 1][indexCol].color != item.color ){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil + 1, c: indexCol})
                        }
                    } else{ // Norte, este y oeste
                        if(indexCol != 8){ // Oeste
                            if (this.tablero.filas[indexFil][indexCol + 1].pieza == "" || this.tablero.filas[indexFil][indexCol + 1].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil, c: indexCol + 1})
                            }
                        }
                        if(indexCol != 0){
                            if (this.tablero.filas[indexFil][indexCol - 1].pieza == "" || this.tablero.filas[indexFil][indexCol - 1].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil, c: indexCol - 1})
                            }
                        }
                        if(indexFil != 9){
                            if (this.tablero.filas[indexFil + 1][indexCol].pieza == "" || this.tablero.filas[indexFil + 1][indexCol].color != item.color ){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil + 1, c: indexCol})
                            }
                        }
                    }
                }
            }

            // -------------------------------------------------------------------------------------------------
            //MOVIMIENTOS POSIBLES DE LA CANYON
            else if(item.pieza == "canyon"){
                //Iterar al norte
                let it = 1
                let saltar = false
                for(let i = indexFil; i > 0; i --){
                    if(this.tablero.filas[indexFil - it][indexCol].pieza == ""){
                        if(!saltar){
                            console.log("MOVEMOS")
                            item.moves.push({f: indexFil - it, c: indexCol})
                        } else{
                            console.log("VOLAMOS")
                        }
                            
                    } else{ // Encontramos una pieza
                        if(this.tablero.filas[indexFil - it][indexCol].color != item.color){
                            if(saltar){
                                console.log("COMEMOS")
                                item.moves.push({f: indexFil - it, c: indexCol})
                            } else{
                                if(saltar){
                                    console.log("NOS CAEMOS")
                                    break
                                } else{
                                    console.log("SALTAMOS")
                                    saltar = true
                                }
                            }
                        } else {// SALTAR
                            if(saltar){
                                console.log("NOS CAEMOS")
                                break
                            } else{
                                console.log("SALTAMOS")
                                saltar = true
                            }
                        }
                    }
                    it += 1
                }
                //Iterar al sur
                it = 1
                saltar = false
                for(let i = indexFil; i < 9; i ++){
                    if(this.tablero.filas[indexFil + it][indexCol].pieza == ""){
                            if(!saltar){
                            console.log("MOVEMOS")
                            item.moves.push({f: indexFil + it, c: indexCol})
                        } else{
                            console.log("VOLAMOS")
                        }
                            
                    } else{ // Encontramos una pieza
                        if(this.tablero.filas[indexFil + it][indexCol].color != item.color){
                            if(saltar){
                                console.log("COMEMOS")
                                item.moves.push({f: indexFil + it, c: indexCol})
                            } else{
                                if(saltar){
                                    console.log("NOS CAEMOS")
                                    break
                                } else{
                                    console.log("SALTAMOS")
                                    saltar = true
                                }
                            }
                        } else {// SALTAR
                            if(saltar){
                                console.log("NOS CAEMOS")
                                break
                            } else{
                                console.log("SALTAMOS")
                                saltar = true
                            }
                        }
                    }
                    it += 1
                }
                //Iterar al este
                it = 1
                saltar = false
                for(let i = indexCol; i < 8; i ++){
                    if(this.tablero.filas[indexFil][indexCol + it].pieza == ""){
                            if(!saltar){
                            console.log("MOVEMOS")
                            item.moves.push({f: indexFil, c: indexCol + it})
                        } else{
                            console.log("VOLAMOS")
                        }
                            
                    } else{ // Encontramos una pieza
                        if(this.tablero.filas[indexFil][indexCol + it].color != item.color){
                            if(saltar){
                                console.log("COMEMOS")
                                item.moves.push({f: indexFil, c: indexCol  + it})
                            } else{
                                if(saltar){
                                    console.log("NOS CAEMOS")
                                    break
                                } else{
                                    console.log("SALTAMOS")
                                    saltar = true
                                }
                            }
                        } else {// SALTAR
                            if(saltar){
                                console.log("NOS CAEMOS")
                                break
                            } else{
                                console.log("SALTAMOS")
                                saltar = true
                            }
                        }
                    }
                    it += 1
                }
                //Iterar al oeste
                it = 1
                saltar = false
                for(let i = indexCol; i > 0; i --){
                    if(this.tablero.filas[indexFil][indexCol - it].pieza == ""){
                            if(!saltar){
                            console.log("MOVEMOS")
                            item.moves.push({f: indexFil, c: indexCol - it})
                        } else{
                            console.log("VOLAMOS")
                        }
                            
                    } else{ // Encontramos una pieza
                        if(this.tablero.filas[indexFil][indexCol - it].color != item.color){
                            if(saltar){
                                console.log("COMEMOS")
                                item.moves.push({f: indexFil, c: indexCol  - it})
                            } else{
                                if(saltar){
                                    console.log("NOS CAEMOS")
                                    break
                                } else{
                                    console.log("SALTAMOS")
                                    saltar = true
                                }
                            }
                        } else {// SALTAR
                            if(saltar){
                                console.log("NOS CAEMOS")
                                break
                            } else{
                                console.log("SALTAMOS")
                                saltar = true
                            }
                        }
                    }
                    it += 1
                }
            }
                
            item.moves.forEach(move => {
                console.log(move)
            });
        } else{
            item.moves.forEach(move => {
                console.log(move)
            });
            console.log("Ya visto")
        }
    }
}

export default new GameService({
});