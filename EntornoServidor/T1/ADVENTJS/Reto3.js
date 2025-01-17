function organizeInventory(inventory) {
    if (inventory.length === 0) return {}; 
 
   return inventory.reduce((result, item) => {
     const { category, name, quantity } = item;
 
    
     if (!result[category]) {
       result[category] = {};
     }
     
     result[category][name] = (result[category][name] || 0) + quantity;
 
     return result;
   }, {});
   
 }