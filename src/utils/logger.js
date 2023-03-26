const winston = require('winston')

const logConfiguration = {
    transports: [new winston.transports.Console({ level: 'debug' }), new winston.transports.File({ filename: 'log/allLogs.log' })],
    exceptionHandlers: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        winston.format.colorize({ all: true }),

        winston.format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`)
    ),
}

const logger = winston.createLogger(logConfiguration)

module.exports = logger
