import pino from 'pino'
import pinoPretty from 'pino-pretty'

const NODE_ENV = process.env.NODE_ENV

export const logger = pino(
  {
    name: 'EMS',
    level: NODE_ENV === 'development' ? 'debug' : 'info',
    transport:
      NODE_ENV === 'development'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
  },
  pinoPretty(),
)

export default logger
