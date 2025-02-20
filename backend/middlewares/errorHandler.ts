import { NextFunction, Request, Response } from 'express'
import { AppError, NotFoundError, ValidationError } from '../utils/errors'
import { logger } from '../utils/logger'

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error({
    name: error.name,
    message: error.message,
    stack: error.stack,
  })

  if (process.env.NODE_ENV === 'development') {
    if (error instanceof ValidationError) {
      res.status(400).json({
        status: 400,
        error,
        message: error.message,
        stack: error.stack,
      })
    } else if (error instanceof NotFoundError) {
      res.status(404).json({
        status: 404,
        error,
        message: error.message,
        stack: error.stack,
      })
    } else if (error instanceof AppError) {
      res.status(error.statusCode).json({
        status: error.statusCode,
        error,
        message: error.message,
        stack: error.stack,
      })
    } else {
      res.status(500).json({
        status: 500,
        error,
        message: error.message,
        stack: error.stack,
      })
    }
  } else {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
      })
    } else if (error instanceof ValidationError) {
      res.status(400).json({
        status: 400,
        message: error.message,
      })
    } else if (error instanceof NotFoundError) {
      res.status(404).json({
        status: 404,
        message: error.message,
      })
    } else {
      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  }
}
