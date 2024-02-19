import pino from "pino";

const logger = pino({
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            ignore: "pid,hostname",
            levelFirst: true,
            translateTime: "SYS:HH:MM:ss",
        },
    },
});

export default logger;
