import request from 'supertest'
import app from '../app'
import { ExpenseCategory } from '../models/expense.model'
import ExpenseService from '../services/expense.service'

describe('Expense routes', () => {
  describe('POST /expenses', () => {
    it('should create a new expense', async () => {
      const newExpense = { description: 'Travel', amount: 200, category: ExpenseCategory.TRAVEL }
      const mockExpense: any = { _id: '123', ...newExpense }
      jest.spyOn(ExpenseService, 'createExpense').mockResolvedValue(mockExpense)
      const res = await request(app).post('/expenses').send(newExpense)
      expect(res.status).toBe(201)
      expect(res.body).toEqual(mockExpense)
    })

    it('should return 400 if description is missing', async () => {
      const res = await request(app)
        .post('/expenses')
        .send({ amount: 200, category: ExpenseCategory.TRAVEL })
      expect(res.status).toBe(400)
      expect(res.body.message).toBe('Description is required')
    })

    it('should return 400 if amount is not a positive number', async () => {
      const res = await request(app)
        .post('/expenses')
        .send({ description: 'Office Supplies', amount: -100, category: 'OFFICE' })

      expect(res.status).toBe(400)
      expect(res.body.message).toBe('Amount must be a positive number')
    })

    it('should return 400 for invalid category', async () => {
      const res = await request(app)
        .post('/expenses')
        .send({ description: 'Invalid', amount: 200, category: 'INVALID' })
      expect(res.status).toBe(400)
      expect(res.body.message).toBe('Invalid category')
    })
  })

  describe('GET /expenses', () => {
    it('should return a list of expenses', async () => {
      const mockExpense: any = [
        { _id: '12', description: 'Travel', amount: 200, category: ExpenseCategory.OFFICE },
      ]
      jest.spyOn(ExpenseService, 'getAllExpenses').mockResolvedValue(mockExpense)

      const res = await request(app).get('/expenses')
      expect(res.status).toBe(200)
      expect(res.body).toEqual(mockExpense)
    })

    it('should return a list of expenses filtered by category and amount', async () => {
      const mockExpenses: any = [
        { _id: '12', description: 'Travel', amount: 200, category: ExpenseCategory.OFFICE },
        { _id: '13', description: 'Travel', amount: 100, category: ExpenseCategory.OFFICE },
      ]

      jest.spyOn(ExpenseService, 'getAllExpenses').mockResolvedValue(mockExpenses)

      const res = await request(app).get('/expenses').query({ category: 'OFFICE', amount: '100' })
      console.log({ res })
      expect(res.status).toBe(200)
      expect(res.body).toEqual(mockExpenses)
    })

    it('should return all expenses filtered by amount is applied', async () => {
      const mockExpenses: any = [
        { _id: '12', description: 'Travel', amount: 200, category: ExpenseCategory.OFFICE },
      ]

      jest.spyOn(ExpenseService, 'getAllExpenses').mockResolvedValue(mockExpenses)

      const res = await request(app).get('/expenses').query({ amount: '150' })
      expect(res.status).toBe(200)
      expect(res.body).toEqual([
        { _id: '12', description: 'Travel', amount: 200, category: ExpenseCategory.OFFICE },
      ])
    })
  })

  describe('GET /expenses/:id', () => {
    it('should fetch an existing expense by ID', async () => {
      const mockExpense: any = {
        id: '123',
        description: 'Office Supplies',
        amount: 50,
        category: ExpenseCategory.OFFICE,
      }
      jest.spyOn(ExpenseService, 'getExpenseById').mockResolvedValue(mockExpense)

      const res = await request(app).get('/expenses/123')
      expect(res.status).toBe(200)
      expect(res.body).toEqual(mockExpense)
    })

    it('should handle unexpected errors when fetching an expense', async () => {
      jest.spyOn(ExpenseService, 'getExpenseById').mockRejectedValue(new Error('Unexpected error'))

      const res = await request(app).get('/expenses/123')
      expect(res.status).toBe(500)
      expect(res.body.message).toBe('Internal Server Error')
    })

    it('should return 400 if expense is not found', async () => {
      jest.spyOn(ExpenseService, 'getExpenseById').mockResolvedValue(null)

      const res = await request(app).get('/expenses/999')
      expect(res.status).toBe(404)
      expect(res.body.message).toBe('Failed to fetch expense')
    })

    it('should return 400 for invalid ID format', async () => {
      const res = await request(app).get('/expenses/invalid-id')
      expect(res.status).toBe(404)
      expect(res.body.message).toBe('Failed to fetch expense')
    })
  })

  describe('PUT /expenses/:id', () => {
    it('should update an existing expense', async () => {
      const updatedExpense: any = {
        _id: '123',
        description: 'Updated Travel',
        amount: 250,
        category: 'TRAVEL',
      }
      jest.spyOn(ExpenseService, 'updateExpense').mockResolvedValue(updatedExpense)

      const res = await request(app).put('/expenses/123').send(updatedExpense)
      expect(res.status).toBe(200)
      expect(res.body).toEqual(updatedExpense)
    })

    it('should return 404 if expense to update is not found', async () => {
      jest.spyOn(ExpenseService, 'updateExpense').mockResolvedValue(null)

      const res = await request(app)
        .put('/expenses/999')
        .send({ description: 'Updated', amount: 100, category: ExpenseCategory.OFFICE })
      expect(res.status).toBe(404)
      expect(res.body.message).toBe('Expense not found')
    })
  })

  describe('DELETE /expenses/:id', () => {
    it('should delete an existing expense', async () => {
      const deletedExpense: any = {
        _id: '123',
        description: 'Updated Travel',
        amount: 250,
        category: 'TRAVEL',
      }
      jest.spyOn(ExpenseService, 'deleteExpense').mockResolvedValue(deletedExpense)

      const res = await request(app).delete('/expenses/123')
      expect(res.status).toBe(204)
    })

    it('should return 404 if expense to delete is not found', async () => {
      jest.spyOn(ExpenseService, 'deleteExpense').mockResolvedValue(null)

      const res = await request(app).delete('/expenses/999')
      expect(res.status).toBe(404)
      expect(res.body.message).toBe('Expense not found')
    })

    it('should handle database errors', async () => {
      jest
        .spyOn(ExpenseService, 'deleteExpense')
        .mockRejectedValue(new Error('Database connection failed'))

      const res = await request(app).delete('/expenses/123')
      expect(res.status).toBe(500)
      expect(res.body.message).toBe('Internal Server Error')
    })
  })

  describe('Unhandled Routes', () => {
    it('should return a 404 error for an undefined route', async () => {
      const response = await request(app).get('/undefined-route')

      expect(response.status).toBe(404)
      expect(response.body).toEqual({
        status: 404,
        message: `This path /undefined-route isn't on this server!`,
      })
    })

    it('should return a 404 error for another undefined route', async () => {
      const response = await request(app).post('/non-existent-route')

      expect(response.status).toBe(404)
      expect(response.body).toEqual({
        status: 404,
        message: `This path /non-existent-route isn't on this server!`,
      })
    })
  })
})
