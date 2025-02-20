import mongoose from 'mongoose'
import expenses from './expensesData'
import { Expense } from './models/expense.model'

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/expenses')
    console.log('Connected to MongoDB')

    await Expense.deleteMany({})
    console.log('Cleared existing expenses')

    await Expense.insertMany(expenses)
    console.log('Expenses seeded successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  }
}

seedDatabase()
