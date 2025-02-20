import express from 'express'
import { validateExpense, validateGetExpensesByCategory } from '../middlewares/validators'

import ExpenseController from '../controllers/expense.controller'

const router = express.Router()

router.post('/', validateExpense, ExpenseController.createExpense)
router.get('/', validateGetExpensesByCategory, ExpenseController.getAllExpenses)
router.get('/:id', ExpenseController.getExpenseById)
router.put('/:id', validateExpense, ExpenseController.updateExpense)
router.delete('/:id', ExpenseController.deleteExpense)

export default router
