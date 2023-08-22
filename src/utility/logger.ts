import { createLogger, format, transports } from "winston"

class LoggerManager {
    logger: any;
    static instance: any;
    constructor() {
        this.configureLogger();
    }

    configureLogger() {
        this.logger = createLogger({
            levels: {
                error: 0,
                info: 1
            },
            level: 'info',

            format: format.combine(
                format.timestamp(),
                format.json(),
                format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
                })
            ),
            transports: [
                new transports.Console()
            ]
        });
    }

    static getInstance() {
        if (!LoggerManager.instance) {
            LoggerManager.instance = new LoggerManager();
        }
        return LoggerManager.instance;
    }

    getLogger() {
        return this.logger;
    }
}

export default LoggerManager.getInstance();

