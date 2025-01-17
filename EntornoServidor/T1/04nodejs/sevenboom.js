function sevenBoom() {
    for (let i = 1; i <= 100; i++) {
        if (i.toString().includes('7')) {
            console.log("Boom");
        } else {
            console.log(i);
        }
    }
}


sevenBoom();