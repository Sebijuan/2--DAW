const winston = require('winston');

const { format, transports, createLogger } = winston;

const {
  combine, timestamp, printf, colorize,
} = format;

const logger = createLogger({
  level: 'info', // Ensure the log level is set to 'info'
  transports: [
    new transports.Console({
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        colorize(),
        printf(info => `[${info.timestamp}] ${info.level} ${info.message}`),
      ),
      silent: process.env.NODE_ENV === 'test',
    }),
  ],
  exitOnError: false,
  silent: process.env.NODE_ENV === 'test',
});

module.exports = logger;