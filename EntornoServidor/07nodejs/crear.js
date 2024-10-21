async function combinedFlow() {
    console.log("Inicio del flujo combinado");
  
    // Operación síncrona
    console.log("Operación 1: Síncrono, se ejecuta de inmediato");
  
    // Operación asíncrona
    const result = await new Promise(resolve => {
      setTimeout(() => {
        console.log("Operación 2: Asíncrono, se ejecuta después de 1 segundo");
        resolve("Resultado de la operación asíncrona");
      }, 1000);
    });
  
    
    console.log("Operación 3: Síncrono, se ejecuta después de que la operación asíncrona termine");
  
    
    console.log(`Resultado: ${result}`);
  
    console.log("Fin del flujo combinado");
  }
  
  combinedFlow();
  