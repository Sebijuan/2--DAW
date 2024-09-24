function eleccionjugador(seleccionJugador){
    const eleccionmaquina = Math.floor(Math.random() *3 ) +1;
    console.log("Eleccion jugador", seleccionJugador);
    console.log("Eleccion maquina", eleccionmaquina);

    if(seleccionJugador === eleccionmaquina){
        console.log("Empate");
    }else if((seleccionJugador === 1 && eleccionmaquina ===3 ) ||
            (seleccionJugador === 2 && eleccionmaquina === 1) ||
            (seleccionJugador === 3 && eleccionmaquina === 2)) {
                console.log("Ganaste");
            }else {
                console.log("Gano la maquina");
            }

           
            
}
        eleccionjugador(1);