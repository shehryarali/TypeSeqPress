import { node } from '../../config';
import { existsSync, mkdirSync } from 'fs';
import { config, Logger, addColors, setLevels, transports } from 'winston';

setLevels(config.syslog.levels);
addColors(config.syslog.colors);

require("winston-postgresql").PostgreSQL;

if (!existsSync('logs')) mkdirSync('logs');

const consoleTransport = new transports.Console({
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    timestamp: true
});

const apiTransport = new transports.File({
    level: 'info',
    name: 'file.info',
    filename: 'logs/api.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
    colorize: true,
    timestamp: true
});

const errorTransport = new transports.File({
    level: 'error',
    name: 'file.error',
    filename: 'logs/error.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
    colorize: true,
    timestamp: true
});

let logger = new Logger();

if (node.env === 'development')
  logger = new Logger({ exitOnError: false, transports: [consoleTransport] });
if (node.env === 'production')
  logger = new Logger({
    exitOnError: false,
    transports: [apiTransport, errorTransport, consoleTransport]
});

export { logger };