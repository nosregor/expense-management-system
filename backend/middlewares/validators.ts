import { body, query } from 'express-validator'
import { ExpenseCategory } from '../models/expense.model'

export const validateExpense = [
  body('description').notEmpty().withMessage('Description is required'),
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
  body('category').isIn(Object.values(ExpenseCategory)).withMessage('Invalid category'),
]

export const validateGetExpensesByCategory = [
  query('category').optional().isIn(Object.values(ExpenseCategory)).withMessage('Invalid category'),
]
