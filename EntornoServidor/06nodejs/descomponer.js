const url = require('url');
const dns = require('dns');


const decomposeUrl = async (urlString) => {
    
    const parsedUrl = new URL(urlString);
    
    
    const protocol = parsedUrl.protocol.replace(':', '');
    
    
    const hostParts = parsedUrl.hostname.split('.');
    const targetFile = parsedUrl.pathname.split('/').pop();
    const folderTree = parsedUrl.pathname.split('/').slice(0, -1).join('/');
    const argumentsFile = parsedUrl.search;

    
    let domainName;
    let subDomain;
    
    if (hostParts.length === 2) {
        
        domainName = hostParts[1];
        subDomain = '';
    } else {
        
        subDomain = hostParts.slice(0, -2).join('.');
        domainName = hostParts.slice(-2).join('.');
    }

    
    const ipAddress = await new Promise((resolve, reject) => {
        dns.lookup(parsedUrl.hostname, (err, address) => {
            if (err) {
                resolve('No se pudo resolver la IP');
            } else {
                resolve(address);
            }
        });
    });

   
    return {
        protocol,
        ipAddress,
        subDomain,
        domainName,
        folderTree,
        targetFile,
        argumentsFile,
    };
};


const urlString = 'https://www.youtube.com/';

decomposeUrl(urlString)
    .then(result => {
        console.log('Descomposición de la URL:');
        console.log(result);
    })
    .catch(err => {
        console.error('Error al descomponer la URL:', err);
    });
