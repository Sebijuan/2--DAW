const logger = (req, res, next) => {
    const oldSend = res.send;

    res.send = function (data) {
        const statusCode = res.statusCode;
        if (statusCode >= 200 && statusCode < 300) {
            console.info(`INFO: ${req.method} ${req.url} ${statusCode}`);
        } else if (statusCode >= 400 && statusCode < 500) {
            console.warn(`WARN: ${req.method} ${req.url} ${statusCode}`);
        } else if (statusCode >= 500) {
            console.error(`ERROR: ${req.method} ${req.url} ${statusCode}`);
        }
        oldSend.apply(res, arguments);
    };

    next();
};

module.exports = logger;