import { Expense, ExpenseCategory } from '../models/expense.model'
import ExpenseService from '../services/expense.service'
import * as dbHandler from '../utils/dbHandler'

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect())

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase())

describe('ExpenseService', () => {
  describe('One flow', () => {
    let testExpenseId: any

    test('should create a new expense', async () => {
      const newExpenseData: any = {
        description: 'Test Expense',
        amount: 100,
        category: ExpenseCategory.TRAVEL,
      }
      const createdExpense = await ExpenseService.createExpense(newExpenseData)

      expect(createdExpense).toMatchObject(newExpenseData)
      expect(createdExpense._id).toBeDefined()

      testExpenseId = createdExpense._id
    })

    test('should get all expenses', async () => {
      const allExpenses = await ExpenseService.getAllExpenses()
      expect(allExpenses).toBeInstanceOf(Array)
      expect(allExpenses.length).toBeGreaterThan(0)
    })

    test('should get an expense by ID', async () => {
      const foundExpense = await ExpenseService.getExpenseById(testExpenseId)

      expect(foundExpense).toBeDefined()
      expect(foundExpense?._id).toEqual(testExpenseId)
    })

    test('should update an expense by ID', async () => {
      const updateData = { description: 'Updated Expense', category: ExpenseCategory.MEALS }
      const updatedExpense = await ExpenseService.updateExpense(testExpenseId, updateData)

      expect(updatedExpense).toMatchObject(updateData)
    })

    test('should delete an expense by ID', async () => {
      const deletedExpense = await ExpenseService.deleteExpense(testExpenseId)

      expect(deletedExpense).toBeDefined()
      expect(deletedExpense?._id).toEqual(testExpenseId)
    })
  })

  describe('Test each service separately', () => {
    /**
     * Remove all collections.
     */
    afterEach(async () => await dbHandler.clearDatabase())

    describe('createExpense', () => {
      it('should create a new expense', async () => {
        const expenseData: any = {
          description: 'Office Supplies',
          amount: 50,
          category: ExpenseCategory.OFFICE,
        }

        const expense = await ExpenseService.createExpense(expenseData)
        expect(expense).toHaveProperty('_id')
        expect(expense.description).toBe(expenseData.description)
        expect(expense.amount).toBe(expenseData.amount)
        expect(expense.category).toBe(expenseData.category)
      })
    })

    describe('getAllExpenses', () => {
      it('should return all expenses', async () => {
        await Expense.create([
          { description: 'Office Supplies', amount: 50, category: ExpenseCategory.OFFICE },
          { description: 'Travel', amount: 200, category: ExpenseCategory.TRAVEL },
        ])

        const expenses = await ExpenseService.getAllExpenses()
        console.log(expenses)
        expect(expenses.length).toBe(2)
      })
    })

    describe('getExpenseById', () => {
      it('should return an expense by ID', async () => {
        const expenseData: any = {
          description: 'Office Supplies',
          amount: 50,
          category: ExpenseCategory.OFFICE,
        }

        const createdExpense = (await Expense.create(expenseData)) as any
        const expense = await ExpenseService.getExpenseById(createdExpense._id.toString())

        expect(expense).not.toBeNull()
        expect(expense?.description).toBe(expenseData.description)
      })

      it('should return null if expense is not found', async () => {
        const expense = await ExpenseService.getExpenseById('123456789012345678901234')
        expect(expense).toBeNull()
      })
    })

    describe('updateExpense', () => {
      it('should update an expense', async () => {
        const expenseData: any = {
          description: 'Office Supplies',
          amount: 50,
          category: ExpenseCategory.OFFICE,
        }

        const createdExpense = (await Expense.create(expenseData)) as any
        const updatedExpense = await ExpenseService.updateExpense(createdExpense._id.toString(), {
          amount: 100,
        })

        expect(updatedExpense).not.toBeNull()
        expect(updatedExpense?.amount).toBe(100)
      })

      it('should return null if expense to update is not found', async () => {
        const updatedExpense = await ExpenseService.updateExpense('123456789012345678901234', {
          amount: 100,
        })
        expect(updatedExpense).toBeNull()
      })
    })

    describe('deleteExpense', () => {
      it('should delete an expense', async () => {
        const expenseData: any = {
          description: 'Office Supplies',
          amount: 50,
          category: ExpenseCategory.OFFICE,
        }

        const createdExpense = (await Expense.create(expenseData)) as any
        const deletedExpense = await ExpenseService.deleteExpense(createdExpense._id.toString())

        expect(deletedExpense).not.toBeNull()
        expect(deletedExpense?.description).toBe(expenseData.description)

        const expense = await Expense.findById(createdExpense._id)
        expect(expense).toBeNull()
      })

      it('should return null if expense to delete is not found', async () => {
        const deletedExpense = await ExpenseService.deleteExpense('123456789012345678901234')
        expect(deletedExpense).toBeNull()
      })
    })
  })
})
