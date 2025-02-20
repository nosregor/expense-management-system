import { FilterQuery, Types } from 'mongoose'
import { Expense, ExpenseCategory, IExpense } from '../models/expense.model'

export interface ExpenseFilter {
  category?: string
  amount?: { $gte: number }
}

class ExpenseService {
  async createExpense(expenseData: Omit<IExpense, '_id'>): Promise<IExpense> {
    const expense = new Expense(expenseData)
    return await expense.save()
  }

  async getAllExpenses(
    page: number = 1,
    limit: number = 20,
    filter?: ExpenseFilter,
  ): Promise<IExpense[]> {
    let query: FilterQuery<IExpense> = {}

    if (filter) {
      if (filter.category) {
        query.category = filter.category
      }
      if (filter.amount && filter.amount.$gte) {
        query.amount = { $gte: filter.amount.$gte }
      }
    }

    return await Expense.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
  }

  async getExpenseById(id: string): Promise<IExpense | null> {
    const objectId = new Types.ObjectId(id)
    return await Expense.findOne({ _id: objectId })
  }

  async updateExpense(id: string, updateData: Partial<IExpense>): Promise<IExpense | null> {
    const objectId = new Types.ObjectId(id)
    return await Expense.findOneAndUpdate({ _id: objectId }, updateData, { new: true })
  }

  async deleteExpense(id: string): Promise<IExpense | null> {
    const objectId = new Types.ObjectId(id)
    return await Expense.findOneAndDelete({ _id: objectId })
  }

  async getExpensesByCategory(category: ExpenseCategory): Promise<IExpense[]> {
    return await Expense.find({ category })
  }
}

export default new ExpenseService()
