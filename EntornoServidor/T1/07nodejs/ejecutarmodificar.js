function timeout(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve(x);
      }, x);
    });
  }
  
  async function init() {
    const promises = [];
    const results = [];
    
    
    for (let i = 0; i < 20; i++) {
      const promise = timeout(i * 100).then(x => results.push({
        index: i,
        timeout: x
      }));
      promises.push(promise);
    }
    
   
    await Promise.all(promises);
    
   
    console.log(results);
  }
  
  init();
  