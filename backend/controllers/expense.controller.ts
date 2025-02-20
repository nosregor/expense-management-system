import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import ExpenseService, { ExpenseFilter } from '../services/expense.service'
import { NotFoundError, ValidationError } from '../utils/errors'

class ExpenseController {
  async createExpense(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        throw new ValidationError(errors.array()[0].msg)
      }
      const expense = await ExpenseService.createExpense(req.body)
      res.status(201).json(expense)
    } catch (error: any) {
      next(error)
    }
  }

  async getAllExpenses(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        throw new ValidationError(errors.array()[0].msg)
      }
      const category = req.query.category as string | undefined
      const amount = req.query.amount as number | undefined
      const filter: ExpenseFilter = {}

      if (category) {
        filter.category = category
        if (amount) {
          filter.amount = { $gte: amount }
        }
      }
      const expenses = await ExpenseService.getAllExpenses(1, 20, filter)
      res.status(200).json(expenses)
    } catch (error) {
      next(error)
    }
  }

  async getExpenseById(req: Request, res: Response, next: NextFunction) {
    try {
      const expense = await ExpenseService.getExpenseById(req.params.id)
      if (!expense) {
        throw new NotFoundError('Failed to fetch expense')
      }
      res.status(200).json(expense)
    } catch (error) {
      next(error)
    }
  }

  async updateExpense(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedExpense = await ExpenseService.updateExpense(req.params.id, req.body)
      if (!updatedExpense) {
        throw new NotFoundError('Expense not found')
      }
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        throw new ValidationError(errors.array()[0].msg)
      }
      res.status(200).json(updatedExpense)
    } catch (error) {
      next(error)
    }
  }

  async deleteExpense(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ExpenseService.deleteExpense(req.params.id)
      if (!result) {
        throw new NotFoundError('Expense not found')
      }
      res.status(204).send({ success: 'true' })
    } catch (error) {
      next(error)
    }
  }
}

export default new ExpenseController()
