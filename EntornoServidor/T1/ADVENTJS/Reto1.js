function prepareGifts(gifts) {
    
     const uniqueGifts = Array.from(new Set(gifts));
     return uniqueGifts.sort((a, b) => a - b);
     
 }