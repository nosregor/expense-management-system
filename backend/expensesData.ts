import { ExpenseCategory } from './models/expense.model'

type Expense = {
  description: string
  amount: number
  category: ExpenseCategory
}

const expenses: Expense[] = [
  {
    description: 'Office Supplies',
    amount: 50.0,
    category: ExpenseCategory.OFFICE,
  },
  {
    description: 'Business Lunch',
    amount: 30.0,
    category: ExpenseCategory.MEALS,
  },
  {
    description: 'Flight Ticket',
    amount: 200.0,
    category: ExpenseCategory.TRAVEL,
  },
  {
    description: 'Client Dinner',
    amount: 80.0,
    category: ExpenseCategory.MEALS,
  },
  {
    description: 'Hotel Accommodation',
    amount: 150.0,
    category: ExpenseCategory.TRAVEL,
  },
  {
    description: 'Printer Maintenance',
    amount: 40.0,
    category: ExpenseCategory.OFFICE,
  },
  {
    description: 'Internet Subscription',
    amount: 60.0,
    category: ExpenseCategory.OFFICE,
  },
  {
    description: 'Conference Registration',
    amount: 100.0,
    category: ExpenseCategory.OFFICE,
  },
  {
    description: 'Software License Renewal',
    amount: 80.0,
    category: ExpenseCategory.OFFICE,
  },
  {
    description: 'Training Workshop Fee',
    amount: 120.0,
    category: ExpenseCategory.OFFICE,
  },
  {
    description: 'Taxi Fare',
    amount: 25.0,
    category: ExpenseCategory.TRAVEL,
  },
  {
    description: 'Mobile Phone Bill',
    amount: 45.0,
    category: ExpenseCategory.OFFICE,
  },
  {
    description: 'Marketing Campaign',
    amount: 300.0,
    category: ExpenseCategory.OFFICE,
  },
  {
    description: 'Customer Gift',
    amount: 50.0,
    category: ExpenseCategory.MEALS,
  },
  {
    description: 'Software Subscription',
    amount: 70.0,
    category: ExpenseCategory.OFFICE,
  },
  {
    description: 'Professional Development Course',
    amount: 150.0,
    category: ExpenseCategory.OFFICE,
  },
  {
    description: 'Business Trip Expenses',
    amount: 280.0,
    category: ExpenseCategory.TRAVEL,
  },
  {
    description: 'Team Building Event',
    amount: 120.0,
    category: ExpenseCategory.OFFICE,
  },
  {
    description: 'Marketing Materials Printing',
    amount: 90.0,
    category: ExpenseCategory.OFFICE,
  },
  {
    description: 'Consultant Fee',
    amount: 200.0,
    category: ExpenseCategory.OFFICE,
  },
  {
    description: 'Client Gift',
    amount: 60.0,
    category: ExpenseCategory.MEALS,
  },
]

export default expenses
