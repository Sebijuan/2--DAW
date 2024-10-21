const chalk = require('chalk');


function getFormattedDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0'); 
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0'); 
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

   
    return {
        formattedDate: `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`,
        seconds: seconds,
        day: day
    };
}


function printCurrentDate() {
    const { formattedDate, seconds } = getFormattedDate();
    
    
    if (seconds === '00' || seconds[1] === '0') {
        console.log(chalk.green(formattedDate)); 
    } else {
        console.log(formattedDate); 
    }
}


setInterval(printCurrentDate, 1000);
