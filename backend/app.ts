import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import pinoHttp from 'pino-http'
import { errorHandler } from './middlewares/errorHandler'
import expenseRouter from './routes/expense.route'
import { AppError } from './utils/errors'
import logger from './utils/logger'

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: '*',
  }),
)

app.use(express.json())
app.use(pinoHttp({ logger, autoLogging: true }))

app.use('/expenses', expenseRouter)
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() })
})

// Unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`This path ${req.originalUrl} isn't on this server!`, 404))
})

app.use(errorHandler)

export default app
