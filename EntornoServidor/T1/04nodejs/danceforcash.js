function danceforcash(puntuacion){
    const ganancias = [];
    
    for(let i = 0; i< puntuacion.length; i++){
        let puntuaciones = puntuacion[i];
        let dinero= 0;

        if(puntuaciones>= 0 && puntuaciones<= 50){
            dinero = 0;
        }else if (puntuaciones>= 51 && puntuaciones<= 75){
            dinero = 10;
        }else if (puntuaciones >= 76 && puntuaciones<= 90){
            dinero = 20;
        }else if (puntuaciones>= 91 && puntuaciones <=100){
            dinero = 50;
        }else{
            console.log(`Puntuacion no valida:${puntuaciones}`);
            continue;
        }

        ganancias.push(`Bailarin ${i + 1}: $${dinero}`)
    }

        return ganancias;

}

const puntuacion = [30, 60, 80, 95, 45];
const resultado = danceforcash(puntuacion);
console.log(resultado.join('\n'));
